<template>
  <div class="container-fluid">
    <h1>Employee Management</h1>
    <button @click="fetchEmployees" class="btn btn-primary">Load Employees</button>
    <button @click="closeEmployeeList()" class="btn btn-sm btn-success">close list</button>
    <button @click="closeForm()" class="btn btn-sm btn-success">Nouveau Employé</button>
    <!-- Employee Table -->
    <table class="table mt-3" v-if="employees.length">
      <thead>
        <tr>
          <th>ID</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Group</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="employee in employees" :key="employee.id">
          <td>{{ employee.id }}</td>
          <td>{{ employee.firstname }}</td>
          <td>{{ employee.surname }}</td>
          <td>{{ employee.email }}</td>
          <td>{{ employee.equipe_id }}</td> <!-- Display group name -->
          <td>

            <button @click="editEmployee(employee)" class="btn btn-sm btn-warning">Edit</button>
            <button @click="emitEmployeeId(employee.id)" class="btn btn-sm btn-warning">emit id</button>
            <button @click="deleteEmployee(employee.id)" class="btn btn-sm btn-danger ms-2">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Employee Form -->
    <div v-if="showForm" class="container-fluid mt-4">
      <form @submit.prevent="submitForm">
        <h2>{{ formTitle }}</h2>
        <div class="row">
          <div class="mb-3 col-md-2">
            <label for="firstname" class="form-label">First Name</label>
            <input v-model="formData.firstname" id="firstname" type="text" class="form-control" required />
          </div>

          <div class="mb-3 col-md-2">
            <label for="surname" class="form-label">Last Name</label>
            <input v-model="formData.surname" id="surname" type="text" class="form-control" required />
          </div>

          <div class="mb-3 col-md-2">
            <label for="email" class="form-label">Email</label>
            <input v-model="formData.email" id="email" type="email" class="form-control" required />
          </div>

          <div class="mb-3 col-md-2">
            <label for="telephone" class="form-label">Telephone</label>
            <input v-model="formData.telephone" id="telephone" type="text" class="form-control" required />
          </div>
        </div>
        <div class="row">
          <div class="mb-3 col-md-1">
            <label for="site_id" class="form-label">Site ID</label>
            <input v-model="formData.site_id" id="site_id" type="number" class="form-control" />
          </div>

          <div class="mb-3 col-md-1">
            <label for="equipe_id" class="form-label">Equipe IDs</label>
            <input v-model="formData.equipe_id" id="equipe_id" type="number" class="form-control" />
          </div>

          <div class="mb-3 col-md-2">
            <label for="deplacements_autorise" class="form-label">Deplacements Autorise</label>
            <select v-model="formData.deplacements_autorise" id="deplacements_autorise" class="form-select">
              <option value="true">True</option>
              <option value="false">False</option>
            </select>
          </div>

          <div class="mb-3 col-md-2">
            <label for="matriculerh" class="form-label">Matriculerh</label>
            <input v-model="formData.matriculerh" id="matriculerh" type="text" class="form-control" />
          </div>
        </div>
        <div class="mb-3  col-md-3">
          <label for="options" class="form-label">Options (JSON)</label>
          <input type="text" v-model="formData.options" id="options" class="form-control" />
        </div>

        <!-- planning selector -->
        <div class="col-md-3">

          <div class="input-group mb-3 col-6">

            <select v-model="selectedPlanningModel" id="planningModel" class="form-select ">
              <option v-for="model in plannings" :key="model.model_id" :value="model">
                {{ model.nom }}
              </option>
            </select>
            <button @click.prevent="applyPlanningModel" class="btn btn-primary mt-2">Appliquer modèle</button>
          </div>
        </div>



        <!-- Work Times -->
        <div class="row">
          <div class="col-md-2 mb-3">
            <label for="lunStart" class="form-label">Monday Start</label>
            <input v-model="formData.lunStart" id="lunStart" type="time" class="form-control" />
          </div>
          <div class="col-md-2 mb-3">
            <label for="lunEnd" class="form-label">Monday End</label>
            <input v-model="formData.lunEnd" id="lunEnd" type="time" class="form-control" />
          </div>

          <div class="col-md-2 mb-3">
            <label for="marStart" class="form-label">Tuesday Start</label>
            <input v-model="formData.marStart" id="marStart" type="time" class="form-control" />
          </div>
          <div class="col-md-2 mb-3">
            <label for="marEnd" class="form-label">Tuesday End</label>
            <input v-model="formData.marEnd" id="marEnd" type="time" class="form-control" />
          </div>
        </div>

        <div class="row">
          <div class="col-md-2 mb-3">
            <label for="merStart" class="form-label">Wednesday Start</label>
            <input v-model="formData.merStart" id="merStart" type="time" class="form-control" />
          </div>
          <div class="col-md-2 mb-3">
            <label for="merEnd" class="form-label">Wednesday End</label>
            <input v-model="formData.merEnd" id="merEnd" type="time" class="form-control" />
          </div>

          <div class="col-md-2 mb-3">
            <label for="jeuStart" class="form-label">Thursday Start</label>
            <input v-model="formData.jeuStart" id="jeuStart" type="time" class="form-control" />
          </div>
          <div class="col-md-2 mb-3">
            <label for="jeuEnd" class="form-label">Thursday End</label>
            <input v-model="formData.jeuEnd" id="jeuEnd" type="time" class="form-control" />
          </div>
        </div>

        <div class="row">
          <div class="col-md-2 mb-3">
            <label for="venStart" class="form-label">Friday Start</label>
            <input v-model="formData.venStart" id="venStart" type="time" class="form-control" />
          </div>
          <div class="col-md-2 mb-3">
            <label for="venEnd" class="form-label">Friday End</label>
            <input v-model="formData.venEnd" id="venEnd" type="time" class="form-control" />
          </div>

          <div class="col-md-2 mb-3">
            <label for="samStart" class="form-label">Saturday Start</label>
            <input v-model="formData.samStart" id="samStart" type="time" class="form-control" />
          </div>
          <div class="col-md-2 mb-3">
            <label for="samEnd" class="form-label">Saturday End</label>
            <input v-model="formData.samEnd" id="samEnd" type="time" class="form-control" />
          </div>
        </div>

        <div class="d-flex justify-content-between">
          <button type="submit" class="btn btn-primary">{{ formSubmitButton }}</button>

          <button type="button" @click="closeForm" class="btn btn-secondary">Cancel</button>
        </div>
        <div>
          <!-- Generate Planning Form -->
          <form @submit.prevent="generateEvents(formData.id)" class="d-flex">
            <div class="form-group col-2 me-2">
              <label for="startDate">Start Date:</label>
              <input type="date" id="startDate" v-model="planningForm.startDate" class="form-control" required />
            </div>
            <div class="form-group col-2 me-2">
              <label for="endDate">End Date:</label>
              <input type="date" id="endDate" v-model="planningForm.endDate" class="form-control" required />
            </div>
            <div class="form-group col-2 me-2 mt-auto">

              <button type="submit" id="btn"  class="btn btn-primary">Generate
                Planning l'employé</button>
            </div>

          </form>
        </div>
      </form>
    </div>
  </div>

