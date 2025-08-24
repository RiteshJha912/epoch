import { useState } from 'react'
import Layout from '../components/Layout'
import HabitGrid from '../components/HabitGrid'
import { formatDate } from '../lib/utils'

export default function Test() {
  // Create dates where the habit period ended yesterday
  const createHabitDates = (daysAgo = 1) => {
    return Array.from({ length: 21 }, (_, i) => {
      const date = new Date()
      date.setDate(date.getDate() - (21 - i + daysAgo)) // Habit ended daysAgo
      return formatDate(date)
    })
  }

  const [testHabit, setTestHabit] = useState({
    id: 'test-almost-completed',
    name: 'Test Habit - Almost Complete (Click Last Day!)',
    days: createHabitDates().map((date, i) => ({
      day: i + 1,
      date: date,
      completed: i < 20, // Complete all days EXCEPT the last one
    })),
  })

  const [completedTestHabit, setCompletedTestHabit] = useState({
    id: 'test-fully-completed',
    name: 'Test Habit - Already Completed',
    days: createHabitDates(3).map((date, i) => ({
      // Ended 3 days ago
      day: i + 1,
      date: date,
      completed: true, // All days completed
    })),
  })

  const handleDayClick = (habitId, dayIndex) => {
    console.log('Day clicked:', habitId, dayIndex)

    const updateHabit = (setHabit) => {
      setHabit((prevHabit) => {
        const updatedDays = [...prevHabit.days]
        updatedDays[dayIndex].completed = true
        console.log('Updated habit:', {
          ...prevHabit,
          days: updatedDays,
        })
        return {
          ...prevHabit,
          days: updatedDays,
        }
      })
    }

    switch (habitId) {
      case 'test-almost-completed':
        updateHabit(setTestHabit)
        break
      default:
        break
    }
  }

  const handleDelete = (habitId) => {
    console.log('Delete clicked for habit:', habitId)
    // Just log for testing, don't actually delete
  }

  return (
    <Layout>
      <div className='glass' style={{ padding: '32px' }}>
        <h2 style={{ color: '#e6edf3', marginBottom: '24px' }}>
          Testing Share Feature & Completion States
        </h2>

        {/* 21-Day Almost Complete */}
        <div
          style={{
            marginTop: '48px',
            marginBottom: '32px',
            padding: '16px',
            background: '#0d1117',
            borderRadius: '8px',
            border: '1px solid #21262d',
          }}
        >
          <h3
            style={{ color: '#e6edf3', marginBottom: '12px', fontSize: '16px' }}
          >
            Test Scenario 1: 21-Day Almost Complete (Click Last Day!)
          </h3>
          <p style={{ color: '#7d8590', fontSize: '14px', lineHeight: '1.6' }}>
            This habit has 20/21 days completed (95%). Click the last day to
            complete it and see the celebration + share!
          </p>
        </div>
        <HabitGrid
          habit={testHabit}
          onDayClick={handleDayClick}
          onDelete={handleDelete}
        />

        {/* Perfect 21-Day Completed */}
        <div
          style={{
            marginTop: '48px',
            marginBottom: '32px',
            padding: '16px',
            background: '#0d1117',
            borderRadius: '8px',
            border: '1px solid #21262d',
          }}
        >
          <h3
            style={{ color: '#e6edf3', marginBottom: '12px', fontSize: '16px' }}
          >
            Test Scenario 2: Perfect 21-Day Completion
          </h3>
          <p style={{ color: '#7d8590', fontSize: '14px', lineHeight: '1.6' }}>
            This habit is fully completed (100%) and shows the celebration
            message + share button immediately.
          </p>
        </div>
        <HabitGrid
          habit={completedTestHabit}
          onDayClick={handleDayClick}
          onDelete={handleDelete}
        />
      </div>
    </Layout>
  )
}
