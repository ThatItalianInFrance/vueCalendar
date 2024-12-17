<script setup lang="ts">
import { ref } from 'vue';
import GroupsManagement from '../components/Groups.vue'
import GroupsTimeline from '../components/GroupsTimeline.vue'
import EmployeeEventsList from '../components/EmployeEventsList.vue';

// Reactive property for the employee ID
const groupId = ref<number | null>(null);

const updateGroupId = (id: number) => {
  console.log("Listener of updateGroupId fired with ID:", id);
  groupId.value = id;
};

// Reactive property for the employee ID
const employeeId = ref<number | null>(null);

// Function to update the employee ID
const updateEmployeeId = (id: number) => {
  console.log("listener of update employyeeee fired" + id);
  
  employeeId.value = id;
};
</script>


<template>
  <main class="container-fluid">
    <div class="row">
      <div class="col-6">
        <GroupsManagement @group-selected="updateGroupId" @employee-selected="updateEmployeeId"/>

      </div>
      <div class="col-6 bg-secondary-subtle rounded-2 p-4">
        <GroupsTimeline :groupId="groupId"/>

      </div>
      
      <EmployeeEventsList v-if="employeeId !== null" :employeeId="employeeId" />
    </div>
    
  </main>
</template>