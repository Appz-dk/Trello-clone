"use client"

import { useState, useEffect } from "react"
import { useFormStatus } from "react-dom";
import { Check, Loader2 } from "lucide-react";
import Image from "next/image"
import Link from "next/link"

import { cn } from "@/lib/utils";
import { FormErrors } from "./form-errors";
import { useFetchImages } from "@/hooks/use-fetch-images";

type Props = {
  id: string;
  errors?: Record<string, string[] | undefined>
}

export const FormPicker: React.FC<Props> = ({ id, errors }) => {
  const { fetchImages, images, isLoading } = useFetchImages()
  const { pending } = useFormStatus()
  const [selectedImageId, setSelectedImageId] = useState<string | null>(null)

  // Fetch images on first render
  useEffect(() => {
    (async () => {
      await fetchImages();
    })();
  }, [])



  if (isLoading) {
    return (
      <div className="grid place-items-center p-6">
        <Loader2 className="h-6 w-6 animate-spin text-sky-700"/>
      </div>
    )
  }

  return (
    <div>
      <div className="grid grid-cols-3 gap-2">
        {images.map(img => (
          <div 
            key={img.id} 
            className={cn("relative aspect-video bg-muted cursor-pointer hover:opacity-75 transition group", pending && "opacity-50 hover:opacity-50 cursor-auto")}
            onClick={() => {
              if (pending) return
              setSelectedImageId(img.id)
            }}
          >
            {/* Hidden input field */}
            <input 
              id={id}
              name={id}
              className="hidden"
              type="radio"
              checked={selectedImageId === img.id}
              disabled={pending}
              readOnly
              value={JSON.stringify({
                imageId: img.id,
                imageThumbUrl: img.urls.thumb,
                imageFullUrl: img.urls.full,
                imageLinkHTML: img.links.html,
                imageUserName: img.user.name,
              })}
            />
            {/* Image */}
            <Image 
              fill
              sizes="auto"
              src={img.urls.thumb} 
              alt={img.alt_description || "Unsplash image with no alt description, sorry"}
              className="rounded-md object-cover"
            />
            {/* Link to author of image - Unsplash guidelines */}
            <Link
              href={img.links.html}
              target="_blank"
              className="absolute bottom-0 w-full p-1 text-[8px] leading-tight truncate text-white opacity-0 hover:underline group-hover:opacity-100 bg-black/50"
            >
              {img.user.username}
            </Link>
            {/* Checkmark to show selected image */}
            {selectedImageId === img.id && (
              <div className="absolute right-1 top-1 p-[1px] rounded-full grid place-items-center bg-green-700">
                <Check className="h-[12px] w-[12px] text-white"/>
              </div>
            )}
          </div>
        ))}
      </div>
      {/* Field errors */}
      <FormErrors id={id} errors={errors} />
    </div>
  )
}