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
        <div
          className='glass'
          style={{
            padding: '60px',
            textAlign: 'center',
            margin: '100px auto',
            maxWidth: '400px',
          }}
        >
          <div
            style={{
              width: '40px',
              height: '40px',
              border: '3px solid #30363d',
              borderTop: '3px solid #238636',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
              margin: '0 auto 20px',
            }}
          />
          <h2 style={{ color: '#e6edf3', fontSize: '18px', fontWeight: '600' }}>
            Loading your habits...
          </h2>
          <style jsx>{`
            @keyframes spin {
              0% {
                transform: rotate(0deg);
              }
              100% {
                transform: rotate(360deg);
              }
            }
          `}</style>
        </div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0d1117' }}>
      <div className='container'>
        {user && (
          <div
            className='glass'
            style={{
              padding: '20px 24px',
              marginBottom: '24px',
              background: '#161b22',
              border: '1px solid #30363d',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '16px',
              }}
            >
              <div>
                <h1
                  style={{
                    color: '#e6edf3',
                    fontSize: '24px',
                    fontWeight: '700',
                    margin: 0,
                    marginBottom: '4px',
                  }}
                >
                  Your Habit Journey
                </h1>
                <p
                  style={{
                    color: '#7d8590',
                    fontSize: '14px',
                    margin: 0,
                  }}
                >
                  Every small step creates lasting change
                </p>
              </div>
              <div
                style={{ display: 'flex', alignItems: 'center', gap: '16px' }}
              >
                <div
                  style={{ display: 'flex', alignItems: 'center', gap: '12px' }}
                >
                  {user.photoURL && (
                    <img
                      src={user.photoURL}
                      alt='Profile'
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        border: '2px solid #30363d',
                      }}
                    />
                  )}
                  <div>
                    <div
                      style={{
                        color: '#e6edf3',
                        fontSize: '14px',
                        fontWeight: '600',
                      }}
                    >
                      {user.displayName || user.email?.split('@')[0]}
                    </div>
                    <div
                      style={{
                        color: '#7d8590',
                        fontSize: '12px',
                      }}
                    >
                      Keep building! 💪
                    </div>
                  </div>
                </div>
                <button
                  className='btn btn-secondary'
                  onClick={handleSignOut}
                  style={{ fontSize: '13px', padding: '8px 16px' }}
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        )}
        {children}
      </div>
    </div>
  )
}
