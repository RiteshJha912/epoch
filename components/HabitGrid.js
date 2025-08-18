// components/HabitGrid.js
import { isToday, canMarkToday, formatDate } from '../lib/utils'

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
          {completedDays}/{totalDays} days completed
        </div>
      </div>

      {isCompleted && (
        <div className='success-message'>
          🎉 Congratulations! You've successfully completed your "{habit.name}"
          habit! You're building amazing discipline! 🌟
        </div>
      )}

      <div className={`habit-grid ${gridClass}`}>
        {habit.days.map((day, index) => {
          const dayDate = new Date(day.date)
          const isTodayDay = isToday(dayDate)
          const canClick = canMarkToday([day]) && isTodayDay
          const isPastDay =
            new Date(day.date) < new Date(formatDate(new Date()))

          return (
            <div
              key={day.date}
              className={`habit-day ${day.completed ? 'completed' : ''} ${
                isTodayDay ? 'today' : ''
              } ${
                !canClick && !day.completed && isTodayDay
                  ? ''
                  : !canClick && !day.completed && !isPastDay
                  ? 'disabled'
                  : ''
              }`}
              onClick={() => (canClick ? onDayClick(habit.id, index) : null)}
              style={{
                opacity: !day.completed && isPastDay && !isTodayDay ? 0.3 : 1,
              }}
            >
              {day.day}
            </div>
          )
        })}
      </div>

      <div style={{ marginTop: '15px', textAlign: 'center' }}>
        <div
          style={{
            width: '100%',
            height: '8px',
            background: 'rgba(255,255,255,0.2)',
            borderRadius: '4px',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              width: `${(completedDays / totalDays) * 100}%`,
              height: '100%',
              background: 'linear-gradient(45deg, #2ecc71, #27ae60)',
              transition: 'width 0.3s ease',
            }}
          />
        </div>
      </div>
    </div>
  )
}
