import React, { useState, useEffect } from 'react';
import API_BASE_URL from '@/app/config';


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

interface CarFormImageProps {
    carData: Car;
    handleImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleDelete: HandleDeleteFunction;
}


const CarFormImage: React.FC<CarFormImageProps> = ({ carData, handleImageChange, handleDelete }) => {
    const [previewImage, setPreviewImage] = useState<string | null>(null);

    useEffect(() => {
        if (carData.image) {
            setPreviewImage(`${API_BASE_URL}/photos/${encodeURIComponent(carData.image)}`);
        }
    }, [carData]);

    const handlePreview = (event: React.ChangeEvent<HTMLInputElement>) => {
        handleImageChange(event);

        if (event.target.files && event.target.files.length > 0) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result as string);
            };
            reader.readAsDataURL(event.target.files[0]);
        } else {
            setPreviewImage(carData.image ? `${API_BASE_URL}/photos/${encodeURIComponent(carData.image)}` : null);
        }
    }

    return (
        <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Car Image</h3>
            <div className="mt-4">
                {previewImage ? (
                    <div className="relative aspect-w-1 aspect-h-1 w-[150px] h-[100px] bg-gray-200 rounded">
                        <img
                            src={previewImage}
                            alt="Selected Image"
                            className="w-full h-full object-cover rounded"
                        />
                        <button
                            onClick={() => {
                                handleDelete('', 'image');
                                setPreviewImage(null);
                            }}
                            className="mt-2 bg-red-500 hover:bg-red-700 transition duration-500 text-white px-2 py-1 rounded absolute bottom-2 right-2"
                        >
                            Delete
                        </button>
                    </div>
                ) : (
                    <div className="relative h-[100px] w-[150px] bg-gray-200 rounded flex items-center justify-center">
                        <input
                            id="image-upload"
                            type="file"
                            accept="image/*"
                            name="image"
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            onChange={handlePreview}
                        />
                        <label htmlFor="image-upload" className="cursor-pointer">
                            Choose Image
                        </label>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CarFormImage;
