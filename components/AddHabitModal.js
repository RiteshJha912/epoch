import { useState } from 'react'

export default function AddHabitModal({ isOpen, onClose, onAdd }) {
  const [habitName, setHabitName] = useState('')
  const [duration, setDuration] = useState('3weeks')

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form submitted with:', { habitName, duration })

    if (habitName.trim()) {
      const newHabit = {
        name: habitName.trim(),
        duration,
        startDate: new Date().toISOString(),
      }
      console.log('Adding habit:', newHabit)
      onAdd(newHabit)
      setHabitName('')
      setDuration('3weeks')
      onClose()
    } else {
      alert('Please enter a habit name')
    }
  }

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <div className='modal-overlay' onClick={handleOverlayClick}>
      <div className='modal-content'>
        <button className='modal-close' onClick={onClose} type='button'>
          ×
        </button>

        <h2
          style={{
            marginBottom: '24px',
            textAlign: 'center',
            color: '#e6edf3',
            fontSize: '24px',
            fontWeight: '700',
          }}
        >
          Start a new habit
        </h2>

        <p
          style={{
            color: '#7d8590',
            textAlign: 'center',
            marginBottom: '32px',
            fontSize: '14px',
            lineHeight: '1.5',
          }}
        >
          Choose something small and specific. Consistency beats intensity every
          time.
        </p>

        <form onSubmit={handleSubmit}>
          <div className='form-group'>
            <label>What habit do you want to build?</label>
            <input
              type='text'
              value={habitName}
              onChange={(e) => setHabitName(e.target.value)}
              placeholder='e.g., Read for 10 minutes, Drink 8 glasses of water'
              required
            />
          </div>

          <div className='form-group'>
            <label>How long do you want to commit?</label>
            <select
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
            >
              <option value='1week'>
                1 Week (7 days) - Great for trying new things
              </option>
              <option value='2weeks'>
                2 Weeks (14 days) - Build some momentum
              </option>
              <option value='3weeks'>
                3 Weeks (21 days) - Form a solid foundation
              </option>
            </select>
            <small
              style={{
                color: '#7d8590',
                fontSize: '12px',
                marginTop: '8px',
                display: 'block',
              }}
            >
              💡 Start with shorter periods if you're new to habit building
            </small>
          </div>

          <div
            style={{
              display: 'flex',
              gap: '12px',
              justifyContent: 'flex-end',
              marginTop: '32px',
            }}
          >
            <button
              type='button'
              className='btn btn-secondary'
              onClick={onClose}
            >
              Maybe later
            </button>
            <button type='submit' className='btn btn-primary'>
              Let's do this! 🚀
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
