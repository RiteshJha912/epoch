import { Heart, Star, Github } from 'lucide-react'
import styles from '../styles/components/Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <div className={styles.content}>
          <div className={styles.madeWithLove}>
            <span>Made with</span>
            <Heart className={styles.heartIcon} size={16} />
            <span>
              by <strong>Ritzardous</strong>
            </span>
          </div>

          <div className={styles.divider}>•</div>

          <a
            href='https://github.com/RiteshJha912/epoch'
            target='_blank'
            rel='noopener noreferrer'
            className={styles.githubLink}
          >
            <Github size={16} />
            <span>Star on GitHub</span>
            <Star className={styles.starIcon} size={14} />
          </a>
        </div>
      </div>
    </footer>
  )
}
