<script>
import FullCalendar from '@fullcalendar/vue3'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { INITIAL_EVENTS, createEventId } from '../utils/event-utils'
import resourceTimelinePlugin from '@fullcalendar/resource-timeline'

export default {
  components: {
    FullCalendar, // make the <FullCalendar> tag available
  },
  data() {
    return {
      filteredResources: [], // Dynamic list of filtered resources
      filteredEvents: [],
      allResources: [
        // Full list of resources
        {
          id: '1',
          title: 'Jean Dupont',
          department: 'Groupe A',
          logo: 'https://placeholder.com/30?text=TB',
        },
        {
          id: '2',
          title: 'Marie Curie',
          department: 'Groupe B',
          logo: 'https://placeholder.com/30?text=TB',
        },
        {
          id: '3',
          title: 'Émile Zola',
          department: 'Groupe A',
          logo: 'https://placeholder.com/30?text=TB',
        },
        {
          id: '4',
          title: 'Claire Fontaine',
          department: 'Groupe C',
          logo: 'https://placeholder.com/30?text=TB',
        },
      ],
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
        plugins: [resourceTimelinePlugin, interactionPlugin],
        initialView: 'resourceTimelineWeek',
        dateClick: this.handleDateClick,
        eventClick: function (info) {
          alert('Event: ' + info.event.title)
          alert('Coordinates: ' + info.jsEvent.pageX + ',' + info.jsEvent.pageY)
          alert('View: ' + info.view.type)

          // change the border color just for fun
          info.el.style.borderColor = 'red'
        },
        events: INITIAL_EVENTS,
        
        resources: [],
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
    filterResources(department) {
      if (!department) {
        // Reset to all resources when "All" is selected
        this.filteredResources = [...this.allResources]
      } else {
        // Filter resources by department
        this.filteredResources = this.allResources.filter(
          (resource) => resource.department === department,
        )
      }

      // Update the calendar's resources
      this.calendarOptions.resources = this.filteredResources
    },
    toggleWeekends() {
      this.calendarWeekends = !this.calendarWeekends // update a property
    },
    gotoPast() {
      let calendarApi = this.$refs.fullCalendar.getApi() // from the ref="..."
      calendarApi.gotoDate('2000-01-01') // call a method on the Calendar object
    },
    handleDateClick(arg) {
      if (confirm('Would you like to add an event to ' + arg.dateStr + ' ?')) {
        this.calendarEvents.push({
          // add new event data
          title: 'New Event',
          start: arg.date,
          allDay: arg.allDay,
        })
      }
    },
    filterEvents(type) {
      if (type === 'planning') {
        this.filteredEvents = INITIAL_EVENTS
      } else if (type === 'swipes') {
        this.filteredEvents = [...this.swipeEvents]
      } else {
        this.filteredEvents = []
      }
      this.calendarOptions.events = this.filteredEvents
    },
  },

  created() {
    // Set initial resources (all resources visible)
    this.filteredEvents = this.planningEvents
    this.filteredResources = this.allResources
    this.calendarOptions.resources = this.filteredResources
  },
  mounted() {
    // document.querySelector(".fc-license-message").style.display = "none"
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
