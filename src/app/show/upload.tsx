import { useState, ChangeEvent, useEffect } from 'react';
import Image from 'next/image';

export default function ImageGallery() {
  const [file, setFile] = useState<File | null>(null);
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    fetchImages();
  }, []);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] as File | undefined;
    setFile(selectedFile || null);
  };

  const handleUpload = async () => {
    if (!file) {
      alert('Please select a file.');
      return;
    }

    const formData = new FormData();
    formData.append('photo', file);

    try {
      const response = await fetch('http://localhost:3001/photos/upload', {
        method: 'POST',
        body: formData,
      });
      if (response.ok) {
        const data = await response.json();
        alert(data.message);
        fetchImages(); // Refresh the image gallery after successful upload
      } else {
        const error = await response.json();
        alert(error.message);
      }
    } catch (error) {
      console.error('Error uploading photo:', error);
      alert('An error occurred while uploading the photo.');
    }
  };

  const fetchImages = async () => {
    try {
      const response = await fetch('http://localhost:3001/photos');
      if (response.ok) {
        const data = await response.json();
        setImages(data.photos);
      } else {
        console.error('Failed to fetch images:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  return (
    <div>
      <h1>Image Gallery</h1>
      <div>
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleUpload}>Upload</button>
      </div>
      {images.map((filename, index) => (
        <div className="relative w-[500px] h-[350px]" key={filename}>
          <Image src={`http://localhost:3001/photos/${filename}`} fill alt={filename} />
        </div>
      ))}
    </div>
  );
}
