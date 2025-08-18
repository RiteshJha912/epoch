import { useState, useEffect } from 'react'
import {
  collection,
  addDoc,
  query,
  where,
  onSnapshot,
  doc,
  updateDoc,
} from 'firebase/firestore'
import { onAuthStateChanged } from 'firebase/auth'
import { auth, db } from '../lib/firebase'
import Layout from '../components/Layout'
import HabitGrid from '../components/HabitGrid'
import AddHabitModal from '../components/AddHabitModal'
import { generateHabitDays } from '../lib/utils'

export default function Home() {
  const [habits, setHabits] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log('Auth state changed:', user)
      setUser(user)
      if (user) {
        console.log('Setting up habits listener for user:', user.uid)
        // Listen to user's habits
        const q = query(
          collection(db, 'habits'),
          where('userId', '==', user.uid)
        )

        const unsubscribeHabits = onSnapshot(
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
            alert('Error loading habits: ' + error.message)
          }
        )

        return () => unsubscribeHabits()
      } else {
        console.log('No user, clearing habits')
        setHabits([])
      }
    })

    return () => unsubscribe()
  }, [])

  const addHabit = async (habitData) => {
    if (!user) {
      console.error('No user found')
      alert('Please make sure you are logged in')
      return
    }

    try {
      console.log('Adding habit:', habitData)
      console.log('User:', user.uid)

      const days = generateHabitDays(habitData.startDate, habitData.duration)
      console.log('Generated days:', days)

      const docRef = await addDoc(collection(db, 'habits'), {
        ...habitData,
        days,
        userId: user.uid,
        createdAt: new Date().toISOString(),
      })

      console.log('Habit added successfully with ID:', docRef.id)
    } catch (error) {
      console.error('Error adding habit:', error)
      alert('Error adding habit: ' + error.message)
    }
  }

  const markDay = async (habitId, dayIndex) => {
    try {
      const habit = habits.find((h) => h.id === habitId)
      const updatedDays = [...habit.days]
      updatedDays[dayIndex].completed = true

      const habitRef = doc(db, 'habits', habitId)
      await updateDoc(habitRef, {
        days: updatedDays,
      })
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
            <HabitGrid key={habit.id} habit={habit} onDayClick={markDay} />
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
