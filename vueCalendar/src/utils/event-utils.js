let eventGuid = 0
let todayStr = new Date().toISOString().replace(/T.*$/, '') // YYYY-MM-DD of today

const events = 
  [
    {
      id: '1',
      resourceId: '1', // Jean Dupont
      title: 'Réunion Mensuelle',
      start: '2024-11-20T10:00:00',
      end: '2024-11-20T12:00:00',
      recurrence: {
        frequency: 'monthly',
        interval: 1, // Once per month
        daysOfMonth: [20], // 20th of each month
        endDate: '2025-01-01',
      },
      backgroundColor: '#2196F3',
    },
    {
      id: '2',
      resourceId: '2', // Marie Curie
      title: 'Travail du Matin',
      start: '2024-11-21T08:30:00',
      end: '2024-11-21T12:00:00',
      recurrence: {
        frequency: 'monthly',
        interval: 1, // Once per month
        daysOfMonth: [21], // 21st of each month
        endDate: '2025-01-01',
      },
      backgroundColor: '#FFC107',
    },
    {
      id: '3',
      resourceId: '3', // Émile Zola
      title: 'Travail d’Après-midi',
      start: '2024-11-22T13:00:00',
      end: '2024-11-22T17:00:00',
      recurrence: {
        frequency: 'monthly',
        interval: 1, // Once per month
        daysOfMonth: [22], // 22nd of each month
        endDate: '2025-01-01',
      },
      backgroundColor: '#FF5733',
    },
    {
      id: '4',
      resourceId: '4', // Claire Fontaine
      title: 'Planification Mensuelle',
      start: '2024-11-23T14:00:00',
      end: '2024-11-23T16:00:00',
      recurrence: {
        frequency: 'monthly',
        interval: 1, // Once per month
        daysOfMonth: [23], // 23rd of each month
        endDate: '2025-01-01',
      },
      backgroundColor: '#4CAF50',
    },
  ];
  const swipeEvents = [
    {
      id: '3',
      resourceId: '1',
      title: 'Swipe In',
      start: '2024-11-20T08:05:00',
      end: '2024-11-20T08:10:00',
      backgroundColor: '#007bff',
    },
    {
      id: '4',
      resourceId: '2',
      title: 'Swipe Out',
      start: '2024-11-20T17:00:00',
      end: '2024-11-20T17:05:00',
      backgroundColor: '#dc3545',
    },
  ]

const holidays = [
  {
    id: 'h1',
    name: 'Thanksgiving',
    date: '2024-11-23',
  },
  {
    id: 'h2',
    name: 'Christmas Day',
    date: '2024-12-25',
  },
  {
    id: 'h3',
    name: 'New Year’s Day',
    date: '2025-01-01',
  },
]

function generateEmployeeSchedules(employees, startDate, endDate) {
  const events = []
  const start = new Date(startDate)
  const end = new Date(endDate)

  employees.forEach((employee) => {
    const { schedule, name } = employee
    const { defaultShift, exceptions } = schedule

    // Iterate through the date range
    let currentDate = new Date(start)
    while (currentDate <= end) {
      const dayOfWeek = currentDate.getDay()

      // Check if the current date is a holiday
      const currentDateStr = currentDate.toISOString().split('T')[0] // Extract YYYY-MM-DD
      const isHoliday = holidays.some((holiday) => holiday.date === currentDateStr)

      // Skip the day if it's a holiday
      if (isHoliday) {
        currentDate.setDate(currentDate.getDate() + 1)
        continue
      }
      // Check if the current day is a workday
      if (defaultShift.daysOfWeek.includes(dayOfWeek)) {
        const shiftStart = new Date(currentDate)
        const shiftEnd = new Date(currentDate)

        // Set the start and end times for the shift
        const [startHour, startMinute] = defaultShift.start.split(':').map(Number)
        const [endHour, endMinute] = defaultShift.end.split(':').map(Number)

        shiftStart.setHours(startHour, startMinute, 0)
        shiftEnd.setHours(endHour, endMinute, 0)

        // Check for exceptions (e.g., WorkFromHome)
        const exception = exceptions.find((exc) => exc.daysOfWeek.includes(dayOfWeek))
        const isWorkFromHome = exception && exception.type === 'WorkFromHome'

        // Add the shift event
        events.push({
          id: `${employee.id}-${currentDate.toISOString()}`,
          resourceId: `${employee.id}`,
          title: `${name} - ${isWorkFromHome ? 'Work from Home' : 'Onsite Work'}`,
          start: shiftStart.toISOString(),
          end: shiftEnd.toISOString(),
          description: isWorkFromHome ? 'Works from home on this day.' : 'Regular shift.',
          breaks: defaultShift.breaks,
          color: isWorkFromHome ? '#007bff' : '#28a745',
        })
      }

      // Move to the next day
      currentDate.setDate(currentDate.getDate() + 1)
    }
  })

  return events
}

