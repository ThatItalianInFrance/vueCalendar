<template>
    <div class="container">

        <div class="plannings-list">
            <h2>Plannings Management</h2>

            <table class="table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Planning Name</th>
                        <th>description</th>
                        <th>Site id</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(planning, index) in plannings" :key="planning.planning_id">
                        <td>{{ index + 1 }}</td>
                        <td>{{ planning.nom }}</td>
                        <td>{{ planning.description }}</td>
                        <td>{{ planning.site_id }}</td>
                        <td>{{ planning.status }}</td>
                        <td>
                            <button class="btn btn-primary btn-sm" @click="editPlanning(planning)">Edit</button>
                            <button class="btn btn-danger btn-sm"
                                @click="deletePlanning(planning.planning_id)">Delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>

            <!-- Edit Planning Modal -->
            <div v-if="showModal" class="modal fade show d-block" tabindex="-1">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Edit Planning</h5>
                            <button type="button" class="btn-close" @click="closeModal"></button>
                        </div>
                        <div class="modal-body">
                            <form @submit.prevent="submitEdit">
                                <div class="mb-3">
                                    <label class="form-label">Planning Name:</label>
                                    <input v-model="selectedPlanning.nom" type="text" class="form-control" required />
                                </div>
                                <!-- Work Times -->
                                <div class="row">
                                    <div class="col-md-3 mb-3">
                                        <label for="lunStart" class="form-label">Monday Start</label>
                                        <input v-model="selectedPlanning.lunStart" id="lunStart" type="time"
                                            class="form-control" />
                                    </div>
                                    <div class="col-md-3 mb-3">
                                        <label for="lunEnd" class="form-label">Monday End</label>
                                        <input v-model="selectedPlanning.lunEnd" id="lunEnd" type="time"
                                            class="form-control" />
                                    </div>

                                    <div class="col-md-3 mb-3">
                                        <label for="marStart" class="form-label">Tuesday Start</label>
                                        <input v-model="selectedPlanning.marStart" id="marStart" type="time"
                                            class="form-control" />
                                    </div>
                                    <div class="col-md-3 mb-3">
                                        <label for="marEnd" class="form-label">Tuesday End</label>
                                        <input v-model="selectedPlanning.marEnd" id="marEnd" type="time"
                                            class="form-control" />
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-md-3 mb-3">
                                        <label for="merStart" class="form-label">Wednesday Start</label>
                                        <input v-model="selectedPlanning.merStart" id="merStart" type="time"
                                            class="form-control" />
                                    </div>
                                    <div class="col-md-3 mb-3">
                                        <label for="merEnd" class="form-label">Wednesday End</label>
                                        <input v-model="selectedPlanning.merEnd" id="merEnd" type="time"
                                            class="form-control" />
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-md-3 mb-3">
                                        <label for="jeuStart" class="form-label">Thursday Start</label>
                                        <input v-model="selectedPlanning.jeuStart" id="jeuStart" type="time"
                                            class="form-control" />
                                    </div>
                                    <div class="col-md-3 mb-3">
                                        <label for="jeuEnd" class="form-label">Thursday End</label>
                                        <input v-model="selectedPlanning.jeuEnd" id="jeuEnd" type="time"
                                            class="form-control" />
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-md-3 mb-3">
                                        <label for="venStart" class="form-label">Friday Start</label>
                                        <input v-model="selectedPlanning.venStart" id="venStart" type="time"
                                            class="form-control" />
                                    </div>
                                    <div class="col-md-3 mb-3">
                                        <label for="venEnd" class="form-label">Friday End</label>
                                        <input v-model="selectedPlanning.venEnd" id="venEnd" type="time"
                                            class="form-control" />
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-md-3 mb-3">
                                        <label for="samStart" class="form-label">Saturday Start</label>
                                        <input v-model="selectedPlanning.samStart" id="samStart" type="time"
                                            class="form-control" />
                                    </div>
                                    <div class="col-md-3 mb-3">
                                        <label for="samEnd" class="form-label">Saturday End</label>
                                        <input v-model="selectedPlanning.samEnd" id="samEnd" type="time"
                                            class="form-control" />
                                    </div>
                                </div>

                                <div class="modal-footer">
                                    <button type="submit" class="btn btn-success">Save</button>
                                    <button type="button" class="btn btn-secondary" @click="closeModal">Cancel</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
import apiClient from '../utils/axios';

