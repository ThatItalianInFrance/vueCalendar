<template>
  <div class="container mt-4">
    <h1>Planning Management</h1>

    <!-- Add/Edit Form -->
    <div class="card my-4" v-if="showForm">
      <div class="card-body">
        <h5 class="card-title">{{ editing ? 'Edit Planning' : 'Add New Planning' }}</h5>
        <form @submit.prevent="submitForm">
          <div class="mb-3">
            <label for="nom" class="form-label">Name</label>
            <input type="text" id="nom" v-model="form.nom" class="form-control" required />
          </div>
          <div class="mb-3">
            <label for="description" class="form-label">Description</label>
            <input type="text" id="description" v-model="form.description" class="form-control" />
          </div>
          <div class="mb-3">
            <label for="site_id" class="form-label">Equipe ID</label>
            <input type="number" id="site_id" v-model="form.equipe_id" class="form-control" />
          </div>
          <div class="mb-3">
            <label for="configuration" class="form-label">Configuration (JSON)</label>
            <textarea id="configuration" v-model="form.configuration" class="form-control"></textarea>
          </div>
          <!-- Weekly Start and End Times -->

<!-- Work Times -->
<div class="row">
          <div class="col-md-3 mb-3">
            <label for="lunStart" class="form-label">Monday Start</label>
            <input v-model="form.lunStart" id="lunStart" type="time" class="form-control" />
          </div>
          <div class="col-md-3 mb-3">
            <label for="lunEnd" class="form-label">Monday End</label>
            <input v-model="form.lunEnd" id="lunEnd" type="time" class="form-control" />
          </div>

          <div class="col-md-3 mb-3">
            <label for="marStart" class="form-label">Tuesday Start</label>
            <input v-model="form.marStart" id="marStart" type="time" class="form-control" />
          </div>
          <div class="col-md-3 mb-3">
            <label for="marEnd" class="form-label">Tuesday End</label>
            <input v-model="form.marEnd" id="marEnd" type="time" class="form-control" />
          </div>
        </div>

        <div class="row">
          <div class="col-md-3 mb-3">
            <label for="merStart" class="form-label">Wednesday Start</label>
            <input v-model="form.merStart" id="merStart" type="time" class="form-control" />
          </div>
          <div class="col-md-3 mb-3">
            <label for="merEnd" class="form-label">Wednesday End</label>
            <input v-model="form.merEnd" id="merEnd" type="time" class="form-control" />
          </div>

          <div class="col-md-3 mb-3">
            <label for="jeuStart" class="form-label">Thursday Start</label>
            <input v-model="form.jeuStart" id="jeuStart" type="time" class="form-control" />
          </div>
          <div class="col-md-3 mb-3">
            <label for="jeuEnd" class="form-label">Thursday End</label>
            <input v-model="form.jeuEnd" id="jeuEnd" type="time" class="form-control" />
          </div>
        </div>

        <div class="row">
          <div class="col-md-3 mb-3">
            <label for="venStart" class="form-label">Friday Start</label>
            <input v-model="form.venStart" id="venStart" type="time" class="form-control" />
          </div>
          <div class="col-md-3 mb-3">
            <label for="venEnd" class="form-label">Friday End</label>
            <input v-model="form.venEnd" id="venEnd" type="time" class="form-control" />
          </div>

          <div class="col-md-3 mb-3">
            <label for="samStart" class="form-label">Saturday Start</label>
            <input v-model="form.samStart" id="samStart" type="time" class="form-control" />
          </div>
          <div class="col-md-3 mb-3">
            <label for="samEnd" class="form-label">Saturday End</label>
            <input v-model="form.samEnd" id="samEnd" type="time" class="form-control" />
          </div>
        </div>
          
          <div class="mb-3 mt-3">
            <label for="status" class="form-label">Status</label>
            <select id="status" v-model="form.status" class="form-control">
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          <button type="submit" class="btn btn-primary me-2">Save</button>
          <button type="button" class="btn btn-secondary" @click="cancelEdit">Cancel</button>
        </form>
      </div>
    </div>

    <!-- Planning Table -->
    <table class="table table-striped">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Description</th>
          <th>Equipe ID</th>
          <th>Configuration</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="planning in plannings" :key="planning.id">
          <td>{{ planning.id }}</td>
          <td>{{ planning.nom }}</td>
          <td>{{ planning.description }}</td>
          <td>{{ planning.site_id }}</td>
          <td>{{ planning.configuration }}</td>
          <td>{{ planning.status }}</td>
          <td>
            <button class="btn btn-sm btn-warning me-2" @click="editPlanning(planning)">Edit</button>
            <button class="btn btn-sm btn-danger" @click="deletePlanning(planning.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Add Button -->
    <button class="btn btn-success" @click="addNewPlanning">Add New Planning</button>
  </div>
