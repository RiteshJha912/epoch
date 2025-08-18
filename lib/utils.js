// lib/utils.js

import { format, startOfDay, differenceInDays, addDays } from 'date-fns'

export const formatDate = (date) => format(date, 'yyyy-MM-dd')

export const isToday = (date) => {
  return formatDate(new Date()) === formatDate(date)
}

export const generateHabitDays = (startDate, duration) => {
  const days = []
  const start = startOfDay(new Date(startDate))
  const totalDays = duration === '1week' ? 7 : duration === '2weeks' ? 14 : 21

  for (let i = 0; i < totalDays; i++) {
    days.push({
      date: formatDate(addDays(start, i)),
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
