import React from 'react';

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
type HandleDeleteFunction = (key: string, type: 'gallery' | 'image_cars') => void;


interface CarFormGalleryProps {
    carData: Car;
    handleGalleryChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleDelete: HandleDeleteFunction;
}

const CarFormGallery: React.FC<CarFormGalleryProps> = ({ carData, handleGalleryChange, handleDelete }) => {
    const { gallery } = carData;

    return (
        <div>
            {carData.gallery &&
                Object.entries(carData.gallery).map(([key, value]) => (
                    <div key={key} className="mb-4">
                        <label className="block mb-2">
                            Gallery {key}:
                            <input
                                type="file"
                                accept="image/*"
                                name={key}
                                onChange={handleGalleryChange}
                                className="mt-1"
                            />
                        </label>
                        <p>{value}</p>
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
