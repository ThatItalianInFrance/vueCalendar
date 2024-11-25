// Fetch events from the backend API
export async function fetchEventsFromAPI() {
  try {
    const response = await fetch('http://localhost:3000/api/events') // Adjust endpoint as needed
    if (!response.ok) {
      throw new Error('Failed to fetch events')
    }
    const events = await response.json()
    return events
  } catch (error) {
    console.error('Error fetching events:', error)
    return [] // Return an empty array in case of error
  }
}

// Fetch employees from the backend API
export async function fetchEmployeesFromAPI() {
  try {
    const response = await fetch('http://localhost:3000/api/employees') // Adjust endpoint as needed
    if (!response.ok) {
      throw new Error('Failed to fetch employees')
    }
    const employees = await response.json()
    // console.log(employees);

    return employees
  } catch (error) {
    console.error('Error fetching employees:', error)
    return [] // Return an empty array in case of error
  }
}

// Fetch holidays from the backend API
export async function fetchHolidaysFromAPI() {
  try {
    const response = await fetch('http://localhost:3000/api/holidays') // Adjust endpoint as needed
    if (!response.ok) {
      throw new Error('Failed to fetch holidays')
    }
    const holidays = await response.json()
    return holidays
  } catch (error) {
    console.error('Error fetching holidays:', error)
    return [] // Return an empty array in case of error
  }
}

// Fetch resources from the backend API
export async function fetchResourcesFromAPI() {
  try {
    const response = await fetch('http://localhost:3000/api/resources') // Adjust endpoint as needed
    if (!response.ok) {
      throw new Error('Failed to fetch resources')
    }
    const resources = await response.json()
    return resources
  } catch (error) {
    console.error('Error fetching resources:', error)
    return [] // Return an empty array in case of error
  }
}

// Fetch plannings from the backend API
export async function fetchPlanningsFromAPI() {
  try {
    const response = await fetch('http://localhost:3000/api/plannings') // Adjust endpoint as needed
    if (!response.ok) {
      throw new Error('Failed to fetch plannings')
    }
    const plannings = await response.json()
    return plannings
  } catch (error) {
    console.error('Error fetching plannings:', error)
    return [] // Return an empty array in case of error
  }
}
// Fetch recurrences from the backend API
export async function fetchRecurrencesFromAPI() {
  try {
    const response = await fetch('http://localhost:3000/api/recurrences') // Adjust endpoint as needed
    if (!response.ok) {
      throw new Error('Failed to fetch recurrences')
    }
    const recurrences = await response.json()
    return recurrences
  } catch (error) {
    console.error('Error fetching recurrences:', error)
    return [] // Return an empty array in case of error
  }
}
// Fetch exceptions from the backend API
export async function fetchExceptionsFromAPI() {
  try {
    const response = await fetch('http://localhost:3000/api/exceptions') // Adjust endpoint as needed
    if (!response.ok) {
      throw new Error('Failed to fetch exceptions')
    }
    const exceptions = await response.json()
    return exceptions
  } catch (error) {
    console.error('Error fetching exceptions:', error)
    return [] // Return an empty array in case of error
  }
}

const plannings = await fetchPlanningsFromAPI()
const employees = await fetchEmployeesFromAPI()
const recurrences = await fetchRecurrencesFromAPI()
const holidays = await fetchHolidaysFromAPI()
const exceptions = await fetchExceptionsFromAPI()
// console.log(recurrences)
console.log(holidays);

let eventGuid = 0
let todayStr = new Date().toISOString().replace(/T.*$/, '') // YYYY-MM-DD of today

const events = [
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
]
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

