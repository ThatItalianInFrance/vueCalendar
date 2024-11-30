<template>
  <div class="container mt-4">
    <h2>Create New Planning</h2>
    <form @submit.prevent="submitForm">
      <!-- Employee Selection -->
      <div class="mb-3">
        <label for="employee_id" class="form-label">Employee</label>
        <select class="form-select" id="employee_id" v-model="form.employee_id" required>
          <option v-for="employee in employees" :key="employee.employee_id" :value="employee.employee_id">
            {{ employee.first_name }} <!-- Replace with your employee name field -->
          </option>
        </select>
      </div>

      <!-- Event ID -->
      <div class="mb-3">
        <label for="event_id" class="form-label">Event ID</label>
        <input type="number" class="form-control" id="event_id" v-model="form.event_id" />
      </div>

      <!-- Date -->
      <div class="mb-3">
        <label for="date" class="form-label">Date</label>
        <input type="date" class="form-control" id="date" v-model="form.date" required />
      </div>

      <!-- Start Time -->
      <div class="mb-3">
        <label for="start_time" class="form-label">Start Time</label>
        <input type="time" class="form-control" id="start_time" v-model="form.start_time" required />
      </div>

      <!-- End Time -->
      <div class="mb-3">
        <label for="end_time" class="form-label">End Time</label>
        <input type="time" class="form-control" id="end_time" v-model="form.end_time" required />
      </div>

      <!-- Status -->
      <div class="mb-3">
        <label for="status" class="form-label">Status</label>
        <select class="form-select" id="status" v-model="form.status" required>
          <option value="scheduled">Scheduled</option>
          <option value="modified">Modified</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      <!-- Days of the Week Selector -->
      <div class="mb-3">
        <label for="days_of_the_week" class="form-label">Days of the Week</label>
        <div class="d-flex flex-wrap">
          <div class="form-check me-3" v-for="day in daysOptions" :key="day.value">
            <input
              class="form-check-input"
              type="checkbox"
              :value="day.value"
              v-model="form.days_of_the_week"
              :id="`day_${day.value}`"
            />
            <label class="form-check-label" :for="`day_${day.value}`">
              {{ day.label }}
            </label>
          </div>
        </div>
      </div>

      <button type="submit" class="btn btn-primary">Create Planning</button>
    </form>
  </div>
</template>

<script>
import apiClient from "../utils/axios.js"

export default {
  name: 'CreatePlanningForm',
  data() {
    return {
      form: {
        employee_id: '',
        event_id: '',
        date: '',
        start_time: '',
        end_time: '',
        status: 'scheduled',
        days_of_the_week: [], // Store as an array
      },
      employees: [], // Employee list fetched from API
      daysOptions: [
        { value: 0, label: 'Sunday' },
        { value: 1, label: 'Monday' },
        { value: 2, label: 'Tuesday' },
        { value: 3, label: 'Wednesday' },
        { value: 4, label: 'Thursday' },
        { value: 5, label: 'Friday' },
        { value: 6, label: 'Saturday' },
      ],
    }
  },
  methods: {
    async fetchEmployees() {
      try {
        const response = await apiClient.get('api/employees')
        this.employees = response.data // Ensure the endpoint returns an array of employees
      } catch (error) {
        console.error('Error fetching employees:', error)
        alert('Failed to load employees.')
      }
    },
    async submitForm() {
      try {
        const planningData = {
          ...this.form,
          days_of_the_week: JSON.stringify(this.form.days_of_the_week), // Convert array to JSON string
        }

        // Send data to the backend
        const response = await apiClient.post('/api/plannings', planningData)
        console.log('Planning created successfully:', response.data)
        alert('Planning created successfully!')

        // Optionally reset the form
        this.resetForm()
      } catch (error) {
        console.error('Error creating planning:', error)
        alert('Failed to create planning.')
      }
    },
    resetForm() {
      this.form = {
        employee_id: '',
        event_id: '',
        date: '',
        start_time: '',
        end_time: '',
        status: 'scheduled',
        days_of_the_week: [],
      }
    },
  },
  created() {
    this.fetchEmployees() // Fetch employees when the component loads
  },
}
</script>

<style scoped>
.container {
  max-width: 600px;
  margin-top: 20px;
}
.form-check {
  margin-bottom: 8px;
}
</style>

