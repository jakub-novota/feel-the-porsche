import React, { useState } from 'react';

interface Car {
    id?: number;
    name?: string;
    power_PS?: number;
    power_HP?: number;
    max_speed?: number;
    transmission?: string;
    acceleration?: number;
    year?: number;
    capacity?: number;
    drive?: string;
    description?: string;
    cylinder_capacity?: number;
    model?: string;
    body?: string;
    mileage?: number;
    fuel?: string;
    image?: string;
    image_cars?: {
        [key: string]: string | undefined;
    };
    gallery?: {
        [key: string]: string | undefined;
    };
}
type HandleDeleteFunction = (key: string, type: 'gallery' | 'image_cars' | 'image') => void;


interface CarFormGalleryProps {
    carData: Car;
    handleGalleryChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleDelete: HandleDeleteFunction;
}


const CarFormGallery: React.FC<CarFormGalleryProps> = ({ carData, handleGalleryChange, handleDelete }) => {
    const [previewImages, setPreviewImages] = useState<{ [key: string]: string | undefined }>({});
    const [changedImages, setChangedImages] = useState<{ [key: string]: boolean }>({});

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name } = event.target;

        if (changedImages[name]) {
            alert('Image can only be changed once.');
            return;
        }

        handleGalleryChange(event);

        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0];
            const reader = new FileReader();

            reader.onloadend = () => {
                setPreviewImages(prevState => ({ ...prevState, [name]: reader.result as string }));
                setChangedImages(prevState => ({ ...prevState, [name]: true }));
            };

            reader.readAsDataURL(file);
        }
    }

    return (
        <div>
            {carData.gallery &&
                Object.entries(carData.gallery).map(([key, value]) => (
                    <div key={key} className="mb-4">
                        <label className="block mb-2">
                            Gallery {key}:
                            {!value && !changedImages[key] && (
                                <input
                                    type="file"
                                    accept="image/*"
                                    name={key}
                                    onChange={handleImageChange}
                                    className="mt-1"
                                />
                            )}
                        </label>
                        <p>{value}</p>
                        {previewImages[key] && <img src={previewImages[key]} alt="Preview" style={{ height: '100px', width: '100px' }} />}
                        {value && (
                            <button type="button" onClick={() => handleDelete(key, 'gallery')}>
                                Delete
                            </button>
                        )}
                    </div>
                ))}
        </div>
    );
};

export default CarFormGallery;
