<script>
import { ref, watch, onMounted, computed } from "vue";
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import apiClient from "../utils/axios";
import dayjs from "dayjs";


export default {
    name: "EmployeeEventsList",
    components: {
        FullCalendar,
    },
    props: {
        employeeId: {
            type: Number,
            required: true,
        },
    },
    setup(props) {
        const events = ref([]);
        const formattedEvents = ref([]);

        // Fetch events from API
        const fetchEvents = async () => {
            try {
                const response = await apiClient.get(`/api/events?resource_id=${props.employeeId}`);
                events.value = response.data;
                formatEvents();
            } catch (error) {
                console.error("Error fetching events:", error);
            }
        };

        // Format events for FullCalendar
        const formatEvents = () => {
            formattedEvents.value = events.value.map(event => ({
                title: event.title,
                start: dayjs(event.start).toISOString(),
                end: dayjs(event.end).toISOString(),
                extendedProps: event.extended_props || 'N/A',
            }));
        };

        // Format date for display
        const formatDate = (date) => {
            return dayjs(date).format("YYYY-MM-DD HH:mm");
        };

        // Handle event click for FullCalendar
        const handleEventClick = (info) => {
            alert(`Event: ${info.event.title}\nStart: ${info.event.startStr}\nEnd: ${info.event.endStr}`);
        };
        // Handle event click for FullCalendar
        const handleDateClick = (info) => {
            alert(`Event: }`);
        };

        // Calendar options with dynamic events
        const calendarOptions = computed(() => ({
            plugins: [dayGridPlugin, interactionPlugin],
            initialView: 'dayGridMonth',
            dateClick: handleDateClick,
            eventClick: (info) => {
                alert(`Event clicked: ${info.event.title}`);
            },
            events: formattedEvents.value, // Dynamically updated events
        }));

        // Watch for changes in employeeId and fetch events
        watch(() => props.employeeId, fetchEvents);

        // Fetch events on mount
        onMounted(() => {
            fetchEvents();
        });

        return {
            formattedEvents,
            calendarOptions,
            //   handleEventClick,
            formatDate,
        };
    },
};
</script>

<style scoped>
.employee-events {
    font-family: Arial, sans-serif;
    padding: 20px;
    background: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    max-width: 800px;
    margin: auto;
}

h2 {
    text-align: center;
    margin-bottom: 20px;
    color: #333;
}

.event-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
}

.event-card {
    background: white;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    padding: 15px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s, box-shadow 0.2s;
}

.event-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
}

.event-header {
    border-bottom: 1px solid #e0e0e0;
    padding-bottom: 10px;
    margin-bottom: 10px;
}

.event-title {
    font-size: 18px;
    color: #0073e6;
    margin: 0;
}

.event-details p {
    margin: 5px 0;
    font-size: 14px;
    color: #555;
}

.event-details strong {
    color: #333;
}

.no-events {
    text-align: center;
    font-size: 16px;
    color: #777;
    margin-top: 20px;
}
</style>

<template>
    <div class="container-fluid m-2">
        <div class="row">
            <div class="col bg-white rounded p-3">
                <FullCalendar :options="calendarOptions" />
            </div>
            <div class="col">
                <div class="employee-events">
                    <h2>Events for Employee {{ employeeId }}</h2>
                    <div v-if="formattedEvents.length > 0" class="event-container">
                        <div v-for="event in formattedEvents" :key="event.id" class="event-card">
                            <div class="event-header">
                                <h3 class="event-title">{{ event.title }}</h3>
                            </div>
                            <div class="event-details">
                                <p><strong>Start:</strong> {{ formatDate(event.start) }}</p>
                                <p><strong>End:</strong> {{ formatDate(event.end) }}</p>
                                <p><strong>Extra Info:</strong> {{ event.extendedProps || 'N/A' }}</p>
                            </div>
                        </div>
                    </div>
                    <p v-else class="no-events">No events found for this employee.</p>
                </div>
            </div>
        </div>
    </div>


</template>
