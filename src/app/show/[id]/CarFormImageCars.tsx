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
type HandleDeleteFunction = (key: string, type: 'gallery' | 'image_cars' | 'image') => void;


interface CarFormImageCarsProps {
    carData: Car;
    handleImageCarsChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleDelete: HandleDeleteFunction;
}

const CarFormImageCars: React.FC<CarFormImageCarsProps> = ({ carData, handleImageCarsChange, handleDelete }) => {
    return (
        <div>
            {carData.image_cars &&
                Object.entries(carData.image_cars).map(([key, value]) => (
                    <div key={key} className="mb-4">
                        <label className="block mb-2">
                            Image Car {key}:
                            <input
                                type="file"
                                accept="image/*"
                                name={key}
                                onChange={handleImageCarsChange}
                                className="mt-1"
                            />
                        </label>
                        <p>{value}</p>
                        {value && (
                            <button
                                type="button"
                                onClick={() => handleDelete(key, 'image_cars')}
                                disabled={!value}
                                className="text-red-500 mt-2"
                            >
                                Delete
                            </button>
                        )}
                    </div>
                ))}
        </div>
    );
};

export default CarFormImageCars;
