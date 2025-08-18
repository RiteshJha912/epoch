import { isToday, canMarkToday, formatDate, getDayStatus } from '../lib/utils'

export default function HabitGrid({ habit, onDayClick }) {
  const totalDays = habit.days.length
  const completedDays = habit.days.filter((day) => day.completed).length
  const isCompleted = completedDays === totalDays

  const gridClass =
    totalDays <= 7 ? 'grid-7' : totalDays <= 14 ? 'grid-14' : 'grid-21'

  return (
    <div className='habit-card glass'>
      <div className='habit-header'>
        <h3 className='habit-title'>{habit.name}</h3>
        <div className='progress-text'>
          {completedDays}/{totalDays} days •{' '}
          {Math.round((completedDays / totalDays) * 100)}% complete
        </div>
      </div>

      {isCompleted && (
        <div className='success-message'>
          <div style={{ fontSize: '32px', marginBottom: '12px' }}>🎉</div>
          <h3
            style={{ marginBottom: '8px', fontSize: '20px', fontWeight: '700' }}
          >
            Incredible work!
          </h3>
          <p style={{ margin: 0, fontSize: '16px' }}>
            You've successfully completed "{habit.name}"! You're building the
            discipline that creates lasting change. Ready for your next
            challenge?
          </p>
        </div>
      )}

      <div className={`habit-grid ${gridClass}`}>
        {habit.days.map((day, index) => {
          const status = getDayStatus(day)
          const canClick = status === 'today' && !day.completed

          let content = day.day
          if (status === 'missed') {
            content = '😞'
          } else if (status === 'completed') {
            content = '✓'
          } else if (status === 'today') {
            content = day.day
          }

          return (
            <div
              key={day.date}
              className={`habit-day ${status}`}
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

      <div className='progress-bar-container'>
        <div
          className='progress-bar'
          style={{
            width: `${(completedDays / totalDays) * 100}%`,
          }}
        />
      </div>

      <p className='github-contribution-text'>
        {completedDays === 0
          ? "Start your journey today! Click on today's square to mark it complete."
          : completedDays === totalDays
          ? "🔥 Perfect completion! You've mastered this habit."
          : `Keep it up! ${totalDays - completedDays} more days to go.`}
      </p>
    </div>
  )
}
