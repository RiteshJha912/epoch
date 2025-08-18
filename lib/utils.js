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
