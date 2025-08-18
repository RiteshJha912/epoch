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
    <div style={{ minHeight: '100vh', background: '#0d1117' }}>
      <div className='container'>
        {/* Hero Section */}
        <div className='hero-section'>
          <h1 className='hero-title'>
            Epoch: Build habits that
            <br />
            <span style={{ color: '#238636' }}>actually stick</span>
          </h1>
          <p className='hero-subtitle'>
            Track your daily progress with a beautiful, GitHub-inspired
            interface.
          </p>
          <p className='hero-description'>
            We tap into the psychology of habit building,
            giving you a beautiful visualization of your progress, much like a
            contributions graph. This visual momentum helps you stay on
            track and see your growth over time.
          </p>

          {error && (
            <div
              style={{
                color: '#f85149',
                textAlign: 'center',
                marginBottom: '24px',
                padding: '16px',
                background: 'rgba(248, 81, 73, 0.1)',
                borderRadius: '8px',
                border: '1px solid rgba(248, 81, 73, 0.2)',
                fontSize: '14px',
                maxWidth: '400px',
                margin: '0 auto 24px',
              }}
            >
              {error}
            </div>
          )}

          <button
            onClick={handleGoogleSignIn}
            disabled={loading}
            className='btn btn-primary btn-large'
            style={{
              fontSize: '18px',
              padding: '16px 48px',
              marginBottom: '16px',
            }}
          >
            {loading ? (
              'Starting your journey...'
            ) : (
              <>
                <svg
                  width='20'
                  height='20'
                  viewBox='0 0 18 18'
                  style={{ marginRight: '12px' }}
                >
                  <path
                    fill='#ffffff'
                    d='M16.51 8H8.98v3h4.3c-.18 1-.74 1.48-1.6 2.04v2.01h2.6a7.8 7.8 0 0 0 2.38-5.88c0-.57-.05-.66-.15-1.18z'
                  />
                  <path
                    fill='#ffffff'
                    d='M8.98 17c2.16 0 3.97-.72 5.3-1.94l-2.6-2.04a4.8 4.8 0 0 1-7.18-2.53H1.83v2.07A8 8 0 0 0 8.98 17z'
                  />
                  <path
                    fill='#ffffff'
                    d='M4.5 10.49a4.8 4.8 0 0 1 0-3.07V5.35H1.83a8 8 0 0 0 0 7.28l2.67-2.14z'
                  />
                  <path
                    fill='#ffffff'
                    d='M8.98 4.72c1.16 0 2.23.4 3.06 1.2l2.3-2.3A8 8 0 0 0 1.83 5.35L4.5 7.42a4.77 4.77 0 0 1 4.48-2.7z'
                  />
                </svg>
                Start building habits
              </>
            )}
          </button>

          <p
            style={{
              color: '#7d8590',
              fontSize: '14px',
              marginBottom: '60px',
            }}
          >
            Free to use • Open source • No ads
          </p>
        </div>

        {/* Stats Section */}
        <div className='stats-section'>
          <h2
            style={{
              fontSize: '28px',
              fontWeight: '700',
              color: '#e6edf3',
              marginBottom: '24px',
            }}
          >
            Why habit tracking works
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '32px',
              marginBottom: '32px',
            }}
          >
            <div>
              <div
                style={{
                  fontSize: '32px',
                  fontWeight: '800',
                  color: '#238636',
                  marginBottom: '8px',
                }}
              >
                66 days
              </div>
              <p style={{ color: '#7d8590', fontSize: '14px' }}>
                Average time to form a new habit
              </p>
            </div>

            <div>
              <div
                style={{
                  fontSize: '32px',
                  fontWeight: '800',
                  color: '#238636',
                  marginBottom: '8px',
                }}
              >
                42%
              </div>
              <p style={{ color: '#7d8590', fontSize: '14px' }}>
                More likely to achieve goals when tracking
              </p>
            </div>

            <div>
              <div
                style={{
                  fontSize: '32px',
                  fontWeight: '800',
                  color: '#238636',
                  marginBottom: '8px',
                }}
              >
                21 days
              </div>
              <p style={{ color: '#7d8590', fontSize: '14px' }}>
                Shortest period to see significant change
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
