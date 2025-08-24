/*
 * This file defines the `AddHabitModal` component, which is a modal dialog for creating a new habit.
 * It provides a user interface for entering a habit's name and selecting its duration before adding it to the application.
 *
 * Key functionalities:
 * - **State Management:** Uses the `useState` hook to manage the form's input values: `habitName` (the name of the habit) and `duration` (the length of the habit journey).
 * - **Modal Visibility:** The component's rendering is conditional based on the `isOpen` prop. If `isOpen` is `false`, the component returns `null` and doesn't appear on the screen.
 * - **Form Submission:** The `handleSubmit` function is called when the form is submitted. It validates that a habit name has been entered and, if so, constructs a new habit object. It then passes this object to the `onAdd` function, which is a callback from the parent component responsible for adding the data to the database.
 * - **UI Interactions:** The `onClose` function is called when the user clicks the "Maybe later" button or the close button (`×`). The `handleOverlayClick` function also calls `onClose`, allowing the user to click outside the modal to dismiss it.
 *
 * Linked files:
 * - `pages/index.js`: This is the parent component that renders this modal. It controls the `isOpen` prop and passes the `onClose` and `onAdd` callback functions, which handle the logic for closing the modal and adding the new habit to the database, respectively.
 */

import { useState } from 'react'
import styles from '../styles/components/AddHabitModal.module.css'

const commonHabits = [
  'Go for a walk',
  'No Junk',
  'Journal',
  'Sleep for 7 hrs',
]

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

  // New function to handle suggestion clicks
  const handleSuggestionClick = (habit) => {
    setHabitName(habit)
  }

  if (!isOpen) return null

  return (
    <div className={styles.modalOverlay} onClick={handleOverlayClick}>
      <div className={styles.modalContent}>
        <button className={styles.modalClose} onClick={onClose} type='button'>
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

        {/* New section for suggested habits */}
        <div style={{ marginBottom: '24px' }}>
          <p
            style={{ color: '#c9d1d9', fontSize: '14px', marginBottom: '8px' }}
          >
            Popular suggestions:
          </p>
          <div className={styles.suggestionGrid}>
            {commonHabits.map((habit, index) => (
              <button
                key={index}
                type='button'
                className={styles.suggestionButton}
                onClick={() => handleSuggestionClick(habit)}
              >
                {habit}
              </button>
            ))}
          </div>
        </div>
        {/* End of new section */}

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
              className={styles.selectDropdown}
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
            >
              <option value='1week'>1 Week (7 days)</option>
              <option value='2weeks'>2 Weeks (14 days)</option>
              <option value='3weeks'>3 Weeks (21 days)</option>
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
              Let's do this!
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}