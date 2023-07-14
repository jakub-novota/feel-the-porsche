import { useState, ChangeEvent, useEffect } from 'react';
import Image from 'next/image';

export default function ImageGallery() {
  const [file, setFile] = useState<File | null>(null);
  const [images, setImages] = useState<string[]>([]);
  const [uploadMessage, setUploadMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    fetchImages();
  }, []);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] as File | undefined;
    setFile(selectedFile || null);
  };

  const handleUpload = async () => {
    if (!file) {
      return;
    }

    setUploadMessage(null); // Reset the upload message
    setErrorMessage(null); // Reset the error message

    const formData = new FormData();
    formData.append('photo', file);

    try {
      const response = await fetch('http://localhost:3001/photos/upload', {
        method: 'POST',
        body: formData,
      });
      if (response.ok) {
        const data = await response.json();
        fetchImages(); // Refresh the image gallery after successful upload
        setUploadMessage(data.message); // Set the upload message
      } else {
        const error = await response.json();
        setErrorMessage(error.message); // Set the error message
      }
    } catch (error) {
      console.log('Error uploading photo:', error);
      setErrorMessage('An error occurred while uploading the photo.');
    }
  };

  const handleDelete = async (filename: string) => {
    try {
      const response = await fetch(`http://localhost:3001/photos/${filename}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        const data = await response.json();
        fetchImages(); // Refresh the image gallery after successful deletion
        setUploadMessage(data.message); // Set the delete message
      } else {
        const error = await response.json();
        setErrorMessage(error.message); // Set the error message
      }
    } catch (error) {
      console.log('Error deleting photo:', error);
      setErrorMessage('An error occurred while deleting the photo.');
    }
  };

  const fetchImages = async () => {
    try {
      const response = await fetch('http://localhost:3001/photos');
      if (response.ok) {
        const data = await response.json();
        setImages(data.photos);
      } else {
        console.log('Failed to fetch images:', response.statusText);
        setErrorMessage('Failed to fetch images.');
      }
    } catch (error) {
      console.log('Error fetching images:', error);
      setErrorMessage('Error fetching images.');
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Image Gallery</h1>
      <div className="flex items-center space-x-4 mb-8">
        <input type="file" onChange={handleFileChange} className="p-2 border border-gray-300 rounded" />
        <button onClick={handleUpload} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Upload
        </button>
      </div>
      {uploadMessage && (
        <p className="bg-green-200 text-green-800 py-2 px-4 rounded mb-4">{uploadMessage}</p>
      )}
      {errorMessage && (
        <p className="bg-red-200 text-red-800 py-2 px-4 rounded mb-4">{errorMessage}</p>
      )}
      <div className="grid grid-cols-3 gap-4">
        {images.map((filename, index) => (
          <div key={filename} className="relative">
            <Image
              src={`http://localhost:3001/photos/${filename}`}
              width={500}
              height={350}
              objectFit="cover"
              alt={filename}
              className="rounded"
            />
            <button
              onClick={() => handleDelete(filename)}
              className="absolute top-2 right-2 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
