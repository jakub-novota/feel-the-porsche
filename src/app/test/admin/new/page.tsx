"use client"
import React, { useState, ChangeEvent } from 'react';
import { Car } from '@/app/cars/Modules/CarInterface';
import Link from 'next/link';
import Description from './modules/Description';
import Details from './modules/Details';
import PerformanceAndSpecs from './modules/PeformanceAndSpecs';
import CoverImage from './modules/CoverImatges';
import GalleryImages from './modules/GalleryImages';
import Frontpage from './modules/FrontPageImage';

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
            '1': '',
            '2': '',
            '3': '',
            '4': '',
        },
        gallery: {
            '1': '',
            '2': '',
            '3': '',
            '4': '',
        },
    });

    const [isSaveDisabled, setIsSaveDisabled] = useState(true);
    const [errorMessages, setErrorMessages] = useState<string[]>([]);

    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setFormData((prevFormData: Car) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // Validation check for image URLs in image_cars
        const imageCarsUrls = Object.values(formData.image_cars);
        if (imageCarsUrls.filter(url => url.trim() !== '').length !== 2) {
            setErrorMessages(['Please provide exactly 2 image URLs for image_cars']);
            return;
        }

        // Validation check for image URLs in gallery
        const galleryUrls = Object.values(formData.gallery);
        if (galleryUrls.filter(url => url.trim() !== '').length !== 4) {
            setErrorMessages(['Please provide exactly 4 image URLs for gallery']);
            return;
        }

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

    // Enable or disable the Save button based on form validation
    React.useEffect(() => {
        const imageCarsUrls = Object.values(formData.image_cars);
        const galleryUrls = Object.values(formData.gallery);
        const isImageValid = formData.image.trim() !== '';
        const isImageCarsValid = imageCarsUrls.filter(url => url.trim() !== '').length >= 2;
        const isGalleryValid = galleryUrls.filter(url => url.trim() !== '').length >= 4;
        setIsSaveDisabled(!(isImageValid && isImageCarsValid && isGalleryValid));
    }, [formData]);



    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex items-center mb-4">
                <Link className="text-[#00b300] hover:text-[#008000] text-[14px] cursor-pointer" href={'./'}>
                    <div className="w-[40px] h-[40px] border rounded-[5px] mr-[10px] flex justify-center items-center">
                        <p className="text-gray-400">←</p>
                    </div>
                </Link>
                <div className="flex flex-col">
                    <Link className="text-[#00b300] hover:text-[#008000] text-[14px] cursor-pointer" href={'./'}>
                        Back To Admin
                    </Link>
                    <h1 className="text-3xl font-bold ">Edit Car</h1>
                </div>
            </div>
            <div className="mb-[20px]">
                <p className="">
                    <span className="font-medium">Name:</span>
                </p>
                <p className="">
                    <span className="font-medium">ID:</span>
                </p>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-[40px]">
                        <Description formData={formData} handleChange={handleChange} />
                        <Details formData={formData} handleChange={handleChange} />
                    </div>
                    <div className="">
                        <div className="space-y-[40px]">
                            <PerformanceAndSpecs formData={formData} handleChange={handleChange} />
                            <Frontpage formData={formData} handleChange={handleChange} />
                            <CoverImage formData={formData} handleChange={handleChange} />
                            <GalleryImages formData={formData} handleChange={handleChange} />
                        </div>
                        <div className="flex">
                            <div className="w-full flex justify-start">
                                <button
                                    type="submit"
                                    className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-4 ${isSaveDisabled ? 'opacity-50 cursor-not-allowed' : ''
                                        }`}
                                    disabled={isSaveDisabled}
                                >
                                    Discard
                                </button>
                            </div>
                            <div className="w-full flex justify-end">
                                <button
                                    type="submit"
                                    className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-4 ${isSaveDisabled ? 'opacity-50 cursor-not-allowed' : ''
                                        }`}
                                    disabled={isSaveDisabled}
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                        {errorMessages.length > 0 && (
                            <ul className="text-red-500 mt-2">
                                {errorMessages.map((message, index) => (
                                    <li key={index}>{message}</li>
                                ))}
                            </ul>
                        )}
                        <div className="text-gray-500 mt-2">
                            <p className={formData.image.trim() !== '' ? 'text-green-500' : 'text-red-500'}>
                                Number of image URLs in image: {formData.image.trim() !== '' ? '1' : '0'}/1
                            </p>
                            <p className={Object.values(formData.image_cars).filter(url => url.trim() !== '').length >= 2 ? 'text-green-500' : 'text-red-500'}>
                                Number of image URLs in image_cars: {Object.values(formData.image_cars).filter(url => url.trim() !== '').length}/2
                            </p>
                            <p className={Object.values(formData.gallery).filter(url => url.trim() !== '').length >= 4 ? 'text-green-500' : 'text-red-500'}>
                                Number of image URLs in gallery: {Object.values(formData.gallery).filter(url => url.trim() !== '').length}/4
                            </p>
                        </div>

                    </div>
                </div>
            </form>
        </div>
    );
}
