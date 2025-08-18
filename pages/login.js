// pages/login.js
import { useState } from 'react'
import { signInWithPopup } from 'firebase/auth'
import { auth, googleProvider } from '../lib/firebase'
import { useRouter } from 'next/router'

export default function Login() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleGoogleSignIn = async () => {
    setLoading(true)
    setError('')

    try {
      await signInWithPopup(auth, googleProvider)
      router.push('/')
    } catch (error) {
      setError(error.message)
      console.error('Google sign in error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='container'>
      <div
        className='glass'
        style={{
          maxWidth: '400px',
          margin: '100px auto',
          padding: '40px',
          textAlign: 'center',
        }}
      >
        <h1
          style={{
            color: 'white',
            marginBottom: '15px',
            fontSize: '32px',
            fontWeight: '700',
          }}
        >
          Habit Tracker
        </h1>

        <p
          style={{
            color: 'rgba(255, 255, 255, 0.8)',
            marginBottom: '40px',
            fontSize: '16px',
          }}
        >
          Build better habits, one day at a time
        </p>

        {error && (
          <div
            style={{
              color: '#e74c3c',
              textAlign: 'center',
              marginBottom: '20px',
              padding: '15px',
              background: 'rgba(231, 76, 60, 0.1)',
              borderRadius: '12px',
              fontSize: '14px',
            }}
          >
            {error}
          </div>
        )}

        <button
          onClick={handleGoogleSignIn}
          disabled={loading}
          className='btn btn-primary'
          style={{
            width: '100%',
            padding: '15px 20px',
            fontSize: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
          }}
        >
          {loading ? (
            'Signing in...'
          ) : (
            <>
              <svg width='18' height='18' viewBox='0 0 18 18'>
                <path
                  fill='#4285F4'
                  d='M16.51 8H8.98v3h4.3c-.18 1-.74 1.48-1.6 2.04v2.01h2.6a7.8 7.8 0 0 0 2.38-5.88c0-.57-.05-.66-.15-1.18z'
                />
                <path
                  fill='#34A853'
                  d='M8.98 17c2.16 0 3.97-.72 5.3-1.94l-2.6-2.04a4.8 4.8 0 0 1-7.18-2.53H1.83v2.07A8 8 0 0 0 8.98 17z'
                />
                <path
                  fill='#FBBC05'
                  d='M4.5 10.49a4.8 4.8 0 0 1 0-3.07V5.35H1.83a8 8 0 0 0 0 7.28l2.67-2.14z'
                />
                <path
                  fill='#EA4335'
                  d='M8.98 4.72c1.16 0 2.23.4 3.06 1.2l2.3-2.3A8 8 0 0 0 1.83 5.35L4.5 7.42a4.77 4.77 0 0 1 4.48-2.7z'
                />
              </svg>
              Continue with Google
            </>
          )}
        </button>

        <div
          style={{
            marginTop: '30px',
            padding: '20px',
            background: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '12px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          <h3
            style={{
              color: 'white',
              fontSize: '18px',
              marginBottom: '10px',
            }}
          >
            Why Habit Tracker?
          </h3>
          <ul
            style={{
              color: 'rgba(255, 255, 255, 0.8)',
              fontSize: '14px',
              textAlign: 'left',
              listStyle: 'none',
              padding: 0,
            }}
          >
            <li style={{ marginBottom: '8px' }}>
              ✅ Track daily progress visually
            </li>
            <li style={{ marginBottom: '8px' }}>
              🎯 Build habits in 1-3 week cycles
            </li>
            <li style={{ marginBottom: '8px' }}>
              🏆 Celebrate your achievements
            </li>
            <li>📱 Works on all your devices</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
