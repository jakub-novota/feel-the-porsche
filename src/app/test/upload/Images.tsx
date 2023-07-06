import { useEffect, useState } from 'react';

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
    <div>
      <h1>Image Gallery</h1>
      {images.length > 0 ? (
        <div>
          {images.map((imageUrl, index) => (
            <div key={index}>
              <img src={imageUrl} alt={`Image ${index}`} />
              <button onClick={() => handleDeleteImage(imageUrl)}>Delete</button>
            </div>
          ))}
        </div>
      ) : (
        <p>No images found.</p>
      )}
    </div>
  );
}
