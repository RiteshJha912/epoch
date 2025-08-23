/*
 * This file contains a collection of utility functions for handling dates and habit data.
 * These functions are essential for managing the logic related to habit progress and display.
 *
 * Key functionalities:
 * - **`formatDate`:** Formats a date object into a consistent 'yyyy-MM-dd' string.
 * - **`isToday`:** Checks if a given date string corresponds to the current day.
 * - **`generateHabitDays`:** Creates an array of habit day objects based on a start date and a predefined duration (7, 14, or 21 days). Each day object includes the date, completion status (`false` by default), and day number.
 * - **`canMarkToday`:** Determines if the current day can be marked as complete for a specific habit by checking if it exists in the habit's days and has not already been marked.
 * - **`getDayStatus`:** Categorizes a habit day into one of four statuses: 'completed', 'today', 'missed', or 'future', which is likely used for styling the habit grid cells.
 *
 * Linked files:
 * - `date-fns`: Imports various functions from this library to perform reliable date manipulations.
 * - `pages/index.js`: This file imports and uses `generateHabitDays`, `formatDate`, and other functions to create and manage habit data.
 * - `components/HabitGrid.js`: This file likely uses `getDayStatus` and `canMarkToday` to render the correct visual state for each day in the habit grid.
 */


import {
  format,
  startOfDay,
  differenceInDays,
  addDays,
  isBefore,
  isAfter,
  isSameDay,
} from 'date-fns'

export const formatDate = (date) => format(date, 'yyyy-MM-dd')

export const isToday = (date) => {
  return formatDate(new Date()) === formatDate(date)
}

export const generateHabitDays = (startDate, duration) => {
  const days = []
  const start = startOfDay(new Date(startDate))
  const totalDays = duration === '1week' ? 7 : duration === '2weeks' ? 14 : 21

  for (let i = 0; i < totalDays; i++) {
    const currentDate = addDays(start, i)
    days.push({
      date: formatDate(currentDate),
      completed: false,
      day: i + 1,
    })
  }
  return days
}

export const canMarkToday = (habitDays, today = new Date()) => {
  const todayStr = formatDate(today)
  const todayHabit = habitDays.find((day) => day.date === todayStr)
  return todayHabit && !todayHabit.completed
}

export const getDayStatus = (day, today = new Date()) => {
  const dayDate = new Date(day.date + 'T00:00:00')
  const todayDate = startOfDay(today)

  if (day.completed) {
    return 'completed'
  }

  if (isSameDay(dayDate, todayDate)) {
    return 'today'
  }

  if (isBefore(dayDate, todayDate)) {
    return 'missed'
  }

  return 'future'
}
