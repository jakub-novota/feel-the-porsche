"use client"
import { useEffect, useState } from 'react';
import Image from 'next/image';



export function ImageGallery() {
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    fetch('/api/upload')
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setImages(data.images);
        } else {
          console.error('Error retrieving images:', data.message);
        }
      })
      .catch((error) => {
        console.error('Error retrieving images:', error);
      });
  }, []);

  const handleDeleteImage = (imageUrl: string) => {
    fetch('/api/upload', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ imageUrl }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          // Remove the deleted image from the images array
          setImages((prevImages) => prevImages.filter((img) => img !== imageUrl));
        } else {
          console.error('Error deleting image:', data.message);
        }
      })
      .catch((error) => {
        console.error('Error deleting image:', error);
      });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Image Gallery</h1>
      {images.length > 0 ? (
        <div className="grid grid-cols-3 gap-4">
          {images.map((imageUrl, index) => (
            <div key={index} className="relative aspect-w-1 aspect-h-1">
              <div className=' w-[550px] h-[250px]'>
                <Image src={imageUrl} fill alt={`Image ${index}`} className="rounded" />
              </div>
              <button
                onClick={() => handleDeleteImage(imageUrl)}
                className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No images found.</p>
      )}
    </div>
  );
}
