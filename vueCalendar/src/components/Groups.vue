<template>
  <div class="container">
    <h1>Group Management</h1>
    <button @click="fetchGroups" class="btn btn-primary">Load Groups</button>

    <!-- Group Table -->
    <table class="table mt-3" v-if="groups.length">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Description</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="group in groups" :key="group.id">
          <td>{{ group.id }}</td>
          <td>{{ group.name }}</td>
          <td>{{ group.description }}</td>
          <td>
            <button @click="editGroup(group)" class="btn btn-sm btn-warning">Edit</button>
            <button @click="deleteGroup(group.id)" class="btn btn-sm btn-danger ms-2">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Group Form -->
    <div class="card mt-3">
      <div class="card-body">
        <h2>{{ isEditing ? 'Edit Group' : 'Add New Group' }}</h2>
        <form @submit.prevent="isEditing ? updateGroup() : addGroup()">
          <div class="mb-3">
            <input v-model="form.name" type="text" class="form-control" placeholder="Group Name" required />
          </div>
          <div class="mb-3">
            <input v-model="form.description" type="text" class="form-control" placeholder="Description" required />
          </div>
          <button type="submit" class="btn btn-success">{{ isEditing ? 'Update' : 'Add' }}</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import axios from 'axios';

export default {
  data() {
    return {
      groups: [],
      form: {
        name: '',
        description: '',
      },
      isEditing: false,
      editingId: null,
    };
  },
  methods: {
    async fetchGroups() {
      try {
        const response = await axios.get('http://localhost:3000/api/groups');
        this.groups = response.data;
        console.log(response.data);
        
      } catch (error) {
        console.error('Error fetching groups:', error);
      }
    },
    async addGroup() {
      try {
        await axios.post('/api/groups', this.form);
        this.clearForm();
        this.fetchGroups();
      } catch (error) {
        console.error('Error adding group:', error);
      }
    },
    editGroup(group) {
      this.isEditing = true;
      this.editingId = group.id;
      this.form = { ...group };
    },
    async updateGroup() {
      try {
        await axios.put(`/api/groups/${this.editingId}`, this.form);
        this.clearForm();
        this.fetchGroups();
      } catch (error) {
        console.error('Error updating group:', error);
      }
    },
    async deleteGroup(id) {
      try {
        await axios.delete(`/api/groups/${id}`);
        this.fetchGroups();
      } catch (error) {
        console.error('Error deleting group:', error);
      }
    },
    clearForm() {
      this.isEditing = false;
      this.editingId = null;
      this.form = { name: '', description: '' };
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
