import { useState } from 'react'
import styles from '../styles/components/ShareButton.module.css'

export default function ShareButton({ habit, completedDays, totalDays }) {
  const [isGenerating, setIsGenerating] = useState(false)
  const [shareUrl, setShareUrl] = useState(null)

  const completionPercentage = Math.round((completedDays / totalDays) * 100)

  // Check if this achievement is worth sharing (>80% completion for milestone days)
  const isShareWorthy = () => {
    const milestones = [7, 14, 21]
    return milestones.includes(totalDays) && completionPercentage >= 80
  }

  // Generate achievement image
  const generateShareImage = async () => {
    setIsGenerating(true)

    try {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')

      // Set canvas size (Instagram story size but more compact)
      canvas.width = 1080
      canvas.height = 1350 // Reduced height to eliminate empty space

      // Create gradient background
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
      gradient.addColorStop(0, '#0d1117')
      gradient.addColorStop(0.5, '#161b22')
      gradient.addColorStop(1, '#0d1117')
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Add subtle pattern overlay
      ctx.fillStyle = 'rgba(33, 38, 45, 0.3)'
      for (let i = 0; i < canvas.width; i += 60) {
        for (let j = 0; j < canvas.height; j += 60) {
          if ((i + j) % 120 === 0) {
            ctx.fillRect(i, j, 30, 30)
          }
        }
      }

      // Add epoch branding (larger)
      ctx.fillStyle = '#238636'
      ctx.font = 'bold 64px Arial, sans-serif' // Increased from 48px
      ctx.textAlign = 'center'
      ctx.fillText('epoch', canvas.width / 2, 120)

      ctx.fillStyle = '#7d8590'
      ctx.font = '32px Arial, sans-serif' // Increased from 24px
      ctx.fillText('Consitency Builder', canvas.width / 2, 170)

      // Achievement emoji (larger)
      ctx.font = '150px Arial, sans-serif' // Increased from 120px
      const emoji = completionPercentage === 100 ? '🎉' : '🔥'
      ctx.fillText(emoji, canvas.width / 2, 320)

      // Main achievement text (larger)
      ctx.fillStyle = '#e6edf3'
      ctx.font = 'bold 68px Arial, sans-serif' // Increased from 56px
      ctx.textAlign = 'center'
      const achievementText =
        completionPercentage === 100
          ? 'HABIT COMPLETED!'
          : 'MILESTONE ACHIEVED!'
      ctx.fillText(achievementText, canvas.width / 2, 420)

      // Habit name (larger)
      ctx.fillStyle = '#58a6ff'
      ctx.font = '42px Arial, sans-serif' // Increased from 36px
      const habitName =
        habit.name.length > 25
          ? habit.name.substring(0, 25) + '...'
          : habit.name
      ctx.fillText(habitName, canvas.width / 2, 480)

      // Stats section background (larger with border radius)
      const statsBoxY = 520
      const statsBoxHeight = 350 // Increased height
      const statsBoxX = 100
      const statsBoxWidth = canvas.width - 200

      // Draw rounded rectangle for stats container
      const drawRoundedRect = (x, y, width, height, radius) => {
        ctx.beginPath()
        ctx.moveTo(x + radius, y)
        ctx.lineTo(x + width - radius, y)
        ctx.quadraticCurveTo(x + width, y, x + width, y + radius)
        ctx.lineTo(x + width, y + height - radius)
        ctx.quadraticCurveTo(
          x + width,
          y + height,
          x + width - radius,
          y + height
        )
        ctx.lineTo(x + radius, y + height)
        ctx.quadraticCurveTo(x, y + height, x, y + height - radius)
        ctx.lineTo(x, y + radius)
        ctx.quadraticCurveTo(x, y, x + radius, y)
        ctx.closePath()
      }

      // Fill stats container with rounded corners
      ctx.fillStyle = 'rgba(35, 134, 54, 0.1)'
      drawRoundedRect(statsBoxX, statsBoxY, statsBoxWidth, statsBoxHeight, 15)
      ctx.fill()

      // Stroke stats container with rounded corners
      ctx.strokeStyle = 'rgba(35, 134, 54, 0.3)'
      ctx.lineWidth = 3
      drawRoundedRect(statsBoxX, statsBoxY, statsBoxWidth, statsBoxHeight, 15)
      ctx.stroke()

      // Stats (larger)
      ctx.fillStyle = '#238636'
      ctx.font = 'bold 88px Arial, sans-serif' // Increased from 72px
      ctx.fillText(`${completedDays}/${totalDays}`, canvas.width / 2, 630)

      ctx.fillStyle = '#e6edf3'
      ctx.font = '36px Arial, sans-serif' // Increased from 28px
      ctx.fillText('DAYS COMPLETED', canvas.width / 2, 675)

      ctx.fillStyle = '#238636'
      ctx.font = 'bold 78px Arial, sans-serif' // Increased from 64px
      ctx.fillText(`${completionPercentage}%`, canvas.width / 2, 760)

      ctx.fillStyle = '#7d8590'
      ctx.font = '32px Arial, sans-serif' // Increased from 24px
      ctx.fillText('CONSISTENCY', canvas.width / 2, 800)

      // Progress bar (larger)
      const barWidth = 700 // Increased from 600
      const barHeight = 25 // Increased from 20
      const barX = (canvas.width - barWidth) / 2
      const barY = 820

      // Bar background
      ctx.fillStyle = '#21262d'
      ctx.fillRect(barX, barY, barWidth, barHeight)
      ctx.strokeStyle = '#30363d'
      ctx.lineWidth = 2
      ctx.strokeRect(barX, barY, barWidth, barHeight)

      // Progress fill
      const fillWidth = (completedDays / totalDays) * barWidth
      const progressGradient = ctx.createLinearGradient(
        barX,
        0,
        barX + fillWidth,
        0
      )
      progressGradient.addColorStop(0, '#238636')
      progressGradient.addColorStop(1, '#2ea043')
      ctx.fillStyle = progressGradient
      ctx.fillRect(barX, barY, fillWidth, barHeight)

      // Motivational message (larger and with proper spacing)
      const messages = {
        100: "Perfect streak! You're unstoppable! ",
        90: "Outstanding dedication! You're on fire! ",
        80: 'Amazing consistency! Keep Growing! ',
      }

      let message = messages[100]
      if (completionPercentage >= 90 && completionPercentage < 100) {
        message = messages[90]
      } else if (completionPercentage >= 80 && completionPercentage < 90) {
        message = messages[80]
      }

      ctx.fillStyle = '#e6edf3'
      ctx.font = '38px Arial, sans-serif' // Increased from 32px
      ctx.fillText(message, canvas.width / 2, 930) // Moved down from 900 to add gap

      // Duration badge with proper background coverage and border radius
      const badgeText = `${totalDays} DAY CHALLENGE`
      ctx.font = 'bold 36px Arial, sans-serif' // Increased from 28px

      // Measure text to get proper dimensions
      const textMetrics = ctx.measureText(badgeText)
      const textWidth = textMetrics.width
      const textHeight = 36 // Approximate font size
      const padding = 20

      // Draw badge background with proper coverage and rounded corners
      const badgeWidth = textWidth + padding * 2
      const badgeHeight = textHeight + padding * 1.5
      const badgeX = (canvas.width - badgeWidth) / 2
      const badgeY = 980 // Moved down from 950 to accommodate message spacing

      // Draw rounded rectangle for badge
      ctx.fillStyle = '#238636'
      drawRoundedRect(badgeX, badgeY, badgeWidth, badgeHeight, 12)
      ctx.fill()

      // Add border to badge with rounded corners
      ctx.strokeStyle = '#2ea043'
      ctx.lineWidth = 2
      drawRoundedRect(badgeX, badgeY, badgeWidth, badgeHeight, 12)
      ctx.stroke()

      // Draw badge text
      ctx.fillStyle = '#ffffff'
      ctx.fillText(
        badgeText,
        canvas.width / 2,
        badgeY + badgeHeight / 2 + textHeight / 3
      )

      // Footer (larger and repositioned)
      ctx.fillStyle = '#7d8590'
      ctx.font = '26px Arial, sans-serif' // Increased from 20px
      ctx.fillText(
        'Built with discipline, one day at a time',
        canvas.width / 2,
        1110
      ) // Moved down

      // Join the movement (larger)
      ctx.fillStyle = '#58a6ff'
      ctx.font = '30px Arial, sans-serif' // Increased from 24px
      ctx.fillText('Start your habit journey today! ', canvas.width / 2, 1180) // Moved down

      // Convert to blob and create URL
      canvas.toBlob(
        (blob) => {
          const url = URL.createObjectURL(blob)
          setShareUrl(url)
          setIsGenerating(false)
        },
        'image/png',
        1.0
      )
    } catch (error) {
      console.error('Error generating share image:', error)
      setIsGenerating(false)
    }
  }

  const shareToWhatsApp = () => {
    const text = `🎉 Just completed my ${totalDays}-day habit challenge with ${completionPercentage}% consistency!\n\n"${habit.name}" - ${completedDays}/${totalDays} days completed!\n\nBuilding better habits, one day at a time 💪\n\n#HabitTracker #Discipline #Growth`

    if (shareUrl) {
      // For mobile, try to share the image
      if (
        navigator.share &&
        navigator.canShare &&
        navigator.canShare({
          files: [
            new File([shareUrl], 'achievement.png', { type: 'image/png' }),
          ],
        })
      ) {
        fetch(shareUrl)
          .then((r) => r.blob())
          .then((blob) => {
            const file = new File([blob], 'achievement.png', {
              type: 'image/png',
            })
            navigator.share({
              title: 'My Habit Achievement!',
              text: text,
              files: [file],
            })
          })
      } else {
        // Fallback to WhatsApp web with text only
        const encodedText = encodeURIComponent(text)
        window.open(`https://wa.me/?text=${encodedText}`, '_blank')
      }
    } else {
      // No image, just share text
      const encodedText = encodeURIComponent(text)
      window.open(`https://wa.me/?text=${encodedText}`, '_blank')
    }
  }

  const shareToInstagram = () => {
    if (shareUrl) {
      // Download the image for Instagram sharing
      const link = document.createElement('a')
      link.href = shareUrl
      link.download = `habit-achievement-${habit.name.replace(/\s+/g, '-')}.png`
      link.click()

      // Open Instagram
      setTimeout(() => {
        window.open('https://www.instagram.com/', '_blank')
      }, 500)
    }
  }

  const downloadImage = () => {
    if (shareUrl) {
      const link = document.createElement('a')
      link.href = shareUrl
      link.download = `habit-achievement-${habit.name.replace(/\s+/g, '-')}.png`
      link.click()
    }
  }

  if (!isShareWorthy()) {
    return null
  }

  return (
    <div className={styles.shareContainer}>
      <button
        className={styles.shareButton}
        onClick={generateShareImage}
        disabled={isGenerating}
      >
        {isGenerating ? (
          <>
            <div className={styles.spinner}></div>
            Generating...
          </>
        ) : (
          <>
            <svg
              width='16'
              height='16'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
            >
              <path d='M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8' />
              <polyline points='16,6 12,2 8,6' />
              <line x1='12' y1='2' x2='12' y2='15' />
            </svg>
            Share Achievement
          </>
        )}
      </button>

      {shareUrl && (
        <div className={styles.shareOptions}>
          <button className={styles.shareOption} onClick={shareToWhatsApp}>
            <svg width='16' height='16' viewBox='0 0 24 24' fill='currentColor'>
              <path d='M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.382' />
            </svg>
            WhatsApp
          </button>

          <button className={styles.shareOption} onClick={shareToInstagram}>
            <svg width='16' height='16' viewBox='0 0 24 24' fill='currentColor'>
              <path d='M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z' />
            </svg>
            Instagram
          </button>

          <button className={styles.shareOption} onClick={downloadImage}>
            <svg
              width='16'
              height='16'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
            >
              <path d='M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4' />
              <polyline points='7,10 12,15 17,10' />
              <line x1='12' y1='15' x2='12' y2='3' />
            </svg>
            Download
          </button>
        </div>
      )}
    </div>
  )
}
