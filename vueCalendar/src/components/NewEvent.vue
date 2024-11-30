<template>
  <div class="container mt-4">
    <h2>Manage Events</h2>
    
    <!-- Event Form -->
    <form @submit.prevent="submitForm">
      <div class="mb-3">
        <label class="form-label">Title</label>
        <input v-model="form.title" class="form-control" required />
      </div>
      <div class="mb-3">
        <label class="form-label">Resource</label>
        <input v-model="form.resource_id" class="form-control" required />
      </div>

      <div class="mb-3">
        <label class="form-label">Start Date & Time</label>
        <input type="datetime-local" v-model="form.start" class="form-control" required />
      </div>

      <div class="mb-3">
        <label class="form-label">End Date & Time</label>
        <input type="datetime-local" v-model="form.end" class="form-control" required />
      </div>

      <button type="submit" class="btn btn-primary">{{ editing ? 'Update Event' : 'Create Event' }}</button>
    </form>
    
    <!-- Event List -->
    <ul class="list-group mt-4">
      <li v-for="event in events" :key="event.id" class="list-group-item">
        {{ event.title }} - {{ event.start }} to {{ event.end }}
        <button class="btn btn-danger btn-sm float-end" @click="deleteEvent(event.id)">Delete</button>
        <button class="btn btn-warning btn-sm float-end me-2" @click="editEvent(event)">Edit</button>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import apiClient from "../utils/axios.js"
import {ref} from 'vue'
export default {
  data() {
  return {
    events: [], // Initialize as an empty array
    form: {
      title: '',
      resource_id: '',
      start: '',
      end: '',
    },
    editing: false,
    currentId: null,
  };
},
  mounted() {
    this.fetchEvents();
    console.log(this.events);
    
  },
  methods: {
    async fetchEvents() {
      try {
        const response = await apiClient.get('/api/events');
    this.events = response.data;
    console.log(response.data);  // Should show an array of events
      } catch (error) {
        console.error('Failed to fetch events:', error);
      }
    },
    async submitForm() {
      try {
        if (this.editing) {
          await apiClient.put(`/api/events/${this.currentId}`, this.form);
        } else {
          await apiClient.post('/api/events', this.form);
        }
        this.resetForm();
        this.fetchEvents();
      } catch (error) {
        console.error('Error saving event:', error);
      }
    },
    async deleteEvent(id) {
      try {
        await apiClient.delete(`/api/events/${id}`);
        this.fetchEvents();
      } catch (error) {
        console.error('Error deleting event:', error);
      }
    },
    editEvent(event) {
      this.form = { ...event };
      this.editing = true;
      this.currentId = event.id;
    },
    resetForm() {
      this.form = { title: '', start: '', end: '' };
      this.editing = false;
      this.currentId = null;
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 600px;
}
</style>
