// React
import { useEffect, useState } from 'react'

// Types
import { RadioLogoType } from '@typage/mainType'

// Libs
import { loadImage } from '@/libs/mainLib'

const RadioLogo: RadioLogoType = ({ logo, imgPath }) => {
  // States
  const [imageUrl, setImageUrl] = useState<string>('')

  useEffect(() => {
    const loadImages = async () => {
      try {
        // Get image base64 file
        const base64Image = await loadImage({ nameStr: logo, imgPath: `${imgPath}logos/` })

        // Set state image base64
        setImageUrl(base64Image)
      } catch (error) {
        console.error('☹️ Error loading image:', error)
      }
    }
    loadImages()
  }, [logo, imgPath])

  return (
    <div className='radioLogo'>
      <img src={imageUrl} alt={`logo_${logo}`} loading="lazy" />
    </div>
  )
}

export default RadioLogo
