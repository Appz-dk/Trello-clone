import { useState } from "react"

import { unsplash } from "@/lib/unsplash"
import { Random } from "unsplash-js/dist/methods/photos/types"

import { defaultIamges } from "@/constants/images"

export const useFetchImages = () => {
  const env = process.env.NODE_ENV
  const [images, setImages] = useState<Random[]>(defaultIamges)
  const [isLoading, setIsLoading] = useState(true)
  
  const fetchImages = async () => {
    if (env === "development") {
      // If we are in development, we just use the defaultImages instead of fetching anything.
      setIsLoading(false)
    } else {
      try {
        const result = await unsplash.photos.getRandom({
          // 317099 is the collectionIds that trello also uses
          collectionIds: ["317099"],
          count: 9
        })
  
        if (result && result.response ) {
          // TODO: Could throw an error if images is not an array.
          const fetchedImages = result.response as Random[]
          setImages(fetchedImages)
        } else {
          throw new Error("Failed to get images from Unsplash")
        }
      } catch (error) {
        console.log("fetchImages Error", error)
        setImages(defaultIamges)
      } finally {
        setIsLoading(false)
      }
    }
  }

  return {
    images,
    isLoading,
    fetchImages
  }
}