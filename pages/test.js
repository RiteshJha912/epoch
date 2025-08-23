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

  // New test habits for different scenarios
  const [sevenDayHabit, setSevenDayHabit] = useState({
    id: 'test-7-day-habit',
    name: '7-Day Morning Exercise',
    days: Array.from({ length: 7 }, (_, i) => {
      const date = new Date()
      date.setDate(date.getDate() - (7 - i + 1)) // Ended 1 day ago
      return {
        day: i + 1,
        date: formatDate(date),
        completed: i < 6, // 6/7 completed (85% - should show share)
      }
    }),
  })

  const [fourteenDayHabit, setFourteenDayHabit] = useState({
    id: 'test-14-day-habit',
    name: '14-Day Reading Challenge',
    days: Array.from({ length: 14 }, (_, i) => {
      const date = new Date()
      date.setDate(date.getDate() - (14 - i + 2)) // Ended 2 days ago
      return {
        day: i + 1,
        date: formatDate(date),
        completed: i < 12, // 12/14 completed (85% - should show share)
      }
    }),
  })

  const [lowCompletionHabit, setLowCompletionHabit] = useState({
    id: 'test-low-completion',
    name: '21-Day Low Completion (No Share)',
    days: createHabitDates(2).map((date, i) => ({
      day: i + 1,
      date: date,
      completed: i < 15, // Only 15/21 completed (71% - should NOT show share)
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
      case 'test-7-day-habit':
        updateHabit(setSevenDayHabit)
        break
      case 'test-14-day-habit':
        updateHabit(setFourteenDayHabit)
        break
      case 'test-low-completion':
        updateHabit(setLowCompletionHabit)
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

        <div
          style={{
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
            Share Feature Test Scenarios:
          </h3>
          <ul
            style={{
              color: '#7d8590',
              fontSize: '14px',
              lineHeight: '1.6',
              paddingLeft: '20px',
            }}
          >
            <li>
              <strong>7-Day Habit:</strong> 6/7 days (85%) - Should show share
              button
            </li>
            <li>
              <strong>14-Day Habit:</strong> 12/14 days (85%) - Should show
              share button
            </li>
            <li>
              <strong>21-Day Habit:</strong> 20/21 days (95%) - Should show
              share button
            </li>
            <li>
              <strong>Low Completion:</strong> 15/21 days (71%) - Should NOT
              show share button
            </li>
          </ul>
        </div>

        {/* 7-Day Habit Test */}
        <div
          style={{
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
            Test Scenario 1: 7-Day Habit (85% completion)
          </h3>
          <p style={{ color: '#7d8590', fontSize: '14px', lineHeight: '1.6' }}>
            This habit has 6/7 days completed (85%). Since it's above 80%, it
            should show the share button.
          </p>
        </div>
        <HabitGrid
          habit={sevenDayHabit}
          onDayClick={handleDayClick}
          onDelete={handleDelete}
        />

        {/* 14-Day Habit Test */}
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
            Test Scenario 2: 14-Day Habit (85% completion)
          </h3>
          <p style={{ color: '#7d8590', fontSize: '14px', lineHeight: '1.6' }}>
            This habit has 12/14 days completed (85%). Should show share button.
          </p>
        </div>
        <HabitGrid
          habit={fourteenDayHabit}
          onDayClick={handleDayClick}
          onDelete={handleDelete}
        />

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
            Test Scenario 3: 21-Day Almost Complete (Click Last Day!)
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
            Test Scenario 4: Perfect 21-Day Completion
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

        {/* Low Completion - Should NOT show share */}
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
            Test Scenario 5: Low Completion (No Share Button)
          </h3>
          <p style={{ color: '#7d8590', fontSize: '14px', lineHeight: '1.6' }}>
            This habit has 15/21 days completed (71%). Since it's below 80%, it
            should NOT show a share button.
          </p>
        </div>
        <HabitGrid
          habit={lowCompletionHabit}
          onDayClick={handleDayClick}
          onDelete={handleDelete}
        />

        <div
          style={{
            marginTop: '48px',
            padding: '16px',
            background: '#0d1117',
            borderRadius: '8px',
            border: '1px solid #21262d',
          }}
        >
          <h3
            style={{ color: '#e6edf3', marginBottom: '12px', fontSize: '16px' }}
          >
            How to Test Share Feature:
          </h3>
          <ol
            style={{
              color: '#7d8590',
              fontSize: '14px',
              lineHeight: '1.6',
              paddingLeft: '20px',
            }}
          >
            <li>Look for habits with green "Share Achievement" buttons</li>
            <li>Click "Share Achievement" to generate the image</li>
            <li>
              Once generated, try the different share options:
              <ul style={{ marginTop: '8px', paddingLeft: '20px' }}>
                <li>
                  <strong>WhatsApp:</strong> Opens WhatsApp with text (or native
                  share on mobile)
                </li>
                <li>
                  <strong>Instagram:</strong> Downloads image for you to upload
                </li>
                <li>
                  <strong>Download:</strong> Downloads the achievement image
                </li>
              </ul>
            </li>
          </ol>
        </div>

        <div
          style={{
            marginTop: '32px',
            padding: '16px',
            background: '#0d1117',
            borderRadius: '8px',
            border: '1px solid #21262d',
          }}
        >
          <h3
            style={{ color: '#e6edf3', marginBottom: '12px', fontSize: '16px' }}
          >
            Debug Info:
          </h3>
          <pre
            style={{ color: '#7d8590', fontSize: '12px', lineHeight: '1.4' }}
          >
            {`7-Day Habit: ${
              sevenDayHabit.days.filter((d) => d.completed).length
            }/${sevenDayHabit.days.length} (${Math.round(
              (sevenDayHabit.days.filter((d) => d.completed).length /
                sevenDayHabit.days.length) *
                100
            )}%)
14-Day Habit: ${fourteenDayHabit.days.filter((d) => d.completed).length}/${
              fourteenDayHabit.days.length
            } (${Math.round(
              (fourteenDayHabit.days.filter((d) => d.completed).length /
                fourteenDayHabit.days.length) *
                100
            )}%)
21-Day Almost: ${testHabit.days.filter((d) => d.completed).length}/${
              testHabit.days.length
            } (${Math.round(
              (testHabit.days.filter((d) => d.completed).length /
                testHabit.days.length) *
                100
            )}%)
21-Day Perfect: ${completedTestHabit.days.filter((d) => d.completed).length}/${
              completedTestHabit.days.length
            } (${Math.round(
              (completedTestHabit.days.filter((d) => d.completed).length /
                completedTestHabit.days.length) *
                100
            )}%)
Low Completion: ${lowCompletionHabit.days.filter((d) => d.completed).length}/${
              lowCompletionHabit.days.length
            } (${Math.round(
              (lowCompletionHabit.days.filter((d) => d.completed).length /
                lowCompletionHabit.days.length) *
                100
            )}%)

Today: ${formatDate(new Date())}`}
          </pre>
        </div>
      </div>
    </Layout>
  )
}
