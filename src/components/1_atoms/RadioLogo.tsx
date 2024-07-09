// React
import { useEffect, useMemo, useState } from 'react'

// Types
import { RadioLogoType } from '@typage/mainType'

// Libs
import { loadImage } from '@/libs/mainLib'

const RadioLogo: RadioLogoType = ({ logo, imgPath }) => {
  // States
  const [imageUrl, setImageUrl] = useState<string>('')

  const loadImages = useMemo(
    () => async () => {
      try {
        // Get image base64 file
        const base64Image = await loadImage({ nameStr: logo, imgPath: `${imgPath}logos/` })

        // Set state image base64
        setImageUrl(base64Image)
      } catch (error) {
        console.error('☹️ Error loading image:', error)
      }
    },
    [logo, imgPath]
  )

  // Use IntersectionObserver to trigger image loading
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          loadImages()
          observer.disconnect()
        }
      })
    })

    // Using optional chaining (?.) to safely access querySelector result
    const imgElement = document.querySelector('.radioLogo img')
    if (imgElement) {
      observer.observe(imgElement)
    }

    return () => {
      observer.disconnect()
    }
  }, [loadImages])

  return (
    <div className="radioLogo">
      <img src={imageUrl} alt={`logo_${logo}`} loading="lazy" />
    </div>
  )
}

export default RadioLogo
