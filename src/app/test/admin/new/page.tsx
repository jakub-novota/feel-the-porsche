"use client"
import { useState, ChangeEvent } from 'react';
import { Car } from '@/app/cars/Modules/CarInterface';
import Link from 'next/link';
import Description from './modules/Description';
import Details from './modules/Details';
import PerformanceAndSpecs from './modules/PeformanceAndSpecs';

export default function CarForm(): JSX.Element {
    const [formData, setFormData] = useState<Car>({
        id: 0,
        name: '',
        description: '',
        power_PS: 0,
        power_HP: 0,
        max_speed: 0,
        transmission: '',
        acceleration: 0,
        year: 0,
        capacity: 0,
        drive: '',
        cylinder_capacity: 0,
        model: '',
        body: '',
        mileage: 0,
        fuel: '',
        image: '',
        image_cars: {
            "1": "",
            "2": "",
            "3": "",
            "4": "",
        },
        gallery: {
            "1": "",
            "2": "",
            "3": "",
            "4": "",
        },
    });

    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log('Form data:', formData);
        // Perform any other actions with the form data
        try {
            const response = await fetch('/api/cars', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Failed to create car');
            }

            const data = await response.json();
            console.log('Car created:', data);
            // Optionally, you can redirect to a success page or perform any other actions
        } catch (error) {
            console.error('Error creating car:', error);
            // Handle the error
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex items-center mb-4">
                <Link
                    className="text-[#00b300] hover:text-[#008000] text-[14px] cursor-pointer"
                    href={"./"}
                >
                    <div className='w-[40px] h-[40px] border rounded-[5px] mr-[10px] flex justify-center items-center'>
                        <p className='text-gray-400'>←</p>
                    </div>
                </Link>
                <div className='flex flex-col'>
                    <Link
                        className="text-[#00b300] hover:text-[#008000] text-[14px] cursor-pointer"
                        href={"./"}
                    >
                        Back To Admin
                    </Link>
                    <h1 className="text-3xl font-bold ">Edit Car</h1>
                </div>
            </div>
            <div className='mb-[20px]'>
                <p className="">
                    <span className="font-medium">Name:</span>
                </p>
                <p className="">
                    <span className="font-medium">ID:</span>
                </p>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className='space-y-[40px]'>
                        <Description formData={formData} handleChange={handleChange} />
                        <Details formData={formData} handleChange={handleChange} />
                    </div>
                    <div className=''>
                        <div className='space-y-[40px]'>
                            <PerformanceAndSpecs formData={formData} handleChange={handleChange} />
                        </div>
                        <div className='flex'>
                            <div className='w-full flex justify-start'>
                                <button
                                    type="submit"
                                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-4"
                                >
                                    Discard
                                </button>
                            </div>
                            <div className='w-full flex justify-end'>
                                <button
                                    type="submit"
                                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-4"
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
