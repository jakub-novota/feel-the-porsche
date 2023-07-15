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


interface CarFormImageProps {
    carData: Car;
    handleImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleDeleteImage: () => void;
}

const CarFormImage: React.FC<CarFormImageProps> = ({ carData, handleImageChange, handleDeleteImage }) => {
    return (
        <div className="mb-4">
            <label className="block mb-2">
                Car Image:
                <input
                    type="file"
                    accept="image/*"
                    name="image"
                    onChange={handleImageChange}
                    className="mt-1"
                />
            </label>
            {carData.image && (
                <div className="flex items-center">
                    <p className="mr-2">{carData.image.split('/').pop()}</p>
                    <button
                        type="button"
                        onClick={handleDeleteImage}
                        className="text-red-500"
                    >
                        Delete
                    </button>
                </div>
            )}
        </div>
    );
};

export default CarFormImage;
