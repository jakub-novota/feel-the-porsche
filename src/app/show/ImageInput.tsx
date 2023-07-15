import React, { useState, ChangeEvent } from 'react';

const ImageInput: React.FC = () => {
  const [selectedImages, setSelectedImages] = useState<string[]>([]);

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>, index: number) => {
    const file = event.target.files?.[0];
    if (file) {
      const newImages = [...selectedImages];
      newImages[index] = URL.createObjectURL(file);
      setSelectedImages(newImages);
    }
  };

  return (
    <div>
      <div>
        <label htmlFor="image1">Image 1:</label>
        <input
          type="file"
          id="image1"
          accept="image/*"
          onChange={(event) => handleImageChange(event, 0)}
        />
        {selectedImages[0] && <img src={selectedImages[0]} alt="Image 1" />}
      </div>
      <div>
        <label htmlFor="image2">Image 2:</label>
        <input
          type="file"
          id="image2"
          accept="image/*"
          onChange={(event) => handleImageChange(event, 1)}
        />
        {selectedImages[1] && <img src={selectedImages[1]} alt="Image 2" />}
      </div>
      <div>
        <label htmlFor="image3">Image 3:</label>
        <input
          type="file"
          id="image3"
          accept="image/*"
          onChange={(event) => handleImageChange(event, 2)}
        />
        {selectedImages[2] && <img src={selectedImages[2]} alt="Image 3" />}
      </div>
      <div>
        <label htmlFor="image4">Image 4:</label>
        <input
          type="file"
          id="image4"
          accept="image/*"
          onChange={(event) => handleImageChange(event, 3)}
        />
        {selectedImages[3] && <img src={selectedImages[3]} alt="Image 4" />}
      </div>
    </div>
  );
};

export default ImageInput;