</template>

<script lang="ts">
import apiClient from '../utils/axios';
import generateEmployeeEvents from '../utils/event-utils'
// import { generateEmployeeGroupPlanning } from '../utils/event-utils';
export default {
  data() {
    return {
      planningForm: [],
      scheduleEvents: [], // To store generated schedule events
      planningModels: [], // Stores the fetched planning models
      selectedPlanningModel: {
        lunStart: null,
        lunEnd: null,
        marStart: '',
        marEnd: '',
        merStart: '',
        merEnd: '',
        jeuStart: '',
        jeuEnd: '',
        venStart: '',
        venEnd: '',
        samStart: '',
        samEnd: '',
      }, // Selected model
      employees: [],
      groups: [], // Store group data
      plannings: [], // Store plannings data
      showForm: true,
      formData: {
        id: null,
        firstname: '',
        surname: '',
        email: '',
        telephone: '',
        site_id: null,
        equipe_id: null,
        deplacements_autorise: 'true',
        matriculerh: '',
        options: null,
        lunStart: '',
        lunEnd: '',
        marStart: '',
        marEnd: '',
        merStart: '',
        merEnd: '',
        jeuStart: '',
        jeuEnd: '',
        venStart: '',
        venEnd: '',
        samStart: '',
        samEnd: '',
      },
      formTitle: 'Add Employee',
      formSubmitButton: 'Add Employee',

      isEditing: false,
      editingId: null,
    };
  },
  methods: {
    generateEvents(employeeId) {
      console.log(employeeId);
      const { startDate, endDate } = this.planningForm;

      // Validate that dates are provided
      if (!startDate || !endDate) {
        console.error('Start Date and End Date are required.');
        return;
      }
      console.log(startDate, endDate);

      generateEmployeeEvents(employeeId, startDate, endDate)
    },
    emitEmployeeId(employeeId) {
      console.log("emit clicked" + employeeId);

      this.$emit('employee-selected', employeeId);
    },
    async generateScheduleEvents(employees, holidays, startDate, endDate) {

      const holidayDates = holidays.map((h) => h.holiday_date); // Extract holiday dates
      // const events = [];

      let currentDate = new Date(startDate);
      const end = new Date(endDate);

      // Loop through the date range
      while (dayjs(currentDate).isSameOrBefore(dayjs(end))) {

        const dayOfWeek = dayjs(currentDate).locale('fr').format('ddd').toLowerCase().slice(0, 3); // 'mon', 'tue', etc.

        employees.forEach((employee) => {
          const startKey = `${dayOfWeek}Start`;
          const endKey = `${dayOfWeek}End`;

          // Check if the employee works on this day and the date is not a holiday
          if (
            employee[startKey] &&
            employee[endKey] &&
            !holidayDates.includes(dayjs(currentDate).format('YYYY-MM-DD'))
          ) {
            events.push({
              id: createEventId(),
              resource_id: employee.id,
              title: `${employee.firstname} ${employee.surname}`,
              start: `${currentDate.format('YYYY-MM-DD')}T${employee[startKey]}`,
              end: `${currentDate.format('YYYY-MM-DD')}T${employee[endKey]}`,
              extendedProps: {
                employeeId: employee.id,
                email: employee.email,
                telephone: employee.telephone,
              },
            });
          }
        });

        // Move to the next day (correctly update the currentDate)
        currentDate = dayjs(currentDate).add(1, 'day');
      }
      // console.log(events);

      return events;
    },

    async fetchEmployees() {
      try {
        const [employeeResponse, groupResponse, planningsResponse] = await Promise.all([
          apiClient.get('http://localhost:3000/api/employees'),
          apiClient.get('http://localhost:3000/api/groups'), // Fetch groups
          apiClient.get('http://localhost:3000/api/plannings'), // fetch plannings
        ]);
        console.log(employeeResponse.data);

        this.employees = employeeResponse.data;
        this.groups = groupResponse.data; // Load group data
        this.plannings = planningsResponse.data; // load plannings data
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    },
    async closeEmployeeList() {
      this.employees = []
    },
    // async fetchPlannings() {
    //   try {
    //     const [planningsResponse] = await Promise.all([
    //       apiClient.get('http://localhost:3000/api/plannings'),
    //       // apiClient.get('http://localhost:3000/api/groups'), // Fetch groups
    //     ]);
    //     console.log(planningsResponse.data);

        
    //     // this.groups = groupResponse.data; // Load group data
    //   } catch (error) {
    //     console.error('Error fetching employees:', error);
    //   }
    // },
    applyPlanningModel() {
      if (this.selectedPlanningModel) {
        const model = this.selectedPlanningModel;
        this.formData.lunStart = model.lunStart || '';
        this.formData.lunEnd = model.lunEnd || '';
        this.formData.marStart = model.marStart || '';
        this.formData.marEnd = model.marEnd || '';
        this.formData.merStart = model.merStart || '';
        this.formData.merEnd = model.merEnd || '';
        this.formData.jeuStart = model.jeuStart || '';
        this.formData.jeuEnd = model.jeuEnd || '';
        this.formData.venStart = model.venStart || '';
        this.formData.venEnd = model.venEnd || '';
        this.formData.samStart = model.samStart || '';
        this.formData.samEnd = model.samEnd || '';
      } else {
        console.error('No planning model selected.');
      }
    },
    async addEmployee() {
      try {
        await apiClient.post('/api/employees', this.formData);
        this.clearForm();
        this.fetchEmployees(); // Refresh list
      } catch (error) {
        console.error('Error adding employee:', error);
      }
    },
    editEmployee(employee) {
      console.log(employee);

      this.formData = { ...employee };
      this.formTitle = 'Edit Employee';
      this.formSubmitButton = 'Update Employee';
      this.showForm = true;
    },
    async updateEmployee() {
      try {
        await apiClient.put(`/api/employees/${this.editingId}`, this.formData);
        this.clearForm();
        this.fetchEmployees();

      } catch (error) {
        console.error('Error updating employee:', error);
      }
    },
    async deleteEmployee(id) {
      try {
        await apiClient.delete(`/api/employees/${id}`);
        this.fetchEmployees(); // Refresh list
      } catch (error) {
        console.error('Error deleting employee:', error);
      }
    },
    clearForm() {
      this.isEditing = false;
      this.editingId = null;
      this.form = { first_name: '', last_name: '', email: '', group_id: '', hire_date: '' };
    },
    // Close the form
    closeForm() {
      this.showForm = !this.showForm;
    },
    submitForm() {
      if (this.formData.id) {
        // Update an existing employee
        apiClient.put(`/api/employees/${this.formData.id}`, this.formData)
          .then(() => {
            this.fetchEmployees(); // Refresh the employee list
            this.closeForm();
          })
          .catch(error => {
            console.error('Error updating employee:', error);
          });
      } else {
        // Add a new employee
        apiClient.post('/api/employees', this.formData)
          .then(() => {
            this.fetchEmployees(); // Refresh the employee list
            this.closeForm();
          })
          .catch(error => {
            console.error('Error adding employee:', error);
          });
      }
    },

  },
  computed: {
    // Maps employees to include group names
    // employeeWithGroupName() {
    //   return this.employees.map(emp => {
    //     const group = this.groups.find(g => g.group_id === emp.group_id);
    //     return {
    //       ...emp,
    //       group_name: group ? group.name : 'Unknown',
    //     };
    //   });
    // },
  },
  mounted() {
    this.fetchEmployees()
    console.log("this");

  }


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
