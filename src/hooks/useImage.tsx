import { useEffect, useState } from "react"

const useImageLoad = (imageUrl: string) => {
     const [loading, setLoading] = useState<boolean>(true)

     useEffect(() => {
          const img = new Image()
          img.src = imageUrl
          img.onload = () => {
               setLoading(false)
          }

          return (): void => {
               img.onload = null
          }
     }, [imageUrl])

     return {
          loadState: loading,
     }
}

export { useImageLoad }
