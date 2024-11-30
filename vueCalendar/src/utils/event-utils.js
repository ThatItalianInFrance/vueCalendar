import dayjs from 'dayjs'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import customParseFormat from 'dayjs/plugin/customParseFormat'
// Add plugins
dayjs.extend(isSameOrBefore)
dayjs.extend(customParseFormat)

// Fetch events from the backend API

export async function fetchEventsFromAPI() {
  try {
    const response = await fetch('http://localhost:3000/api/events') // Adjust endpoint as needed
    if (!response.ok) {
      throw new Error('Failed to fetch events')
    }
    events = await response.json()
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
console.log(holidays)

let eventGuid = 0
let todayStr = new Date().toISOString().replace(/T.*$/, '') // YYYY-MM-DD of today

let events = []

// Add plugins
dayjs.extend(isSameOrBefore)
dayjs.extend(customParseFormat)
export async function generateEmployeeSchedules(
  employees,
  plannings,
  holidays,
  startDate,
  endDate,
  selectedWeeks = [], // Array of selected week numbers (e.g., [1, 2, 3])
  selectedMonths = [], // Array of selected month numbers (e.g., [1, 2, 3] for January, February, March)
) {
  // let events = []
  const start = new Date(startDate).toISOString().split('T')[0]
  console.log(start)

  const end = new Date(endDate)
  // console.log(recurrences)
  // console.log(holidays)
  // Check if current day is part of planning

  employees.forEach((employee) => {
    // Filter all plannings for this employee
    const employeePlannings = plannings.filter(
      (planning) => planning.employee_id === employee.employee_id,
    )
    // console.log(employeePlannings);

    if (employeePlannings.length === 0) return // Skip if no planning found

    employeePlannings.forEach((planning) => {
      const {
        start_time,
        end_time,
        status,
        days_of_the_week,
        months_of_the_year,
        weeks_of_the_month,
      } = planning
      // console.log(days_of_the_week);
      console.log(planning)

      const weekNumber = (date) => {
        const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1)
        const diff = date - startOfMonth
        const oneDay = 1000 * 60 * 60 * 24
        const daysInMonth = Math.ceil(diff / oneDay)
        return Math.ceil(daysInMonth / 7) // Week number
      }
      let currentDate = new Date(start)
      while (currentDate <= end) {
        const monthNumber = new Date(currentDate).getMonth() + 1 // Get the month number (1-12)
        const dayOfWeek = currentDate.getDay()
        const currentDateStr = currentDate.toISOString().split('T')[0]
        // Skip if holiday
        if (holidays.some((holiday) => dayjs(holiday.holiday_date).isSame(currentDate, 'day'))) {
          currentDate.setDate(currentDate.getDate() + 1)
          continue
        }

        // Check if current day is part of planning
        if (days_of_the_week.includes(dayOfWeek)) {
          const shiftStart = new Date(currentDate)
          const shiftEnd = new Date(currentDate)
          if (
            (selectedWeeks.length > 0 && !selectedWeeks.includes(weekNumber(currentDate))) ||
            (selectedMonths.length > 0 && !selectedMonths.includes(monthNumber))
          ) {
            // console.log('includes')

            // console.log(new Date(currentDate).getMonth() + 1)
            // console.log(selectedMonths)
            // console.log(monthNumber)

            currentDate.setDate(currentDate.getDate() + 1)
            continue
          }

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
    })
    // console.log(events)
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

generateEmployeeSchedules(
  employees,
  plannings,
  holidays,
  // recurrences,

  '2024-01-01',
  '2024-12-31',
  [1, 3],
  [1, 2],
)
// const eventsfromDB = await fetchEventsFromAPI()
// console.log(eventsfromDB);

export const INITIAL_EVENTS = [
  // ...eventsfromDB,
  //  ...generateRecurringEvents(events),
  ...events,
]

export function createEventId() {
  return String(eventGuid++)
}
