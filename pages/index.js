// pages/index.js
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
      setUser(user)
      if (user) {
        // Listen to user's habits
        const q = query(
          collection(db, 'habits'),
          where('userId', '==', user.uid)
        )

        const unsubscribeHabits = onSnapshot(q, (snapshot) => {
          const habitsData = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
          setHabits(habitsData)
        })

        return () => unsubscribeHabits()
      }
    })

    return () => unsubscribe()
  }, [])

  const addHabit = async (habitData) => {
    if (!user) return

    try {
      const days = generateHabitDays(habitData.startDate, habitData.duration)

      await addDoc(collection(db, 'habits'), {
        ...habitData,
        days,
        userId: user.uid,
        createdAt: new Date().toISOString(),
      })
    } catch (error) {
      console.error('Error adding habit:', error)
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

  return (
    <Layout>
      <div className='glass' style={{ padding: '30px' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '30px',
            flexWrap: 'wrap',
            gap: '15px',
          }}
        >
          <h2 style={{ color: 'white', fontSize: '24px' }}>
            Your Habits ({habits.length})
          </h2>
          <button
            className='btn btn-primary'
            onClick={() => setShowModal(true)}
          >
            + Add New Habit
          </button>
        </div>

        {habits.length === 0 ? (
          <div
            style={{
              textAlign: 'center',
              color: 'rgba(255,255,255,0.7)',
              padding: '60px 20px',
            }}
          >
            <h3 style={{ marginBottom: '15px' }}>No habits yet!</h3>
            <p>Start building better habits by adding your first one.</p>
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
