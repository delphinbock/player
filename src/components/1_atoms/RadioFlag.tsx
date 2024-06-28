// React
import { useEffect, useState } from 'react'

// Types
import { RadioFlagType } from '@typage/mainType'

// Libs
import { loadImage } from '@/libs/mainLib'

// RadioFlag component
const RadioFlag: RadioFlagType = ({ flag, imgPath }) => {
  // States
  const [imageUrl, setImageUrl] = useState<string>('')

  useEffect(() => {
    const loadImages = async () => {
      try {
        // Get image base64 file
        const base64Image = await loadImage({ nameStr: flag, imgPath: `${imgPath}flags/` })

        // Set state image base64
        setImageUrl(base64Image)
      } catch (error) {
        console.error('☹️ Error loading image:', error)
      }
    }
    loadImages()
  }, [flag, imgPath])

  return <img className="radioFlag" src={imageUrl} alt={`flag_${flag}`} loading="lazy" />
}

export default RadioFlag