function generateRecurringEvents(events) {
  const recurringEvents = []

  events.forEach((event) => {
    if (event.recurrence) {
      const { frequency, interval, daysOfWeek, endDate } = event.recurrence
      const current = new Date(event.start)
      const recurrenceEndDate = new Date(endDate)

      while (current <= recurrenceEndDate) {
        const dayOfWeek = current.getDay()

        // Check if the current day matches the recurrence pattern
        if (!daysOfWeek || daysOfWeek.includes(dayOfWeek)) {
          recurringEvents.push({
            id: `${event.id}-${current.toISOString()}`, // Unique ID for instance
            title: event.title,
            start: new Date(current).toISOString(),
            end: new Date(
              current.getTime() + (new Date(event.end) - new Date(event.start)),
            ).toISOString(),
            type: 'Recurring',
          })
        }

        // Increment date based on frequency and interval
        if (frequency === 'daily') {
          current.setDate(current.getDate() + interval)
        } else if (frequency === 'weekly' || frequency === 'bi-weekly') {
          current.setDate(current.getDate() + 7 * interval)
        } else if (frequency === 'monthly') {
          current.setMonth(current.getMonth() + interval)
        }
      }
    } else {
      // Non-recurring event, push as is
      recurringEvents.push(event)
    }
  })

  return recurringEvents
}

const employees = [
  {
    id: '1',
    name: 'John Smith',
    role: 'Developer',
    schedule: {
      defaultShift: {
        start: '09:00',
        end: '17:00',
        breaks: [{ start: '12:30', end: '13:00' }],
        daysOfWeek: [1, 2, 3, 4, 5, 6], // Monday to Friday
      },
      exceptions: [
        {
          type: 'WorkFromHome',
          daysOfWeek: [2, 4], // Tuesday, Thursday
        },
      ],
    },
  },
  {
    id: '2',
    name: 'Bob Wesson',
    role: 'Factory Worker',
    schedule: {
      defaultShift: {
        start: '05:00',
        end: '13:00',
        breaks: [{ start: '09:00', end: '09:20' }],
        daysOfWeek: [1, 2, 3, 4, 5], // Monday to Friday
      },
      exceptions: [], // No exceptions
    },
  },
]

export const INITIAL_EVENTS = [
  ...generateEmployeeSchedules(employees, '2024-11-01', '2024-11-31'),
   ...generateRecurringEvents(events),
  ...events,
  {
    // id: createEventId(),
    title: 'All-day event',
    start: todayStr,
  },
  {
    // id: createEventId(),
    title: 'Timed event',
    start: todayStr + 'T12:00:00',
  },
  {
    // id: createEventId(),
    title: 'Team Meeting',
    start: '2024-11-20T10:00:00',
    end: '2024-11-20T11:00:00',
    // type: 'Meeting', // Type of event
    // participants: ['John Doe', 'Jane Smith'], // Employees involved
    // location: 'Conference Room A',
    // description: 'Weekly team alignment meeting.',
    // color: '#007bff' // Custom color for this type
  },
  {
    // id: createEventId(),
    title: 'Developer Shift',
    start: '2024-11-21T09:00:00',
    end: '2024-11-21T17:00:00',
    // type: 'Shift',
    // participants: ['Alice Johnson'],
    // location: 'Office Floor 2',
    // description: 'Regular work shift.',
    color: '#28a745',
  },
  {
    // id: createEventId(),
    title: 'Holiday - Thanksgiving',
    start: '2024-11-23',
    end: '2024-11-23',
    type: 'Holiday',
    allDay: true,
    color: '#ffc107',
    description: 'Company-wide holiday for Thanksgiving.',
  },
  {
    title: 'Bi-weekly Staff Training',
    start: '2024-11-25T15:00:00',
    end: '2024-11-25T17:00:00',
    // type: 'Recurring',
    // recurrence: {
    //   frequency: 'bi-weekly', // Recurrence pattern
    //   endDate: '2025-02-01' // Optional end date for the recurrence
    // },
    // participants: ['All Staff'],
    // location: 'Training Room B',
    // description: 'Bi-weekly training on company tools and best practices.',
    // color: '#6c757d'
  },
]

export function createEventId() {
  return String(eventGuid++)
}
