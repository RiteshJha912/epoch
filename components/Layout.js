// components/Layout.js

import { useEffect, useState } from 'react'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from '../lib/firebase'
import { useRouter } from 'next/router'

export default function Layout({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user)
      setLoading(false)

      if (!user && router.pathname !== '/login') {
        router.push('/login')
      }
    })

    return () => unsubscribe()
  }, [router])

  const handleSignOut = async () => {
    try {
      await signOut(auth)
      router.push('/login')
    } catch (error) {
      console.error('Sign out error:', error)
    }
  }

  if (loading) {
    return (
      <div className='container'>
        <div className='glass' style={{ padding: '40px', textAlign: 'center' }}>
          <h2 style={{ color: 'white' }}>Loading...</h2>
        </div>
      </div>
    )
  }

  return (
    <div className='container'>
      {user && (
        <div
          className='glass'
          style={{ padding: '20px', marginBottom: '20px' }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '10px',
            }}
          >
            <h1 style={{ color: 'white', fontSize: '28px', fontWeight: '700' }}>
              Habit Tracker
            </h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <div
                style={{ display: 'flex', alignItems: 'center', gap: '10px' }}
              >
                {user.photoURL && (
                  <img
                    src={user.photoURL}
                    alt='Profile'
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      border: '2px solid rgba(255,255,255,0.3)',
                    }}
                  />
                )}
                <span style={{ color: 'rgba(255,255,255,0.8)' }}>
                  {user.displayName || user.email}
                </span>
              </div>
              <button className='btn btn-secondary' onClick={handleSignOut}>
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}
      {children}
    </div>
  )
}
