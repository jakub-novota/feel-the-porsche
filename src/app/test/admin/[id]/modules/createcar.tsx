"use client"
import { useState } from 'react';

interface FormData {
    name: string;
    power_PS: number;
    power_HP: number;
    max_speed: number;
    transmission: string;
    acceleration: number;
    year: number;
    capacity: number;
    drive: string;
    description: string;
    cylinder_capacity: number;
    model: string;
    body: string;
    mileage: number;
    fuel: string;
    image: string;
    image_cars: { [key: string]: string };
    gallery: { [key: string]: string };
}

export default function CreateCarForm(): JSX.Element {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        power_PS: 0,
        power_HP: 0,
        max_speed: 0,
        transmission: '',
        acceleration: 0,
        year: 0,
        capacity: 0,
        drive: '',
        description: '',
        cylinder_capacity: 0,
        model: '',
        body: '',
        mileage: 0,
        fuel: '',
        image: '',
        image_cars: {},
        gallery: {},
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };



    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Perform form submission or API call with formData
        console.log(formData);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-4 text-center">Create New Item</h1>
            <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
                <div className="mb-4">
                    <label htmlFor="name" className="block mb-2">
                        Name:
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="border border-gray-400 px-4 py-2 rounded w-full"
                    />
                </div>
                {/* Add more input fields for other properties */}
                <div className="mb-4">
                    <label htmlFor="image" className="block mb-2">
                        Image:
                    </label>
                    <input
                        type="file"
                        id="image"
                        name="image"

                        className="border border-gray-400 px-4 py-2 rounded w-full"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="image_cars" className="block mb-2">
                        Image Cars:
                    </label>
                    <input
                        type="file"
                        id="image_cars"
                        name="image_cars"

                        className="border border-gray-400 px-4 py-2 rounded w-full"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="gallery" className="block mb-2">
                        Gallery:
                    </label>
                    <input
                        type="file"
                        id="gallery"
                        name="gallery"

                        className="border border-gray-400 px-4 py-2 rounded w-full"
                    />
                </div>
                <div className="flex justify-center">
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        Create Item
                    </button>
                </div>
            </form>
        </div>
    );
}
