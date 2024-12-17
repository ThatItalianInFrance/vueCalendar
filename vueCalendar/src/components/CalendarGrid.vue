<script>
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import { INITIAL_EVENTS } from '../utils/event-utils'
import 'bootstrap/dist/css/bootstrap.min.css'
import apiClient from '../utils/axios';

export default {

  components: {
    FullCalendar, // make the <FullCalendar> tag available
  },
  data() {
    return {
      events: [],
      // calendarOptions: {
      //   plugins: [dayGridPlugin, interactionPlugin],
      //   initialView: 'dayGridMonth',
      //   dateClick: this.handleDateClick,
      //   eventClick: (info) => {  // Arrow function to maintain context
      //     this.selectedEvent = {
      //       title: info.event.title,
      //       start: info.event.start?.toLocaleString() || 'N/A',
      //       end: info.event.end?.toLocaleString() || 'N/A',
      //       status: info.event.extendedProps.status || 'N/A',
      //       backgroundColor: info.event.backgroundColor || 'Default',
      //     }
      //     this.showModal = true  // Show the modal
      //   },
      //   // events: INITIAL_EVENTS,
      //   events: this.events,
      // },
      showModal: false, // Controls modal visibility
      selectedEvent: {
        id: '',
        title: '',
        start: '',
        end: '',
        status: '',
        backgroundColor: '',
      },
    }
  },
  methods: {
    async fetchEvents() {
      try {
        const [eventsResponse] = await Promise.all([
          apiClient.get('http://localhost:3000/api/events'),
          // apiClient.get('http://localhost:3000/api/groups'), // Fetch groups
        ]);
        // console.log(eventsResponse);
        
        this.events = eventsResponse.data;
        console.log(this.events);
        
        // this.groups = groupResponse.data; // Load group data
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    },
    async deleteEvent(id) {
console.log(id);

    },
    handleDateClick(arg) {
      alert('Date clicked: ' + arg.dateStr)
      // console.log(this.events);
      // console.log(INITIAL_EVENTS);
      // console.log("this");
    },
    closeModal() {
      this.showModal = false  // Hide the modal
    },
  },
  computed: {
    calendarOptions() {
      return {
        plugins: [dayGridPlugin, interactionPlugin],
        initialView: 'dayGridMonth',
        dateClick: this.handleDateClick,
        eventClick: (info) => {
          this.selectedEvent = {
            id: info.event.id,
            title: info.event.title,
            start: info.event.start?.toLocaleString() || 'N/A',
            end: info.event.end?.toLocaleString() || 'N/A',
            status: info.event.extendedProps.status || 'N/A',
            backgroundColor: info.event.backgroundColor || 'Default',
          };
          this.showModal = true;
        },
        events: this.events, // Bind dynamically updated events
      };
    },
  },
  mounted() {
    this.fetchEvents()
  },
}
</script>

<template>
  <div class="container">

  <FullCalendar :options="calendarOptions" />
  
  <!-- Modal structure controlled by Vue -->
  <div v-if="showModal" class="modal fade show d-block" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ selectedEvent.title }}</h5>
          <button type="button" class="btn-close" @click="closeModal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <p><strong>Start:</strong> {{ selectedEvent.start }}</p>
          <p><strong>End:</strong> {{ selectedEvent.end }}</p>
          <p><strong>Status:</strong> {{ selectedEvent.status }}</p>
          <p><strong>Background Color:</strong> {{ selectedEvent.backgroundColor }}</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="closeModal">Close</button>
          <button type="button" class="btn btn-warning" @click="deleteEvent(selectedEvent.id)">Delete event</button>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal backdrop managed through Vue -->
  <div v-if="showModal" class="modal-backdrop fade show"></div>
</div>

</template>

<style scoped>
/* Adjust modal appearance */
.modal {
  background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent background */
}
.modal-backdrop {
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  inset: 0;
}
.modal-dialog {
  margin-top: 10%;
}
</style>
