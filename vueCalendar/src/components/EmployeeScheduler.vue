// EmployeeScheduler.vue
<template>
  <div class="scheduler-container min-h-screen">
    <div v-if="!isCalendarReady" class="flex items-center justify-center h-full">
      Loading calendar...
    </div>
    <FullCalendar v-else ref="fullCalendarRef" :options="calendarOptions" class="w-full h-full" />
  </div>
</template>

<script>
import { ref, computed, onMounted, defineComponent } from 'vue'
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import resourceTimelinePlugin from '@fullcalendar/resource-timeline'

export default defineComponent({
  name: 'EmployeeScheduler',
  components: {
    FullCalendar,
  },
  props: {
    initialEmployees: {
      type: Array,
      default: () => [],
    },
    initialHolidays: {
      type: Array,
      default: () => [],
    },
    initialRecurringEvents: {
      type: Array,
      default: () => [],
    },
  },
  setup(props, { emit }) {
    const fullCalendarRef = ref(null)
    const isCalendarReady = ref(false)
    const employees = ref(props.initialEmployees)
    const holidays = ref(props.initialHolidays)
    const recurringEvents = ref(props.initialRecurringEvents)
    const eventGuid = ref(0)

    const createEventId = () => String(eventGuid.value++)

    const resources = computed(() => {
      return employees.value.map((employee) => ({
        id: employee.id || createEventId(),
        title: employee.name || 'Unnamed Employee',
        role: employee.role || 'No Role Assigned',
      }))
    })

    const calendarOptions = computed(() => ({
      plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin, resourceTimelinePlugin],
      initialView: 'resourceTimelineDay',
      schedulerLicenseKey: 'CC-Attribution-NonCommercial-NoDerivatives',
      resources: resources.value,
      editable: true,
      selectable: true,
      selectMirror: true,
      dayMaxEvents: true,
      weekends: true,
      height: 'auto',
      slotMinTime: '04:00:00',
      slotMaxTime: '23:00:00',
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'resourceTimelineDay,resourceTimelineWeek',
      },
      events: getEvents,
      eventContent: renderEventContent,
      datesSet: (dateInfo) => emit('dates-set', dateInfo),
      eventClick: (info) => emit('event-click', info),
      select: (info) => emit('select', info),
      eventChange: (info) => emit('event-change', info),
    }))

    function renderEventContent(eventInfo) {
      return {
        html: `
          <div class="fc-event-main-frame">
            <div class="fc-event-title-container">
              <div class="fc-event-title fc-sticky">${eventInfo.event.title}</div>
            </div>
          </div>
        `,
      }
    }

    const getEvents = async (fetchInfo, successCallback, failureCallback) => {
      try {
        const start = fetchInfo.start
        const end = fetchInfo.end

        const events = [
          ...generateBasicEvents(start, end),
          ...generateHolidayEvents(start, end),
          ...generateRecurringEvents(start, end),
        ]

        successCallback(events)
      } catch (error) {
        console.error('Error fetching events:', error)
        failureCallback(error)
      }
    }

    const generateBasicEvents = (start, end) => {
      const events = []
      employees.value.forEach((employee) => {
        if (!employee.schedule) return

        const { schedule } = employee
        const currentDate = new Date(start)
        const endDate = new Date(end)

        while (currentDate <= endDate) {
          const dayOfWeek = currentDate.getDay()

          if (schedule.defaultShift?.daysOfWeek?.includes(dayOfWeek)) {
            const shiftStart = new Date(currentDate)
            const shiftEnd = new Date(currentDate)

            const [startHour, startMinute] = (schedule.defaultShift.start || '09:00').split(':')
            const [endHour, endMinute] = (schedule.defaultShift.end || '17:00').split(':')

            shiftStart.setHours(parseInt(startHour), parseInt(startMinute))
            shiftEnd.setHours(parseInt(endHour), parseInt(endMinute))

            // Add the main shift event
            events.push({
              id: createEventId(),
              resourceId: employee.id,
              title: `${employee.name} - Regular Shift`,
              start: shiftStart.toISOString(),
              end: shiftEnd.toISOString(),
              backgroundColor: '#28a745',
            })

            // Add break events if they exist
            if (schedule.defaultShift.breaks) {
              schedule.defaultShift.breaks.forEach((breakTime) => {
                const breakStart = new Date(currentDate)
                const breakEnd = new Date(currentDate)

                const [breakStartHour, breakStartMin] = breakTime.start.split(':')
                const [breakEndHour, breakEndMin] = breakTime.end.split(':')

                breakStart.setHours(parseInt(breakStartHour), parseInt(breakStartMin))
                breakEnd.setHours(parseInt(breakEndHour), parseInt(breakEndMin))

                events.push({
                  id: createEventId(),
                  resourceId: employee.id,
                  title: 'Break',
                  start: breakStart.toISOString(),
                  end: breakEnd.toISOString(),
                  backgroundColor: '#6c757d',
                })
              })
            }
          }

          currentDate.setDate(currentDate.getDate() + 1)
        }
      })

      return events
    }

    const generateHolidayEvents = (start, end) => {
      return holidays.value
        .filter((holiday) => {
          const holidayDate = new Date(holiday.date)
          return holidayDate >= start && holidayDate <= end
        })
        .map((holiday) => ({
          id: createEventId(),
          title: `Holiday - ${holiday.name}`,
          start: holiday.date,
          allDay: true,
          backgroundColor: '#dc3545',
          display: 'background',
        }))
    }

    const generateRecurringEvents = (start, end) => {
      return recurringEvents.value.map((event) => ({
        ...event,
        id: createEventId(),
      }))
    }

    onMounted(() => {
      setTimeout(() => {
        isCalendarReady.value = true
      }, 100)
    })

    return {
      fullCalendarRef,
      isCalendarReady,
      calendarOptions,
    }
  },
})
</script>

<style scoped>
.scheduler-container {
  height: 100%;
  min-height: 500px;
}

:deep(.fc) {
  height: 100%;
}

:deep(.fc-event-title) {
  font-size: 0.85em;
  padding: 1px 2px;
}

:deep(.fc-timeline-slot) {
  height: 5em;
}

:deep(.fc-resource-timeline-divider) {
  width: 140px !important;
}
</style>
