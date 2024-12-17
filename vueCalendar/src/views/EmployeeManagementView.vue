<script setup lang="ts">
import { ref } from 'vue';
import EmployeeManagement from '../components/NewEmployee.vue';
import EmployeeEventsList from '../components/EmployeEventsList.vue';

// Reactive property for the employee ID
const employeeId = ref<number | null>(null);

// Function to update the employee ID
const updateEmployeeId = (id: number) => {
  console.log("listener fired" + id);
  
  employeeId.value = id;
};
</script>

<template >
  <main class="bg-secondary-subtle rounded-4 p-2">
    <!-- Pass the update function to EmployeeManagement -->
    <EmployeeManagement @employee-selected="updateEmployeeId" />
    
    <!-- Pass the employeeId as a prop to EmployeeEventsList -->
    <EmployeeEventsList v-if="employeeId !== null" :employeeId="employeeId" />
  </main>
</template>
<style>

</style>