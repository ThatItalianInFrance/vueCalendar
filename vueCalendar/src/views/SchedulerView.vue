
<template>
  <div class="container mx-auto p-4">
    <EmployeeScheduler
      :initial-employees="employees"
      :initial-holidays="holidays"
      :initial-recurring-events="recurringEvents"
    />
  </div>
</template>

<script>
import { ref } from 'vue'
import EmployeeScheduler from '../components/EmployeeScheduler.vue'

export default {
  components: {
    EmployeeScheduler
  },
  setup() {
    const employees = ref([
      {
        id: '1',
        name: 'John Smith',
        role: 'Developer',
        schedule: {
          defaultShift: {
            start: '09:00',
            end: '17:00',
            daysOfWeek: [1, 2, 3, 4, 5]
          },
          exceptions: []
        }
      }
    ])

    const holidays = ref([
      {
        id: 'h1',
        name: 'Christmas',
        date: '2024-12-25'
      }
    ])

    const recurringEvents = ref([])

    return {
      employees,
      holidays,
      recurringEvents
    }
  }
}
</script>