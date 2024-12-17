<script>
import FullCalendar from '@fullcalendar/vue3'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import resourceTimelinePlugin from '@fullcalendar/resource-timeline'
import bootstrap5Plugin from '@fullcalendar/bootstrap5'
import apiClient from '../utils/axios'
import dayjs from 'dayjs'

export default {
  name: 'EventManager',
  components: { FullCalendar },
  data() {
    return {
      resources: [], // Add your resources here if applicable
      events: [],
      selectedEvent: null,
      form: {
        id: null,
        resource_id: null,
        title: '',
        start: '',
        end: '',
        extended_props: '',
      },
      calendarOptions: {
        plugins: [resourceTimelinePlugin, interactionPlugin, bootstrap5Plugin],
        // initialView: 'resourceTimelineWeek',
        initialView: 'resourceTimelineMonSat',
        views: {
          resourceTimelineMonSat: {
            type: 'resourceTimeline',
            // duration: { days: 4 }
            visibleRange: function (currentDate) {
              // Get the current week's Monday and Sunday
              const startOfWeek = dayjs(currentDate).startOf('week'); // Monday
              const endOfWeek = dayjs(currentDate).endOf('week'); // Saturday

              return {
                start: startOfWeek.format('YYYY-MM-DD'),
                end: endOfWeek.format('YYYY-MM-DD'),
              };
            },
          }
        },
        slotMinTime: "04:00",
        slotMaxTime: "22:00",
        height: 550,
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
    };
  },
  methods: {
    async fetchEvents() {
      try {
        const  data  = await apiClient.get('/api/events');
        console.log(data);
this.events = data.data        
        // this.events = data.map(event => ({
        //   ...event,
        //   start: new Date(event.start),
        //   end: new Date(event.end),
        // }));
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    },
    handleEventClick({ event }) {
      this.selectedEvent = event;
      this.form = { ...event.extendedProps, id: event.id };
    },
    handleDateClick(info) {
      this.resetForm();
      this.form.start = info.dateStr;
      this.selectedEvent = {};
    },
    async saveEvent() {
      try {
        if (this.form.id) {
          await apiClient.put(`/events/${this.form.id}`, this.form);
        } else {
          const { data } = await apiClient.post('/api/events', this.form);
          this.events.push(data);
        }
        this.fetchEvents();
        this.resetForm();
      } catch (error) {
        console.error('Error saving event:', error);
      }
    },
    async deleteEvent(id) {
      if (confirm('Are you sure you want to delete this event?')) {
        try {
          await apiClient.delete(`/api/events/${id}`);
          this.fetchEvents();
          this.resetForm();
        } catch (error) {
          console.error('Error deleting event:', error);
        }
      }
    },
    resetForm() {
      this.selectedEvent = null;
      this.form = {
        id: null,
        resource_id: null,
        title: '',
        start: '',
        end: '',
        extended_props: '',
      };
    },
  },
  async mounted() {
    await this.fetchEvents();
  },
};
</script>

<template>
  <div class="event-manager">
    <FullCalendar :options="calendarOptions"
      
    />
    <div v-if="selectedEvent" class="event-editor">
      <h3>{{ selectedEvent.id ? 'Edit Event' : 'Create Event' }}</h3>
      <form @submit.prevent="saveEvent">
        <div>
          <label for="title">Title:</label>
          <input id="title" v-model="form.title" type="text" required />
        </div>
        <div>
          <label for="start">Start:</label>
          <input id="start" v-model="form.start" type="datetime-local" required />
        </div>
        <div>
          <label for="end">End:</label>
          <input id="end" v-model="form.end" type="datetime-local" required />
        </div>
        <div>
          <label for="extendedProps">Extended Props:</label>
          <input id="extendedProps" v-model="form.extended_props" type="text" />
        </div>
        <button type="submit">{{ selectedEvent.id ? 'Update' : 'Create' }}</button>
        <button type="button" @click="deleteEvent(selectedEvent.id)" v-if="selectedEvent.id">
          Delete
        </button>
        <button type="button" @click="resetForm">Cancel</button>
      </form>
    </div>
  </div>
</template>



<style scoped>
.event-manager {
  display: flex;
  flex-direction: column;
}
.event-editor {
  margin-top: 20px;
  padding: 10px;
  border: 1px solid #ccc;
  background-color: #f9f9f9;
}
.event-editor form div {
  margin-bottom: 10px;
}
.event-editor button {
  margin-right: 10px;
}
</style>