</template>

<script>
import apiClient from "../utils/axios";

export default {
  data() {
    return {
      plannings: [],
      showForm: false,
      editing: false,
      days: [
        { name: "lun", label: "Monday", start: "lunStart", end: "lunEnd" },
        { name: "mar", label: "Tuesday", start: "marStart", end: "marEnd" },
        { name: "mer", label: "Wednesday", start: "merStart", end: "merEnd" },
        { name: "jeu", label: "Thursday", start: "jeuStart", end: "jeuEnd" },
        { name: "ven", label: "Friday", start: "venStart", end: "venEnd" },
        { name: "sam", label: "Saturday", start: "samStart", end: "samEnd" },
      ],
      form: {
        id: null,
        nom: "",
        description: "",
        site_id: null,
        configuration: "",
        lunStart: null,
        lunEnd: null,
        marStart: null,
        marEnd: null,
        merStart: null,
        merEnd: null,
        jeuStart: null,
        jeuEnd: null,
        venStart: null,
        venEnd: null,
        samStart: null,
        samEnd: null,
        status: "active",
      },
    };
  },
  methods: {
    async fetchPlannings() {
      try {
        const response = await apiClient.get("/api/plannings");
        this.plannings = response.data;
      } catch (error) {
        console.error("Failed to fetch plannings:", error);
      }
    },
    addNewPlanning() {
      this.resetForm();
      this.showForm = true;
      this.editing = false;
    },
    editPlanning(planning) {
      this.form = { ...planning };
      this.showForm = true;
      this.editing = true;
    },
    async deletePlanning(id) {
      if (!confirm("Are you sure you want to delete this planning?")) return;
      try {
        await apiClient.delete(`/api/plannings/${id}`);
        this.plannings = this.plannings.filter((p) => p.id !== id);
      } catch (error) {
        console.error("Failed to delete planning:", error);
      }
    },
    async submitForm() {
      try {
        if (this.editing) {
          await apiClient.put(`/api/plannings/${this.form.id}`, this.form);
          // const index = this.plannings.findIndex((p) => p.id === this.form.id);
          // this.$set(this.plannings, index, { ...this.form });
        } else {
          await apiClient.post("/api/newplanning", this.form);
          // this.plannings.push(response.data);
        }
        this.fetchPlannings();
        this.cancelEdit();
      } catch (error) {
        console.error("Failed to save planning:", error);
      }
    },
    cancelEdit() {
      this.resetForm();
      this.showForm = false;
      this.editing = false;
    },
    resetForm() {
      this.form = {
        id: null,
        nom: "",
        description: "",
        site_id: null,
        configuration: "",
        lunStart: null,
        lunEnd: null,
        marStart: null,
        marEnd: null,
        merStart: null,
        merEnd: null,
        jeuStart: null,
        jeuEnd: null,
        venStart: null,
        venEnd: null,
        samStart: null,
        samEnd: null,
        status: "active",
      };
    },
  },
  mounted() {
    this.fetchPlannings();
  },
};
</script>

<style scoped>
table {
  margin-top: 20px;
}
</style>
