/*
 * This file is a Next.js page component responsible for the user login interface.
 * It handles Google Sign-In using Firebase Authentication.
 *
 * Key functionalities:
 * - Displays the login page with a hero section promoting the app, a "Why it works" section, and a "Start building habits" button.
 * - Manages the UI state for loading and errors using React's `useState` hook.
 * - The `handleGoogleSignIn` function handles the authentication process:
 * - It uses `signInWithPopup` from the Firebase SDK to initiate Google Sign-In.
 * - On successful sign-in, it redirects the user to the homepage (`/`) using `next/router`.
 * - It catches and displays any errors that occur during the sign-in process.
 * - **Linked files:**
 * - `../lib/firebase.js`: Imports `auth` and `googleProvider` to connect with Firebase Authentication services.
 * - `next/router`: Used for client-side navigation to the homepage after a successful login.
 */
import { useState } from 'react'
import { signInWithPopup } from 'firebase/auth'
import { auth, googleProvider } from '../lib/firebase'
import { useRouter } from 'next/router'
import HowItWorks from '../components/HowItWorks'
import Footer from '../components/Footer' 
import styles from '../styles/pages/login.module.css'

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
    <div className={styles.loginPage}>
      <div className={styles.container}>
        {/* Hero Section */}
        <div className={styles.heroSection}>
          <div className={styles.logoSection}>
            <h1 className={styles.logoTitle}>epoch</h1>
          </div>

          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>
              Build habits that
              <br />
              <span className={styles.heroAccent}>actually stick</span>
            </h1>

            <p className={styles.heroSubtitle}>
              Track your daily progress with a beautiful, GitHub-inspired
              interface.
            </p>

            <p className={styles.heroDescription}>
              We tap into the psychology of habit building, giving you a
              beautiful visualization of your progress, much like a
              contributions graph. This visual momentum helps you stay on track
              and see your growth over time.
            </p>

            {error && <div className={styles.errorMessage}>{error}</div>}

            <button
              onClick={handleGoogleSignIn}
              disabled={loading}
              className={styles.signInButton}
            >
              {loading ? (
                <>
                  <div className={styles.loadingSpinner}></div>
                  Starting your journey...
                </>
              ) : (
                <>
                  <svg
                    width='20'
                    height='20'
                    viewBox='0 0 18 18'
                    className={styles.googleIcon}
                  >
                    <path
                      fill='currentColor'
                      d='M16.51 8H8.98v3h4.3c-.18 1-.74 1.48-1.6 2.04v2.01h2.6a7.8 7.8 0 0 0 2.38-5.88c0-.57-.05-.66-.15-1.18z'
                    />
                    <path
                      fill='currentColor'
                      d='M8.98 17c2.16 0 3.97-.72 5.3-1.94l-2.6-2.04a4.8 4.8 0 0 1-7.18-2.53H1.83v2.07A8 8 0 0 0 8.98 17z'
                    />
                    <path
                      fill='currentColor'
                      d='M4.5 10.49a4.8 4.8 0 0 1 0-3.07V5.35H1.83a8 8 0 0 0 0 7.28l2.67-2.14z'
                    />
                    <path
                      fill='currentColor'
                      d='M8.98 4.72c1.16 0 2.23.4 3.06 1.2l2.3-2.3A8 8 0 0 0 1.83 5.35L4.5 7.42a4.77 4.77 0 0 1 4.48-2.7z'
                    />
                  </svg>
                  Start building habits
                </>
              )}
            </button>

            <p className={styles.featuresList}>
              Free to use • Open source • No ads
            </p>
          </div>
        </div>

        {/* How It Works Section */}
        <HowItWorks />

        {/* Stats Section */}
        <div className={styles.statsSection}>
          <h2 className={styles.statsTitle}>Why habit tracking works</h2>

          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <div className={styles.statNumber}>66 days</div>
              <p className={styles.statDescription}>
                Average time to form a new habit
              </p>
            </div>

            <div className={styles.statCard}>
              <div className={styles.statNumber}>42%</div>
              <p className={styles.statDescription}>
                More likely to achieve goals when tracking
              </p>
            </div>

            <div className={styles.statCard}>
              <div className={styles.statNumber}>21 days</div>
              <p className={styles.statDescription}>
                Shortest period to see significant change
              </p>
            </div>
          </div>
        </div>

        {/* Features Preview */}
        <div className={styles.featuresSection}>
          <div className={styles.featurePreview}>
            <div className={styles.mockContributionGraph}>
              <div className={styles.mockWeek}>
                {[...Array(7)].map((_, i) => (
                  <div
                    key={i}
                    className={`${styles.mockDay} ${
                      styles[`level${(i % 4) + 1}`]
                    }`}
                  ></div>
                ))}
              </div>
              <div className={styles.mockWeek}>
                {[...Array(7)].map((_, i) => (
                  <div
                    key={i}
                    className={`${styles.mockDay} ${
                      styles[`level${((i + 1) % 4) + 1}`]
                    }`}
                  ></div>
                ))}
              </div>
              <div className={styles.mockWeek}>
                {[...Array(7)].map((_, i) => (
                  <div
                    key={i}
                    className={`${styles.mockDay} ${
                      styles[`level${((i + 2) % 4) + 1}`]
                    }`}
                  ></div>
                ))}
              </div>
            </div>
            <p className={styles.previewCaption}>
              Your progress visualization - just like GitHub contributions
            </p>
          </div>
        </div>
        <Footer />
      </div>

      {/* Footer - Add this at the bottom */}
    </div>
  )
}