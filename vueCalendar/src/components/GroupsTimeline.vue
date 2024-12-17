<script>
import FullCalendar from "@fullcalendar/vue3";
import resourceTimelinePlugin from "@fullcalendar/resource-timeline";
import interactionPlugin from "@fullcalendar/interaction";
import bootstrap5Plugin from "@fullcalendar/bootstrap5";
import apiClient from "../utils/axios"
import dayjs from 'dayjs'
export default {
  components: { FullCalendar },
  data() {
    return {
      groups: [],
      calendarOptions: {
        plugins: [resourceTimelinePlugin, interactionPlugin, bootstrap5Plugin],
        initialView: "resourceTimelineWeek",
        resources: [], // Groups (equipe)
        events: [], // Plannings as events
        headerToolbar: {
          left: "prev,next today",
          center: "title",
          right: "resourceTimelineWeek"
        },
        themeSystem: "bootstrap5",
        height: 550,
        // Customizations for week view
        slotLabelFormat: { weekday: "short" }, // Show "Mon", "Tue", etc.
        slotMinWidth: 60, // Minimum width for each day
        slotDuration: { days: 1 }, // Each slot represents one day
        slotLabelInterval: { days: 1 }, // Label interval for each day
      },
    };
  },
  methods: {
    async fetchEmployees() {
      try {
        const [employeeResponse, planningResponse, equipeResponse] = await Promise.all([
          apiClient.get("http://localhost:3000/api/employees"),
          apiClient.get("http://localhost:3000/api/plannings"),
          apiClient.get("http://localhost:3000/api/groups"),
        ]);

        // Process groups into resources
        this.calendarOptions.resources = equipeResponse.data.map(group => ({
          id: group.id,
          title: group.name,
        }));

        // Process plannings into events
        this.calendarOptions.events = this.generateEvents(planningResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
    generateEvents(plannings) {
      const daysMap = ["lun", "mar", "mer", "jeu", "ven", "sam"];
      const events = [];

      plannings.forEach(planning => {
        daysMap.forEach(day => {
          const startTime = planning[`${day}Start`];
          const endTime = planning[`${day}End`];

          if (startTime && endTime) {
            const dayIndex = daysMap.indexOf(day) + 1; // Map to ISO day (Monday = 1)
            const startDate = this.getStartOfWeek().add(dayIndex - 1, "day").format("YYYY-MM-DD");
            events.push({
              title: planning.nom,
              start: `${startDate}T${startTime}`,
              end: `${startDate}T${endTime}`,
              resourceId: planning.equipe_id,
            });
          }
        });
      });

      return events;
    },
    getStartOfWeek() {
      // Get the start of the current week (Monday)
      return dayjs().startOf("week").add(1, "day");
    },
  },
  mounted() {
    this.fetchEmployees();
  },
};
</script>

<template>
  <div class="container bg-white rounded-2 p-3">

    <div class="filters">
      <label for="group-filter">Filter by Group:</label>
      <select id="group-filter" @change="filterResources($event.target.value)">
        <option value="">All Groups</option>
        <option v-for="group in groups" :key="group.id" :value="group.id">
          {{ group.name }}
        </option>
      </select>

      <label for="event-filter">Filter by Event Type:</label>
      <select id="event-filter" @change="filterEvents($event.target.value)">
        <option value="planning">Planning</option>
        <option value="swipes">Swipes</option>
      </select>
    </div>
    <FullCalendar :options="calendarOptions" />
  </div>

</template>
<style>
.fc-resource-label img {
  margin-right: 8px;
}

.fc-resource-label span {
  font-weight: bold;
}

.filters {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
}

.filters label {
  font-weight: bold;
  margin-right: 10px;
}

.filters select {
  padding: 5px;
}
</style>
