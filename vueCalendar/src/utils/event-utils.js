import dayjs from 'dayjs'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
// import customParseFormat from 'dayjs/plugin/customParseFormat'
// Add plugins
// dayjs.extend(isSameOrBefore)
// dayjs.extend(customParseFormat)
// const isSameOrAfter = require('dayjs/plugin/isSameOrAfter');
// const isSameOrBefore = require('dayjs/plugin/isSameOrBefore');
// dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore)
import 'dayjs/locale/fr'
dayjs.locale('fr')
import apiClient from 'axios'
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

// Fetch a single employee by ID
export async function fetchEmployeeById(id) {
  try {
    const response = await fetch(`http://localhost:3000/api/employees/${id}`)
    if (!response.ok) {
      throw new Error('Failed to fetch employee')
    }
    const employee = await response.json()
    return employee
  } catch (error) {
    console.error(`Error fetching employee with ID ${id}:`, error)
    return null // Return null in case of error
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
// const recurrences = await fetchRecurrencesFromAPI()
const holidays = await fetchHolidaysFromAPI()
// const exceptions = await fetchExceptionsFromAPI()
// console.log(recurrences)
console.log(holidays)

let eventGuid = 0
let todayStr = new Date().toISOString().replace(/T.*$/, '') // YYYY-MM-DD of today

let events = []

// Add plugins

// generateEmployeePlanning(1, "2024-01-01", "2024-12-31")
export async function generateEmployeePlanning(id, start_date, end_date) {
  const start = new Date(start_date)
  const end = new Date(end_date)
  const employee = await apiClient.get(`http://localhost:3000/api/employees/${id}`)
  console.log(employee.data)
  let currentDate = new Date(start_date)
  console.log(currentDate)
  console.log(end)
  while (currentDate <= end) {
    console.log('this')
    currentDate.setDate(currentDate.getDate() + 1)
  }
}

// await generateEmployeeGroupPlanning(1,"2024-01-01", "2024-12-31")
// await generateEmployeeGroupPlanning(2,"2024-01-01", "2024-12-31")
export async function generateEmployeeGroupPlanning(id, startDate, endDate) {
  const planningDataArray = await apiClient.get(`http://localhost:3000/api/plannings/group/${id}`)
  console.log(planningDataArray.data)

  const start = new Date(startDate)
  const end = new Date(endDate)

  planningDataArray.data.forEach((planning) => {
    console.log(planning.start_time)

    // Parse recurrence rules
    const daysOfWeek = JSON.parse(planning.days_of_the_week) // e.g., [1, 2, 3, 4, 5]
    const weeksOfMonth = JSON.parse(planning.weeks_of_the_month) // e.g., [1, 3, 5]
    const monthsOfYear = JSON.parse(planning.months_of_the_year) // e.g., [0, 1, 2...]

    let currentDate = new Date(start)

    while (currentDate <= end) {
      const dayOfWeek = currentDate.getDay() // Sunday - 0, Monday - 1, ...
      const monthOfYear = currentDate.getMonth() // Jan - 0, Feb - 1, ...
      const weekOfMonth = Math.ceil(currentDate.getDate() / 7) // 1st week - 1, 2nd week - 2, ...

      // Check if current day meets all conditions
      if (
        daysOfWeek.includes(dayOfWeek) &&
        weeksOfMonth.includes(weekOfMonth) &&
        monthsOfYear.includes(monthOfYear)
      ) {
        const shiftStart = new Date(currentDate)
        const shiftEnd = new Date(currentDate)

        const [startHour, startMinute] = planning.start_time.split(':').map(Number)
        const [endHour, endMinute] = planning.end_time.split(':').map(Number)

        shiftStart.setHours(startHour, startMinute, 0)
        shiftEnd.setHours(endHour, endMinute, 0)
        // Create the event object
        events.push({
          id: `${id}`,
          resource_id: `${id}`,
          title: `title`,
          start: shiftStart.toISOString(),
          end: shiftEnd.toISOString(),
          status: 'status',
          backgroundColor: '#007bff',
        })
      }
      // Move to the next day
      currentDate.setDate(currentDate.getDate() + 1)
    }
  })
  console.log(events)

  return events
}
// Example usage:
// const planningData = [ /* your provided data */ ];
// const events = generateEmployeeSchedules(planningData, "2024-01-01", "2024-12-31");
// console.log(events);

export async function generateSingleEmployeeSchedule(
  employeeId,
  plannings,
  holidays,
  startDate,
  endDate,
) {
  const start = new Date(startDate).toISOString().split('T')[0]
  const end = new Date(endDate)
  // const events = [];

  // Find the specified employee
  // const employee = employees.find((emp) => emp.employee_id === employeeId);
  const employee = await fetchEmployeeById(employeeId)
  if (!employee) return [] // Return empty array if employee not found
  console.log(employee)

  // Filter plannings for this employee
  const employeePlannings = plannings.filter((planning) => planning.employee_id === employeeId)
  if (employeePlannings.length === 0) return [] // Skip if no planning found

  // Helper function to get the week number within a month
  const weekNumber = (date) => {
    const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1)
    const diff = date - startOfMonth
    const oneDay = 1000 * 60 * 60 * 24
    return Math.ceil((diff + 1) / oneDay / 7)
  }

  employeePlannings.forEach((planning) => {
    const {
      start_time,
      end_time,
      status,
      days_of_the_week,
      months_of_the_year, // e.g., [1, 4, 7] for Jan, Apr, Jul
      weeks_of_the_month, // e.g., [1, 3] for 1st and 3rd week of the month
      years, // Optional: Specific years for recurrence
    } = planning

    let currentDate = new Date(start)
    while (currentDate <= end) {
      const monthNumber = currentDate.getMonth() + 1
      const dayOfWeek = currentDate.getDay()
      const currentDateStr = currentDate.toISOString().split('T')[0]

      // Skip if it's a holiday
      if (
        holidays.some(
          (holiday) => new Date(holiday.holiday_date).toDateString() === currentDate.toDateString(),
        )
      ) {
        currentDate.setDate(currentDate.getDate() + 1)
        continue
      }

      // Check if current day is part of planning
      if (days_of_the_week.includes(dayOfWeek)) {
        // Skip if not in selected weeks or months
        if (
          (weeks_of_the_month.length > 0 &&
            !weeks_of_the_month.includes(weekNumber(currentDate))) ||
          (months_of_the_year.length > 0 && !months_of_the_year.includes(monthNumber))
        ) {
          currentDate.setDate(currentDate.getDate() + 1)
          continue
        }

        // Calculate shift times
        const shiftStart = new Date(currentDate)
        const shiftEnd = new Date(currentDate)
        const [startHour, startMinute] = start_time.split(':').map(Number)
        const [endHour, endMinute] = end_time.split(':').map(Number)

        shiftStart.setHours(startHour, startMinute, 0)
        shiftEnd.setHours(endHour, endMinute, 0)

        // Add the event to the list
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
  console.log(events)

  // return events;
}

// await generateSingleEmployeeScheduleWithRecurrences(1, plannings,holidays,"2024-01-01", "2024-02-28")
export async function generateSingleEmployeeScheduleWithRecurrences(
  employeeId,
  plannings,
  holidays,
  startDate,
  endDate,
) {
  const start = new Date(startDate)
  const end = new Date(endDate)
  const events = []

  const employee = await fetchEmployeeById(employeeId)
  console.log(employee)

  if (!employee) return [] // Skip if employee not found

  const employeePlannings = plannings.filter((planning) => planning.employee_id === employeeId)
  if (employeePlannings.length === 0) return [] // Skip if no planning found

  employeePlannings.forEach((planning) => {
    const {
      start_time,
      end_time,
      status,
      days_of_the_week, // e.g., [1, 3, 5] for Mon, Wed, Fri
      months_of_the_year, // e.g., [1, 4, 7] for Jan, Apr, Jul
      weeks_of_the_month, // e.g., [1, 3] for 1st and 3rd week of the month
      years, // Optional: Specific years for recurrence
    } = planning

    let currentDate = new Date(start)

    while (currentDate <= end) {
      const monthNumber = currentDate.getMonth() + 1
      const yearNumber = currentDate.getFullYear()
      const dayOfWeek = currentDate.getDay()
      const currentDateStr = currentDate.toISOString().split('T')[0]

      // Skip if not in recurrence months
      if (
        months_of_the_year &&
        months_of_the_year.length > 0 &&
        !months_of_the_year.includes(monthNumber)
      ) {
        currentDate.setDate(currentDate.getDate() + 1)
        continue
      }

      // Skip if not in recurrence weeks (within the month)
      const weekNumber = Math.ceil(currentDate.getDate() / 7)
      if (
        weeks_of_the_month &&
        weeks_of_the_month.length > 0 &&
        !weeks_of_the_month.includes(weekNumber)
      ) {
        currentDate.setDate(currentDate.getDate() + 1)
        continue
      }

      // Skip if specific year filtering is applied
      if (years && years.length > 0 && !years.includes(yearNumber)) {
        currentDate.setDate(currentDate.getDate() + 1)
        continue
      }

      // Skip if holiday
      if (holidays.some((holiday) => holiday.holiday_date === currentDateStr)) {
        currentDate.setDate(currentDate.getDate() + 1)
        continue
      }

      // Check if day of the week matches
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
  })
  console.log(events)

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

export async function generateEmployeeSchedules(
  employees,
  plannings,
  holidays,
  startDate,
  endDate,
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
            (weeks_of_the_month.length > 0 &&
              !weeks_of_the_month.includes(weekNumber(currentDate))) ||
            (months_of_the_year.length > 0 && !months_of_the_year.includes(monthNumber))
          ) {
            console.log(weeks_of_the_month)

            console.log(weekNumber(currentDate))

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
    console.log(events)
    // return events
  })
}
// generateScheduleEvents(employees, holidays, '2024-01-01', '2024-12-31')

function generateScheduleEvents(employees, holidays, startDate, endDate) {
  const holidayDates = holidays.map((h) => h.holiday_date) // Extract holiday dates
  // const events = [];

  let currentDate = new Date(startDate)
  const end = new Date(endDate)

  // Loop through the date range
  while (dayjs(currentDate).isSameOrBefore(dayjs(end))) {
    const dayOfWeek = dayjs(currentDate).locale('fr').format('ddd').toLowerCase().slice(0, 3) // 'mon', 'tue', etc.

    employees.forEach((employee) => {
      const startKey = `${dayOfWeek}Start`
      const endKey = `${dayOfWeek}End`

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
        })
      }
    })

    // Move to the next day (correctly update the currentDate)
    currentDate = dayjs(currentDate).add(1, 'day')
  }
  console.log(events)
  // for (event in events) {
  //   console.log(event);

  // }
  return events
}

// generateEmployeeEvents(5, holidays, '2024-01-01', '2024-12-31')
// generateEmployeeEvents(1, holidays, '2024-01-01', '2024-12-31')
// generateEmployeeEvents(11, holidays, '2024-01-01', '2024-12-31')
export default async function generateEmployeeEvents(employeeId,  startDate, endDate) {
  const events = []
  const holidayDates = holidays.map((h) => h.holiday_date) // Extract holiday dates

  let currentDate = new Date(startDate)
  const end = new Date(endDate)

  const employee = await fetchEmployeeById(employeeId)
  // Loop through the date range
  while (dayjs(currentDate).isSameOrBefore(dayjs(end))) {
    const dayOfWeek = dayjs(currentDate).locale('fr').format('ddd').toLowerCase().slice(0, 3) // 'mon', 'tue', etc.

    const startKey = `${dayOfWeek}Start`
    const endKey = `${dayOfWeek}End`

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
      })
    }

    // Move to the next day (correctly update the currentDate)
    currentDate = dayjs(currentDate).add(1, 'day')
  }
  // console.log(events);
  console.log('Payload size:', JSON.stringify(events).length / 1024, 'KB');
  try {
    const postResponse = await apiClient.post('http://localhost:3000/api/bulkevents', events)
    console.log('Events successfully posted:', postResponse.data)
  } catch (error) {
    console.error('Error posting events:', error)
  }

  console.log(events)
  return events
}

// generateEmployeeSchedules(
//   employees,
//   plannings,
//   holidays,
//   // recurrences,

//   '2024-01-01',
//   '2024-12-31',
//   [1, 3],
//   [1, 2],
// )

// await generateSingleEmployeeSchedule(
//   1,
//   plannings,
//   holidays,
//   // recurrences,

//   '2024-01-01',
//   '2024-12-31',
//   [1, 3],
//   [1, 2],
// )
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
