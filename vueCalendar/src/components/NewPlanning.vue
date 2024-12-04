<template>
  <div class="container mt-4">
    <h2>Create New Planning</h2>
    <form @submit.prevent="submitForm">
      <!-- Employee Selection -->
      <div class="mb-3">
        <label for="group_id" class="form-label">Group</label>
        <select class="form-select" id="group_id" v-model="form.group_id" >
          <option
            v-for="group in groups"
            :key="group.group_id"
            :value="group.group_id"
          >
            {{ group.group_name }}
            <!-- Replace with your group name field -->
          </option>
          <option :value="null">no group</option>
        </select>
      </div>

      <div class="mb-3">
        <label for="name" class="form-label">Name</label>
        <input type="text" class="form-control" id="date" v-model="form.name" required />
      </div>

      <!-- Date -->
      <div class="mb-3">
        <label for="date" class="form-label">Date</label>
        <input type="date" class="form-control" id="date" v-model="form.date" required />
      </div>

      <!-- Start Time -->
      <div class="mb-3">
        <label for="start_time" class="form-label">Start Time</label>
        <input
          type="time"
          class="form-control"
          id="start_time"
          v-model="form.start_time"
          required
        />
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

      <!-- Weeks of the Month Selector -->
      <div class="mb-3">
        <label for="weeks_of_the_month" class="form-label">Weeks of the Month</label>
        <div class="d-flex flex-wrap">
          <div class="form-check me-3" v-for="week in weekOptions" :key="week.value">
            <input
              class="form-check-input"
              type="checkbox"
              :value="week.value"
              v-model="form.weeks_of_the_month"
              :id="`week_${week.value}`"
            />
            <label class="form-check-label" :for="`week_${week.value}`">
              {{ week.label }}
            </label>
          </div>
        </div>
      </div>

      <!-- Months of the Year Selector -->
      <div class="mb-3">
        <label for="months_of_the_year" class="form-label">Months of the Year</label>
        <div class="d-flex flex-wrap">
          <div class="form-check me-3" v-for="month in monthOptions" :key="month.value">
            <input
              class="form-check-input"
              type="checkbox"
              :value="month.value"
              v-model="form.months_of_the_year"
              :id="`month_${month.value}`"
            />
            <label class="form-check-label" :for="`month_${month.value}`">
              {{ month.label }}
            </label>
          </div>
        </div>
      </div>

      <!-- Year Selector -->
      <div class="mb-3">
        <label for="years" class="form-label">Years</label>
        <input
          type="text"
          class="form-control"
          id="years"
          v-model="form.years"
          placeholder="Enter years, separated by commas"
        />
      </div>

      <button type="submit" class="btn btn-primary">Create Planning</button>
    </form>
  </div>
</template>

<script>
import apiClient from '../utils/axios.js'
import axios from 'axios'

export default {
  name: 'CreatePlanningForm',
  data() {
    return {
      form: {
        planning_name: '',
        group_id: null,
        
      
        date: '',
        start_time: '',
        end_time: '',
        status: 'scheduled',
        days_of_the_week: [], // Store as an array
        weeks_of_the_month: [], // Store as an array
        months_of_the_year: [], // Store as an array
      },
      groups: [], // Employee list fetched from API
      daysOptions: [
        { value: 0, label: 'Sunday' },
        { value: 1, label: 'Monday' },
        { value: 2, label: 'Tuesday' },
        { value: 3, label: 'Wednesday' },
        { value: 4, label: 'Thursday' },
        { value: 5, label: 'Friday' },
        { value: 6, label: 'Saturday' },
      ],
      weekOptions: [
        { value: 1, label: 'Week 1' },
        { value: 2, label: 'Week 2' },
        { value: 3, label: 'Week 3' },
        { value: 4, label: 'Week 4' },
        { value: 5, label: 'Week 5' },
      ],
      monthOptions: [
        { value: 0, label: 'January' },
        { value: 1, label: 'February' },
        { value: 2, label: 'March' },
        { value: 3, label: 'April' },
        { value: 4, label: 'May' },
        { value: 5, label: 'June' },
        { value: 6, label: 'July' },
        { value: 7, label: 'August' },
        { value: 8, label: 'September' },
        { value: 9, label: 'October' },
        { value: 10, label: 'November' },
        // Continue for all months...
        { value: 11, label: 'December' },
      ],
    }
  },
  methods: {
    async fetchGroups() {
      try {
        const response = await apiClient.get('api/groups')
        this.groups = response.data // Ensure the endpoint returns an array of employees
      } catch (error) {
        console.error('Error fetching groups:', error)
        alert('Failed to load groups.')
      }
    },
    async submitForm() {
      try {
        const planningData = {
          ...this.form,
          days_of_the_week: JSON.stringify(this.form.days_of_the_week),
  weeks_of_the_month: JSON.stringify(this.form.weeks_of_the_month),
  months_of_the_year: JSON.stringify(this.form.months_of_the_year),
        }

        // Send data to the backend
        console.log(planningData);
        
        const response = await axios.post('http://localhost:3000/api/newplanning', planningData)
        // const response = await apiClient.post('/api/newplanning', planningData)
        console.log('Planning created successfully:', response.data)
        alert('Planning created successfully!')

        // Optionally reset the form
        this.resetForm()
      } catch (error) {
        console.error('Error creating planning:', error.response.data)
        alert('Failed to create planning.' +  (error.response?.data?.message || 'Unknown error.'))}
      
    },
    resetForm() {
      this.form = {
        planning_name: '',
        group_id: '',
        date: '',
        start_time: '',
        end_time: '',
        status: 'scheduled',
        days_of_the_week: [],
        weeks_of_the_month: [],
        months_of_the_year: [],
      }
    },
  },
  created() {
    this.fetchGroups() // Fetch employees when the component loads
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