export default {
    data() {
        return {
            plannings: [],
            selectedPlanning: {
                planning_name: '',
                date: '',
                start_time: '',
                end_time: '',
                status: '',
                days_of_the_week: [],
                weeks_of_the_month: [],
                months_of_the_year: [],
            },
            selectedDays: [],  // Initialize arrays for selected options
            selectedWeeks: [],
            selectedMonths: [],
            showModal: false,
            selectAllDays: false,
            selectAllWeeks: false,
            selectAllMonths: false,

            daysOptions: [
                { label: 'Monday', value: 1 },
                { label: 'Tuesday', value: 2 },
                { label: 'Wednesday', value: 3 },
                { label: 'Thursday', value: 4 },
                { label: 'Friday', value: 5 },
                { label: 'Saturday', value: 6 },
                // ... all days up to Sunday
            ],
            weekOptions: [1, 2, 3, 4, 5],
            monthOptions: [
                { label: 'January', value: 1 },
                { label: 'February', value: 2 },
                { label: 'March', value: 3 },
                { label: 'April', value: 4 },
                { label: 'May', value: 5 },
                { label: 'June', value: 6 },
                { label: 'July', value: 7 },
                { label: 'August', value: 8 },
                { label: 'September', value: 9 },
                { label: 'October', value: 10 },
                { label: 'November', value: 11 },
                { label: 'December', value: 12 },
                // ... all months up to December
            ],
        };

    },
    watch: {
        selectedDays: {
            handler(newValue) {
                console.log('Selected days updated:', newValue);
            },
            immediate: true,  // Run immediately on component load
        },
    },
    methods: {
        async fetchPlannings() {
            try {
                const response = await apiClient.get('/api/plannings'); // Adjust the endpoint accordingly
                console.log(response);

                this.plannings = response.data;
            } catch (error) {
                console.error('Error fetching plannings:', error);
            }
        },
        editPlanning(planning) {
            // console.log(this.selectedDays);


            this.selectedPlanning = { ...planning }; // Clone planning object
            console.log(this.selectedPlanning.id);
            console.log(this.selectedPlanning);
            // this.selectedDays = planning.days_of_the_week;
            // console.log(this.selectedDays);
            // this.selectedWeeks = planning.weeks_of_the_month;
            // this.selectedMonths = planning.months_of_the_year;
            this.showModal = true;
        },
        closeModal() {
            this.showModal = false;
            this.selectedPlanning = null;
        },
        async submitEdit() {
            try {
                // console.log(this.selectedDays);
                // this.selectedDays = this.selectedPlanning.days_of_the_week;
                // this.selectedWeeks = this.selectedPlanning.weeks_of_the_month;
                // this.selectedMonths = this.selectedPlanning.months_of_the_year;
                await apiClient.put(`/api/plannings/${this.selectedPlanning.id}`, this.selectedPlanning);
                this.fetchPlannings(); // Refresh list
                this.closeModal();
            } catch (error) {
                console.error('Error updating planning:', error);
            }
        },
        async deletePlanning(id) {
            if (confirm('Are you sure you want to delete this planning?')) {
                try {
                    await apiClient.delete(`/api/plannings/${id}`);
                    this.fetchPlannings(); // Refresh list
                } catch (error) {
                    console.error('Error deleting planning:', error);
                }
            }
        },
        toggleAllDays() {
            if (this.selectAllDays) {
                this.selectedPlanning.days_of_the_week = [...this.daysOptions];
            } else {
                this.selectedPlanning.days_of_the_week = [];
            }
        },
        toggleAllWeeks() {
            if (this.selectAllWeeks) {
                this.selectedPlanning.weeks_of_the_month = [...this.weeksOptions];
            } else {
                this.selectedPlanning.weeks_of_the_month = [];
            }
        },
        toggleAllMonths() {
            if (this.selectAllMonths) {
                this.selectedPlanning.months_of_the_year = [...this.monthsOptions];
            } else {
                this.selectedPlanning.months_of_the_year = [];
            }
        },
        resetSelectAll() {
            this.selectAllDays = false;
            this.selectAllWeeks = false;
            this.selectAllMonths = false;
        }
    },
    mounted() {
        this.fetchPlannings();
    }
};
</script>

<style scoped>
.table {
    width: 100%;
    border-collapse: collapse;
}

.table th,
.table td {
    padding: 10px;
    border: 1px solid #ddd;
}

.btn {
    margin-right: 5px;
}

/* Ensure modal-overlay covers the entire screen */
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    /* Dim the background */
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    /* Ensure it's on top */
}

/* Modal styling */
.modale {
    background: white;
    padding: 20px;
    border-radius: 10px;
    width: 400px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
    /* Add shadow for depth */
}

/* Optional: Smooth transition effect */
.modal-overlay-enter-active,
.modal-overlay-leave-active {
    transition: opacity 0.3s;
}

.modal-overlay-enter,
.modal-overlay-leave-to {
    opacity: 0;
}
</style>