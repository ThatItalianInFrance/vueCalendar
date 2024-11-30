<template>
  <div class="container">
    <h1>Employee Management</h1>
    <button @click="fetchEmployees" class="btn btn-primary">Load Employees</button>
    
    <!-- Employee Table -->
    <table class="table mt-3" v-if="employees.length">
      <thead>
        <tr>
          <th>ID</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Department</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="employee in employees" :key="employee.employee_id">
          <td>{{ employee.employee_id }}</td>
          <td>{{ employee.first_name }}</td>
          <td>{{ employee.last_name }}</td>
          <td>{{ employee.email }}</td>
          <td>{{ employee.department }}</td>
          <td>
            <button @click="editEmployee(employee)" class="btn btn-sm btn-warning">Edit</button>
            <button @click="deleteEmployee(employee.employee_id)" class="btn btn-sm btn-danger ms-2">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Employee Form -->
    <div class="card mt-3">
      <div class="card-body">
        <h2>{{ isEditing ? 'Edit Employee' : 'Add New Employee' }}</h2>
        <form @submit.prevent="isEditing ? updateEmployee() : addEmployee()">
          <div class="mb-3">
            <input v-model="form.first_name" type="text" class="form-control" placeholder="First Name" required />
          </div>
          <div class="mb-3">
            <input v-model="form.last_name" type="text" class="form-control" placeholder="Last Name" required />
          </div>
          <div class="mb-3">
            <input v-model="form.email" type="email" class="form-control" placeholder="Email" required />
          </div>
          <div class="mb-3">
            <input v-model="form.department" type="text" class="form-control" placeholder="Department" required />
          </div>
          <button type="submit" class="btn btn-success">{{ isEditing ? 'Update' : 'Add' }}</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      employees: [],
      form: {
        first_name: '',
        last_name: '',
        email: '',
        department: '',
      },
      isEditing: false,
      editingId: null,
    };
  },
  methods: {
    async fetchEmployees() {
      try {
        const response = await axios.get('/api/employees');
        this.employees = response.data;
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    },
    async addEmployee() {
      try {
        await axios.post('/api/employees', this.form);
        this.clearForm();
        this.fetchEmployees(); // Refresh list
      } catch (error) {
        console.error('Error adding employee:', error);
      }
    },
    editEmployee(employee) {
      this.isEditing = true;
      this.editingId = employee.employee_id;
      this.form = { ...employee };
    },
    async updateEmployee() {
      try {
        await axios.put(`/api/employees/${this.editingId}`, this.form);
        this.clearForm();
        this.fetchEmployees();
      } catch (error) {
        console.error('Error updating employee:', error);
      }
    },
    async deleteEmployee(id) {
      try {
        await axios.delete(`/api/employees/${id}`);
        this.fetchEmployees(); // Refresh list
      } catch (error) {
        console.error('Error deleting employee:', error);
      }
    },
    clearForm() {
      this.isEditing = false;
      this.editingId = null;
      this.form = { first_name: '', last_name: '', email: '', department: '' };
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
}
.btn {
  margin-right: 5px;
}
</style>
