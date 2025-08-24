import { Play, Target, Award, Zap, Rocket } from 'lucide-react'
import styles from '../styles/components/HowItWorks.module.css'

export default function HowItWorks() {
  return (
    <section className={styles.howItWorksSection}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <h2 className={styles.title}>How it works</h2>
          <p className={styles.subtitle}>
            Simple, visual, effective. Build consistency in just 3 steps.
          </p>
        </div>

        {/* Journey Flow */}
        <div className={styles.journeyFlow}>
          {/* Step 1 */}
          <div className={styles.step}>
            <div className={styles.stepNumber}>1</div>
            <div className={styles.stepContent}>
              <h3 className={styles.stepTitle}>Choose & Start</h3>
              <p className={styles.stepDescription}>
                Pick from curated habits or create your own. Select your
                challenge duration: 7, 14, or 21 days.
              </p>
              <div className={styles.stepVisual}>
                <div className={styles.mockHabitList}>
                  <div className={styles.mockHabit}>Daily Exercise</div>
                  <div className={styles.mockHabit}>Read 30 min</div>
                  <div className={styles.mockHabit}>Quit Smoking</div>
                  <div className={styles.mockHabit}>Sleep @ 8pm</div>
                </div>
              </div>
            </div>
          </div>

          {/* Arrow */}
          <div className={styles.arrow}>
            <svg width='24' height='24' viewBox='0 0 24 24' fill='none'>
              <path
                d='M7 17L17 7M17 7H7M17 7V17'
                stroke='#238636'
                strokeWidth='2'
              />
            </svg>
          </div>

          {/* Step 2 */}
          <div className={styles.step}>
            <div className={styles.stepNumber}>2</div>
            <div className={styles.stepContent}>
              <h3 className={styles.stepTitle}>Track Daily</h3>
              <p className={styles.stepDescription}>
                Simply tap the day's square when you complete your habit. Watch
                your contribution graph come alive.
              </p>
              <div className={styles.stepVisual}>
                <div className={styles.mockTracker}>
                  <div className={styles.trackerWeek}>
                    {[...Array(7)].map((_, i) => (
                      <div
                        key={i}
                        className={`${styles.trackerDay}`}
                        style={{ animationDelay: `${i * 0.3}s` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Arrow */}
          <div className={styles.arrow}>
            <svg width='24' height='24' viewBox='0 0 24 24' fill='none'>
              <path
                d='M7 17L17 7M17 7H7M17 7V17'
                stroke='#238636'
                strokeWidth='2'
              />
            </svg>
          </div>

          {/* Step 3 */}
          <div className={styles.step}>
            <div className={styles.stepNumber}>3</div>
            <div className={styles.stepContent}>
              <h3 className={styles.stepTitle}>Earn & Share</h3>
              <p className={styles.stepDescription}>
                Maintain 80%+ consistency to unlock your personalized
                certificate with your name on it. Share your achievement and
                inspire others.
              </p>
              <div className={styles.stepVisual}>
                <div className={styles.mockCertificate}>
                  <div className={styles.certificateHeader}>
                    <Award className={styles.certificateIcon} />
                    <div className={styles.certificateTitle}>
                      Achievement Unlocked
                    </div>
                  </div>
                  <div className={styles.certificateBody}>
                    <div className={styles.habitName}>
                      21-Day Reading Challenge
                    </div>
                    <div className={styles.completionRate}>95% Completion</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Key Benefits */}
        <div className={styles.benefits}>
          <div className={styles.benefitCard}>
            <div className={styles.benefitIcon}>
              <Zap size={32} />
            </div>
            <h4 className={styles.benefitTitle}>No Overwhelm</h4>
            <p className={styles.benefitText}>
              Unlike complex apps, we focus on one thing: building consistency
              through visual progress.
            </p>
          </div>

          <div className={styles.benefitCard}>
            <div className={styles.benefitIcon}>
              <Target size={32} />
            </div>
            <h4 className={styles.benefitTitle}>Curated Habits</h4>
            <p className={styles.benefitText}>
              Pre-selected habits for common self-improvement goals. One-click
              to start your journey.
            </p>
          </div>

          <div className={styles.benefitCard}>
            <div className={styles.benefitIcon}>
              <Rocket size={32} />
            </div>
            <h4 className={styles.benefitTitle}>Quick Wins</h4>
            <p className={styles.benefitText}>
              Short challenges (7-21 days) give you momentum and prove you can
              build lasting habits.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className={styles.cta}>
          <p className={styles.ctaText}>
            Ready to transform your daily routine?
          </p>
          <div className={styles.ctaHighlight}>
            Start with just one habit today.
          </div>
        </div>
      </div>
    </section>
  )
}
