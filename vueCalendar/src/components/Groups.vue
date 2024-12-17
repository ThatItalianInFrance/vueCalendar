<template>
  <div class="container-fluid bg-secondary-subtle rounded-3 p-2">
    <h1>Group Management</h1>
    <button @click="toggleAddGroup()" class="btn btn-primary">Ajouter groupe</button>


    <!-- Group Table -->
    <table class="table mt-3" v-if="groups.length">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Description</th>
          <th>site ID</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="group in groups" :key="group.id">
          <td>{{ group.id }}</td>
          <td>{{ group.name }}</td>
          <td>{{ group.description }}</td>
          <td>{{ group.site_id }}</td>
          <td>
            <button @click="editGroup(group)" class="btn btn-sm btn-warning">Edit</button>
            <button @click="emitGroupId(group.id)" class="btn btn-sm btn-success">employées du groupe</button>
            <button @click="deleteGroup(group.id)" class="btn btn-sm btn-danger ms-2">Delete</button>

          </td>
        </tr>
      </tbody>
    </table>

    <!-- Group Form -->
    <div class="card mt-3 shadow" v-if="addingGroup">
      <div class="card-body">
        <h2>{{ isEditing ? 'Modification groupe' : 'Création groupe' }}</h2>
        <form @submit.prevent="isEditing ? updateGroup() : addGroup()">
          <div class="mb-3">
            <input v-model="form.name" type="text" class="form-control" placeholder="Group Name" required />
          </div>
          <div class="mb-3">
            <input v-model="form.description" type="text" class="form-control" placeholder="Description" required />
          </div>
          <div class="mb-3">
            <input v-model="form.site_id" type="text" class="form-control" placeholder="site ID" required />
          </div>
          <button type="submit" class="btn btn-success">{{ isEditing ? 'Modifier' : 'Créer' }}</button>
          <button type="button" @click="toggleAddGroup()" class="btn btn-secondary">Fermer</button>
        </form>
      </div>
    </div>
  </div>
  <div v-if="employees.length">
    <h3>Employees du groupe</h3>
    <button @click="toggleSelectAll()" class="btn btn-primary mb-2">
      {{ allSelected ? 'Vider la selection' : 'Sélectionner tout le groupe' }}
    </button>
    <table>
      <thead>
        <tr>
          <th>Nom</th>
          <th>Site</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="employee in employees" :key="employee.id">

          <td>
            <div class="form-check">
              <input class="form-check-input" type="checkbox" :id="'employee-' + employee.id"
                v-model="selectedEmployees" :value="employee.id">
              <label class="form-check-label" :for="'employee-' + employee.id">
                {{ employee.firstname }} {{ employee.surname }}
              </label>
            </div>
          </td>
          <td>
            {{ employee.site_id }}

          </td>
          <td>
            <button @click="emitEmployeeId(employee.id)">showplanning</button>
          </td>
        </tr>

      </tbody>
    </table>

    <!-- Generate Planning Form -->
    <form @submit.prevent="generateGroupPlanning()" class="d-flex">
      <div class="form-group col-2 me-2">
        <label for="startDate">Start Date:</label>
        <input type="date" id="startDate" v-model="planningForm.startDate" class="form-control" required />
      </div>
      <div class="form-group col-2 me-2">
        <label for="endDate">End Date:</label>
        <input type="date" id="endDate" v-model="planningForm.endDate" class="form-control" required />
      </div>
      <div class="form-group col-2 me-2 mt-auto">

        <button type="submit" id="btn" class="btn btn-primary">Generate
          Planning l'employé</button>
      </div>

    </form>


  </div>
</template>

<script lang="ts">
import apiClient from '../utils/axios';
import generateEmployeeEvents from '../utils/event-utils'
export default {
  emits: ['group-selected', 'employee-selected'], // Declare custom events here
  data() {
    return {
      planningForm: [],
      groups: [],
      employees: [],
      employeeId: '',
      selectedEmployees: [], // Store selected employee IDs
      form: {
        name: '',
        description: '',
        site_id: '',
      },
      isEditing: false,
      editingId: null,
      allSelected: false,
      addingGroup: false,
    };
  },
  methods: {
    async emitEmployeeId(employeeId) {
      console.log("employée emit clicked" + employeeId);

      this.$emit('employee-selected', employeeId);
    },
    toggleSelectAll() {
      if (this.allSelected) {
        this.selectedEmployees = [];
      } else {
        this.selectedEmployees = this.employees.map(employee => employee.id);
      }
      this.allSelected = !this.allSelected;
    },
    async generateGroupPlanning() {
      // console.log(this.selectedEmployees);
      const { startDate, endDate } = this.planningForm;

      // Validate that dates are provided
      if (!startDate || !endDate) {
        console.error('Start Date and End Date are required.');
        return;
      }
      console.log(startDate, endDate);
      this.selectedEmployees.forEach(element => {
        console.log(element);
         generateEmployeeEvents(element, startDate, endDate)

      });

    },
    async emitGroupId(groupId) {
      this.selectedEmployees = []
      console.log("group emit clicked" + groupId);
      this.fetchEmployees(groupId);
      this.$emit('group-selected', groupId);
    },
    async fetchGroups() {
      try {
        const response = await apiClient.get('/api/groups');
        this.groups = response.data;
        console.log(response.data);

      } catch (error) {
        console.error('Error fetching groups:', error);
      }
    },
    async toggleAddGroup() {
      this.addingGroup = !this.addingGroup;
    },
    async addGroup() {
      try {
        console.log(this.form);

        await apiClient.post('http://localhost:3000/api/groups', this.form);
        this.clearForm();
        this.fetchGroups();
      } catch (error) {
        console.error('Error adding group:', error);
      }
      this.addingGroup = false;

    },

    async editGroup(group) {
      this.addingGroup = true;
      this.isEditing = true;
      this.editingId = group.id;
      this.form = { ...group };
    },
    async updateGroup() {
      try {
        await apiClient.put(`http://localhost:3000/api/groups/${this.editingId}`, this.form);
        this.clearForm();
        this.fetchGroups();
      } catch (error) {
        console.error('Error updating group:', error);
      }
    },
    async deleteGroup(id) {

      if (confirm("Press a button!") == true) {
        try {

          await apiClient.delete(`http://localhost:3000/api/groups/${id}`);
          this.fetchGroups();
        } catch (error) {
          console.error('Error deleting group:', error);
        }
      } else {
        alert("action canceled")
      }

    },
    async fetchEmployees(groupId) {
      try {
        // Construct the URL with the query string
        const response = await apiClient.get(`http://localhost:3000/api/employees`, {
          params: {
            equipe_id: groupId, // Adding the groupId as a query parameter
          },
        });
        this.employees = response.data;
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    },

    clearForm() {
      this.isEditing = false;
      this.editingId = null;
      this.form = { name: '', description: '', site_id: '' };
    },
  },
  mounted() {
    this.fetchGroups()
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
