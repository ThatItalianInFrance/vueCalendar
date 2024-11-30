<script>
import FullCalendar from '@fullcalendar/vue3'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import resourceTimelinePlugin from '@fullcalendar/resource-timeline'
import bootstrap5Plugin from '@fullcalendar/bootstrap5'
import {
  INITIAL_EVENTS,
  fetchEventsFromAPI,
  fetchEmployeesFromAPI,
  fetchHolidaysFromAPI,
} from '../utils/event-utils' // Assume these are imported properly
// import {} from '../utils/'
export default {
  components: {
    FullCalendar, // make the <FullCalendar> tag available
  },
  data() {
    return {
      themeSystem: 'bootstrap5',
      filteredResources: [], // Dynamic list of filtered resources
      filteredEvents: [],
      allResources: [],
      swipeEvents: [
        {
          id: '3',
          resourceId: '1',
          title: 'Swipe In',
          start: '2024-11-20T08:05:00',
          end: '2024-11-20T08:10:00',
          backgroundColor: '#007bff',
        },
        {
          id: '4',
          resourceId: '2',
          title: 'Swipe Out',
          start: '2024-11-20T17:00:00',
          end: '2024-11-20T17:05:00',
          backgroundColor: '#dc3545',
        },
      ],
      calendarOptions: {
        plugins: [resourceTimelinePlugin, interactionPlugin, bootstrap5Plugin],
        initialView: 'resourceTimelineWeek',
        dateClick: this.handleDateClick,
        eventClick: function (info) {
          alert('Event: ' + info.event.title)
          alert('Coordinates: ' + info.jsEvent.pageX + ',' + info.jsEvent.pageY)
          alert('View: ' + info.view.type)

          // change the border color just for fun
          info.el.style.borderColor = 'red'
        },
        events: [], // Start with empty events, will be populated after fetching data
        resources: [], // Start with empty resources, will be populated after fetching data
        resourceLabelContent: function (resource) {
          return {
            html: `
              <div style="display: flex; align-items: center;">
                <img src="${resource.resource.extendedProps.logo}" 
                     alt="${resource.resource.title}" 
                     style="border-radius: 50%; width: 20px; height: 20px; margin-right: 8px;">
                <span>${resource.resource.title}</span>
              </div>
            `,
          }
        },
      },
    }
  },
  methods: {
    // Initialize data by fetching events, employees, and holidays
    async initializeData() {
      try {
        const events = INITIAL_EVENTS
        // const events = await fetchEventsFromAPI();
        const employees = await fetchEmployeesFromAPI()
        const holidays = await fetchHolidaysFromAPI()
        console.log(events)
        // Generate employee resources
        this.allResources = employees.map((employee) => ({
          id: employee.employee_id,
          title: `${employee.first_name} ${employee.last_name}`,
          department: employee.department,
          logo: employee.logo || 'https://placeholder.com/30?text=TB',
        }))

        // Map events to the format FullCalendar expects
        const eventArray = [
          ...events.map((event) => ({
            id: event.id,
            resourceId: event.resource_id,
            title: event.title,
            start: event.start,
            end: event.end,
            backgroundColor: event.backgroundColor || '#007bff', // Default color
          })),
          ...holidays.map((holiday) => ({
            id: `holiday-${holiday.holiday_id}`,
            resourceId: 'holiday', // Special resource for holidays
            title: holiday.name,
            start: holiday.holiday_date,
            end: holiday.holiday_date,
            backgroundColor: '#28a745', // Color for holidays
          })),
        ]

        // Set the fetched data to FullCalendar options
        this.filteredResources = [...this.allResources] // Initially show all resources
        // console.log(this.allResources);

        this.filteredEvents = eventArray

        this.calendarOptions.events = this.filteredEvents
        this.calendarOptions.resources = this.filteredResources
      } catch (error) {
        console.error('Error initializing data:', error)
      }
    },

    // Fetch events from database API
    async fetchDatabaseEvents() {
      try {
        const response = await fetch('http://localhost:3000/api/events') // Adjust API endpoint
        const data = await response.json()

        this.filteredEvents = data.map((event) => ({
          id: event.id.toString(),
          resourceId: event.employee_id.toString(),
          title: `${event.first_name} ${event.last_name} - ${event.event_type}`,
          start: `${event.date}T${event.start_time}`,
          end: `${event.date}T${event.end_time}`,
          backgroundColor: event.event_type === 'Swipe In' ? '#007bff' : '#dc3545', // Example coloring logic
        }))
        this.calendarOptions.events = this.filteredEvents
      } catch (error) {
        console.error('Error fetching events:', error)
      }
    },

    // Filter resources based on department
    filterResources(department) {
      console.log(department)
      console.log('this')

      if (!department) {
        this.filteredResources = this.allResources
        console.log(this.filteredResources)
      } else {
        this.filteredResources = this.allResources.filter(
          (resource) => resource.department === department,
        )
      }
      this.calendarOptions.resources = this.filteredResources
    },

    // Filter events by type (planning or swipe events)
    filterEvents(type) {
      if (type === 'planning') {
        this.filteredEvents = this.filteredEvents.filter((event) =>
          event.title.includes('Planning'),
        )
      } else if (type === 'swipes') {
        this.filteredEvents = this.swipeEvents
      } else {
        this.filteredEvents = []
      }
      this.calendarOptions.events = this.filteredEvents
    },

    handleDateClick(arg) {
      if (confirm('Would you like to add an event to ' + arg.dateStr + ' ?')) {
        this.filteredEvents.push({
          title: 'New Event',
          start: arg.date,
          allDay: arg.allDay,
        })
      }
    },
  },

  created() {
    this.initializeData() // Fetch data when component is created
  },
}
</script>
<template>
  <div class="filters">
    <label for="department-filter">Filter by Department:</label>
    <select id="department-filter" @change="filterResources($event.target.value)">
      <option value="">All</option>
      <option value="Groupe A">Groupe A</option>
      <option value="Groupe B">Groupe B</option>
      <option value="Groupe C">Groupe C</option>
    </select>

    <label for="event-filter">Filter by Event Type:</label>
    <select id="event-filter" @change="filterEvents($event.target.value)">
      <option value="planning">Planning</option>
      <option value="swipes">Swipes</option>
    </select>
  </div>
  <FullCalendar :options="calendarOptions" />
</template>
<style>
.fc-resource-label img {
  margin-right: 8px;
}
.fc-resource-label span {
  font-weight: bold;
}
.filters {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
}

.filters label {
  font-weight: bold;
  margin-right: 10px;
}

.filters select {
  padding: 5px;
}
</style>