// const holidays = [
//   {
//     id: 'h1',
//     name: 'Thanksgiving',
//     date: '2024-11-23',
//   },
//   {
//     id: 'h2',
//     name: 'Christmas Day',
//     date: '2024-12-25',
//   },
//   {
//     id: 'h3',
//     name: 'New Year’s Day',
//     date: '2025-01-01',
//   },
// ]
async function generateEmployeeSchedules(
  employees,
  plannings,
  holidays,
  recurrences,
  startDate,
  endDate,
) {
  // let events = []
  const start = new Date(startDate).toISOString().split('T')[0]
  console.log(start);
  
  const end = new Date(endDate)
  // console.log(recurrences)
  // console.log(holidays)

  employees.forEach((employee) => {
    // Filter all plannings for this employee
    const employeePlannings = plannings.filter(
      (planning) => planning.employee_id === employee.employee_id,
    )
// console.log(employeePlannings);

    if (employeePlannings.length === 0) return // Skip if no planning found

    employeePlannings.forEach((planning) => {
      const { start_time, end_time, status, days_of_the_week } = planning
// console.log(days_of_the_week);

      let currentDate = new Date(start)
      while (currentDate <= end) {
        const dayOfWeek = currentDate.getDay()
        const currentDateStr = currentDate.toISOString().split('T')[0]
//         console.log(currentDate);
        
// // console.log(currentDateStr);
// // console.log(holidays[0].holiday_date);

// console.log(holidays.some((holiday) => holiday.holiday_date.split('T')[0] === currentDateStr));

        // Skip if holiday
        if (holidays.some((holiday) => holiday.holiday_date.split('T')[0] === currentDateStr)) {
          currentDate.setDate(currentDate.getDate() + 1)



          continue
        }

        // Check if current day is part of planning
        if (days_of_the_week.includes(dayOfWeek)) {
          const shiftStart = new Date(currentDate)
          const shiftEnd = new Date(currentDate)

          const [startHour, startMinute] = start_time.split(':').map(Number)
          const [endHour, endMinute] = end_time.split(':').map(Number)

          shiftStart.setHours(startHour, startMinute, 0)
          shiftEnd.setHours(endHour, endMinute, 0)

          events.push({
            id: `${employee.employee_id}-${currentDateStr}-${start_time}`,
            resource_id: `${employee.employee_id}`,
            title: `${employee.first_name} ${employee.last_name}`,
            start: shiftStart.toISOString(),
            end: shiftEnd.toISOString(),
            status: status,
            backgroundColor: '#007bff',
          })
        }

        // Move to the next day
        currentDate.setDate(currentDate.getDate() + 1)
      }

      // Handle recurrences (if applicable)
      recurrences.forEach((recurrence) => {
        if (recurrence.event_id) {
          let recurrenceDate = new Date(start)
          while (recurrenceDate <= new Date(recurrence.end_date)) {
            // Adjust event generation logic based on recurrence frequency and interval
            if (recurrence.frequency === 'weekly') {
              // Weekly recurrence logic
            } else if (recurrence.frequency === 'monthly') {
              // Monthly recurrence logic
            }

            // Move to next recurrence date based on interval
            recurrenceDate.setDate(recurrenceDate.getDate() + recurrence.interval)
          }
        }
      })
    })

    console.log(events)
    // return events
  })
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

// const employees = [
//   {
//     id: '1',
//     name: 'John Smith',
//     role: 'Developer',
//     schedule: {
//       defaultShift: {
//         start: '09:00',
//         end: '17:00',
//         breaks: [{ start: '12:30', end: '13:00' }],
//         daysOfWeek: [1, 2, 3, 4, 5, 6], // Monday to Friday
//       },
//       exceptions: [
//         {
//           type: 'WorkFromHome',
//           daysOfWeek: [2, 4], // Tuesday, Thursday
//         },
//       ],
//     },
//   },
//   {
//     id: '2',
//     name: 'Bob Wesson',
//     role: 'Factory Worker',
//     schedule: {
//       defaultShift: {
//         start: '05:00',
//         end: '13:00',
//         breaks: [{ start: '09:00', end: '09:20' }],
//         daysOfWeek: [1, 2, 3, 4, 5], // Monday to Friday
//       },
//       exceptions: [], // No exceptions
//     },
//   },
// ]
 generateEmployeeSchedules(
    employees,
    plannings,
    holidays,
    recurrences,
  
    '2024-01-01',
    '2024-12-31',
  )
export const INITIAL_EVENTS = [
 
  //  ...generateRecurringEvents(events),
  ...events,
  {
    id: createEventId(),
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
