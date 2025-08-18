// components/AddHabitModal.js
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

  if (!isOpen) return null

  return (
    <div className='modal'>
      <div className='modal-content'>
        <h2 style={{ marginBottom: '20px', textAlign: 'center' }}>
          Add New Habit
        </h2>
        <form onSubmit={handleSubmit}>
          <div className='form-group'>
            <label>Habit Name</label>
            <input
              type='text'
              value={habitName}
              onChange={(e) => setHabitName(e.target.value)}
              placeholder='e.g., Drink 8 glasses of water'
              required
            />
          </div>
          <div className='form-group'>
            <label>Duration</label>
            <select
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
            >
              <option value='1week'>1 Week (7 days)</option>
              <option value='2weeks'>2 Weeks (14 days)</option>
              <option value='3weeks'>3 Weeks (21 days)</option>
            </select>
          </div>
          <div
            style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}
          >
            <button
              type='button'
              className='btn btn-secondary'
              onClick={onClose}
            >
              Cancel
            </button>
            <button type='submit' className='btn btn-primary'>
              Add Habit
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
