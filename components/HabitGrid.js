/*
 * This file is a React component that renders a visual grid for a single habit.
 * It displays the progress of a habit in a format similar to a GitHub contributions graph.
 *
 * Key functionalities:
 * - **Props:** It receives a `habit` object, and two callback functions, `onDayClick` and `onDelete`, from the parent component (`pages/index.js`).
 * - **Dynamic Styling:** Determines the CSS grid layout (`grid-7`, `grid-14`, or `grid-21`) based on the habit's duration.
 * - **Progress and Statistics:** Calculates and displays the completion percentage and the number of days completed out of the total duration.
 * - **Habit Day Rendering:** Maps through the `habit.days` array to render a square for each day. Each square's appearance (color, content) is determined by its status (`completed`, `today`, `missed`, `future`), which is calculated using the `getDayStatus` utility function.
 * - **Click Handler:** The `onClick` handler on each day square calls the `onDayClick` function (passed from the parent) only if the day is "today" and has not yet been marked as complete.
 * - **Celebration Messages:** The `getCelebrationMessage` function provides dynamic feedback and celebratory messages when a habit is finished, especially for a perfect completion.
 * - **Delete Functionality:** The delete button triggers the `onDelete` function (passed from the parent) to remove the habit.
 * - **Share Functionality:** Displays a share button when habits meet achievement criteria (7, 14, or 21 days with >80% completion).
 *
 * Linked files:
 * - `../lib/utils.js`: Imports utility functions like `isToday`, `canMarkToday`, `formatDate`, and `getDayStatus` to handle date logic and determine the status and appearance of each day.
 * - `pages/index.js`: This is the parent component that renders multiple `HabitGrid` components and passes down the necessary habit data and callback functions.
 * - `ShareButton.js`: Component for generating and sharing achievement images.
 */
import { isToday, canMarkToday, formatDate, getDayStatus } from '../lib/utils'
import ShareButton from './ShareButton'
import styles from '../styles/components/HabitGrid.module.css'

const getCelebrationMessage = (completedDays, totalDays) => {
  const completionPercentage = Math.round((completedDays / totalDays) * 100)
  if (completedDays === totalDays) {
    return {
      title: 'Incredible work! 🎉',
      message:
        "You've successfully completed this habit with a perfect streak! This is a testament to your amazing discipline.",
      emoji: '🔥',
      isPerfect: true,
    }
  } else if (completedDays > 0) {
    return {
      title: 'Keep up the great work! ',
      message: `You completed ${completedDays} out of ${totalDays} days. That's ${completionPercentage}%! Every completed day is a step toward your goal.`,
      emoji: '🙌',
      isPerfect: false,
    }
  }
  return null
}

export default function HabitGrid({ habit, onDayClick, onDelete }) {
  const totalDays = habit.days.length
  const completedDays = habit.days.filter((day) => day.completed).length
  const habitFinished = habit.days[totalDays - 1].date < formatDate(new Date())

  const gridClass =
    totalDays <= 7
      ? styles.grid7
      : totalDays <= 14
      ? styles.grid14
      : styles.grid21

  const celebrationMessage = habitFinished
    ? getCelebrationMessage(completedDays, totalDays)
    : null

  return (
    <div className={`${styles.habitCard} glass`}>
      <div className={styles.habitHeader}>
        <h3 className={styles.habitTitle}>{habit.name}</h3>
        <button className={styles.btnDelete} onClick={() => onDelete(habit.id)}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='16'
            height='16'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
            className='lucide lucide-trash'
          >
            <path d='M3 6h18'></path>
            <path d='M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6'></path>
            <path d='M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2'></path>
          </svg>
        </button>
      </div>

      <div className={styles.progressText}>
        {completedDays}/{totalDays} days •{' '}
        {Math.round((completedDays / totalDays) * 100)}% complete
      </div>

      {celebrationMessage && (
        <div className={styles.successMessageContainer}>
          <div className={styles.successMessage}>
            <div style={{ fontSize: '32px', marginBottom: '12px' }}>
              {celebrationMessage.isPerfect ? '🎉' : '👏'}
            </div>
            <h3
              style={{
                marginBottom: '8px',
                fontSize: '20px',
                fontWeight: '700',
              }}
            >
              {celebrationMessage.title}
            </h3>
            <p style={{ margin: 0, fontSize: '16px' }}>
              {celebrationMessage.message}
            </p>
            <ShareButton
              habit={habit}
              completedDays={completedDays}
              totalDays={totalDays}
            />
          </div>
        </div>
      )}

      <div className={`${styles.habitGrid} ${gridClass}`}>
        {habit.days.map((day, index) => {
          const status = getDayStatus(day)
          const canClick = status === 'today' && !day.completed
          // Show day number for all squares, just like GitHub
          let content = day.day
          // Only show emoji for missed days
          if (status === 'missed') {
            content = '😞'
          }
          return (
            <div
              key={day.date}
              className={`${styles.habitDay} ${styles[status]}`}
              onClick={() => (canClick ? onDayClick(habit.id, index) : null)}
              title={
                status === 'completed'
                  ? `Completed on ${day.date}`
                  : status === 'missed'
                  ? `Missed on ${day.date}`
                  : status === 'today'
                  ? 'Click to mark as complete!'
                  : `Scheduled for ${day.date}`
              }
            >
              {content}
            </div>
          )
        })}
      </div>

      <div className={styles.progressBarContainer}>
        <div
          className={styles.progressBar}
          style={{
            width: `${(completedDays / totalDays) * 100}%`,
          }}
        />
      </div>

      <p className={styles.githubContributionText}>
        {completedDays === 0
          ? "Start your journey today! Click on today's square to mark it complete."
          : completedDays === totalDays
          ? " Perfect! You've successfully completed the challenge"
          : `Keep it up! ${totalDays - completedDays} more days to go.`}
      </p>
    </div>
  )
}
