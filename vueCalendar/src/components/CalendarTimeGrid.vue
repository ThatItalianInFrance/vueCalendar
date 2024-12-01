<script>
import FullCalendar from '@fullcalendar/vue3'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { INITIAL_EVENTS, createEventId } from '../utils/event-utils'

export default {
  components: {
    FullCalendar, // make the <FullCalendar> tag available
  },
  data() {
    return {
      calendarOptions: {
        plugins: [timeGridPlugin, interactionPlugin],
        initialView: 'timeGridWeek',
        dateClick: this.handleDateClick,
        eventClick: function (info) {
          alert('Event: ' + info.event.title)
          alert('Coordinates: ' + info.jsEvent.pageX + ',' + info.jsEvent.pageY)
          alert('View: ' + info.view.type)
console.log(INITIAL_EVENTS);

          // change the border color just for fun
          info.el.style.borderColor = 'red'
        },
        events: INITIAL_EVENTS,
        //     events: [
        //       {
        //         title: 'BCH237',
        //         start: '2024-11-22T10:30:00',
        //         end: '2024-11-22T11:30:00',
        //         extendedProps: {
        //           department: 'BioChemistry',
        //         },
        //         description: 'Lecture',
        //       },
        //       { title: 'event 2', date: '2024-11-22' },
        //     ],
      },
    }
  },
  methods: {
    handleDateClick: function (arg) {
      alert('date click! ' + arg.dateStr)

      
      
    },
  },
}
</script>
<template>
  <FullCalendar :options="calendarOptions" />
</template>
