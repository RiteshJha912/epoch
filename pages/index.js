/* pages/index.js */
import { useState, useEffect } from 'react'
import {
  collection,
  addDoc,
  query,
  where,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore'
import { onAuthStateChanged } from 'firebase/auth'
import { auth, db } from '../lib/firebase'
import Layout from '../components/Layout'
import HabitGrid from '../components/HabitGrid'
import AddHabitModal from '../components/AddHabitModal'
import { generateHabitDays, formatDate } from '../lib/utils'

export default function Home() {
  const [habits, setHabits] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      console.log('Auth state changed:', authUser)
      setUser(authUser)
    })
    return () => unsubscribe()
  }, [])

  useEffect(() => {
    let unsubscribeHabits
    if (user) {
      console.log('Setting up habits listener for user:', user.uid)
      const q = query(collection(db, 'habits'), where('userId', '==', user.uid))

      unsubscribeHabits = onSnapshot(
        q,
        (snapshot) => {
          console.log(
            'Habits snapshot received, docs count:',
            snapshot.docs.length
          )
          const habitsData = snapshot.docs.map((doc) => {
            const data = { id: doc.id, ...doc.data() }
            console.log('Habit data:', data)
            return data
          })
          console.log('Setting habits:', habitsData)
          setHabits(habitsData)
        },
        (error) => {
          console.error('Error listening to habits:', error)
        }
      )
    } else {
      console.log('No user, clearing habits')
      setHabits([])
    }

    return () => {
      if (unsubscribeHabits) {
        unsubscribeHabits()
      }
    }
  }, [user])

  useEffect(() => {
    const deleteCompletedHabits = async () => {
      if (habits.length === 0) return

      const today = new Date()
      const habitsToDelete = habits.filter((habit) => {
        const isCompleted = habit.days.every((day) => day.completed)
        if (!isCompleted || !habit.completionDate) {
          return false
        }

        const completionDate = new Date(habit.completionDate)
        const diffInMilliseconds = today.getTime() - completionDate.getTime()
        const diffInDays = diffInMilliseconds / (1000 * 60 * 60 * 24)

        return diffInDays >= 3
      })

      if (habitsToDelete.length > 0) {
        console.log(`Found ${habitsToDelete.length} habits to delete.`)
        for (const habit of habitsToDelete) {
          try {
            await deleteDoc(doc(db, 'habits', habit.id))
            console.log(`Habit ${habit.id} deleted successfully.`)
          } catch (error) {
            console.error(`Error deleting habit ${habit.id}:`, error)
          }
        }
      }
    }

    deleteCompletedHabits()
  }, [habits])

  const addHabit = async (habitData) => {
    if (!user) {
      console.error('No user found')
      alert('Please make sure you are logged in')
      return
    }

    try {
      console.log('Adding habit:', habitData)
      const days = generateHabitDays(habitData.startDate, habitData.duration)
      await addDoc(collection(db, 'habits'), {
        ...habitData,
        days,
        userId: user.uid,
        createdAt: new Date().toISOString(),
      })
      console.log('Habit added successfully.')
    } catch (error) {
      console.error('Error adding habit:', error)
      alert('Error adding habit: ' + error.message)
    }
  }

  const deleteHabit = async (habitId) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this habit? This cannot be undone.'
    )
    if (confirmDelete) {
      try {
        await deleteDoc(doc(db, 'habits', habitId))
        console.log(`Habit ${habitId} deleted manually.`)
      } catch (error) {
        console.error('Error deleting habit:', error)
      }
    }
  }

  const markDay = async (habitId, dayIndex) => {
    try {
      const habit = habits.find((h) => h.id === habitId)
      const updatedDays = [...habit.days]
      updatedDays[dayIndex].completed = true

      const habitRef = doc(db, 'habits', habitId)

      const isLastDay = dayIndex === updatedDays.length - 1
      const isPerfectCompletion = updatedDays.every((day) => day.completed)

      const updateData = {
        days: updatedDays,
      }

      if (isLastDay && isPerfectCompletion) {
        updateData.completionDate = new Date().toISOString()
      }

      await updateDoc(habitRef, updateData)
    } catch (error) {
      console.error('Error marking day:', error)
    }
  }

  const totalHabits = habits.length
  const completedHabits = habits.filter((habit) =>
    habit.days.every((day) => day.completed)
  ).length
  const totalDaysCompleted = habits.reduce(
    (total, habit) => total + habit.days.filter((day) => day.completed).length,
    0
  )

  return (
    <Layout>
      <div className='glass' style={{ padding: '32px' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: '32px',
            flexWrap: 'wrap',
            gap: '20px',
          }}
        >
          <div>
            <h2
              style={{
                color: '#e6edf3',
                fontSize: '28px',
                fontWeight: '700',
                marginBottom: '8px',
              }}
            >
              {habits.length === 0
                ? 'Ready to start your journey?'
                : 'Your Active Habits'}
            </h2>
            {habits.length > 0 && (
              <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
                <div style={{ textAlign: 'center' }}>
                  <div
                    style={{
                      fontSize: '24px',
                      fontWeight: '700',
                      color: '#238636',
                      marginBottom: '4px',
                    }}
                  >
                    {totalDaysCompleted}
                  </div>
                  <div style={{ color: '#7d8590', fontSize: '13px' }}>
                    Days completed
                  </div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div
                    style={{
                      fontSize: '24px',
                      fontWeight: '700',
                      color: '#238636',
                      marginBottom: '4px',
                    }}
                  >
                    {completedHabits}
                  </div>
                  <div style={{ color: '#7d8590', fontSize: '13px' }}>
                    Habits completed
                  </div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div
                    style={{
                      fontSize: '24px',
                      fontWeight: '700',
                      color: '#238636',
                      marginBottom: '4px',
                    }}
                  >
                    {totalHabits}
                  </div>
                  <div style={{ color: '#7d8590', fontSize: '13px' }}>
                    Total habits
                  </div>
                </div>
              </div>
            )}
          </div>
          <button
            className='btn btn-primary'
            onClick={() => setShowModal(true)}
            style={{ padding: '12px 24px' }}
          >
            + Add New Habit
          </button>
        </div>
        {habits.length === 0 ? (
          <div
            style={{
              textAlign: 'center',
              color: '#7d8590',
              padding: '80px 20px',
              background: '#0d1117',
              borderRadius: '12px',
              border: '1px solid #21262d',
            }}
          >
            <div style={{ fontSize: '48px', marginBottom: '24px' }}>🌱</div>
            <p
              style={{
                fontSize: '18px',
                fontWeight: '500',
                marginBottom: '8px',
              }}
            >
              No habits found
            </p>
            <p style={{ fontSize: '14px', lineHeight: '1.5' }}>
              Click "Add New Habit" to start your first habit journey and track
              your progress.
            </p>
          </div>
        ) : (
          habits.map((habit) => (
            <HabitGrid
              key={habit.id}
              habit={habit}
              onDayClick={markDay}
              onDelete={deleteHabit}
            />
          ))
        )}
      </div>
      <AddHabitModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onAdd={addHabit}
      />
    </Layout>
  )
}
