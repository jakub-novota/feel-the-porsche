"use client"
import React, { useState, ChangeEvent, useEffect } from 'react';
import { Car } from '@/app/cars/Modules/CarInterface';
import Link from 'next/link';
import Description from './modules/Description';
import Details from './modules/Details';
import PerformanceAndSpecs from './modules/PeformanceAndSpecs';
import CoverImage from './modules/CoverImatges';
import GalleryImages from './modules/GalleryImages';
import FrontpageImage from './modules/FrontPageImage';


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
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);

    useEffect(() => {
        // Disable scrolling when the modal is open
        if (showSuccessModal || showErrorModal) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [showSuccessModal, showErrorModal]);


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
            //console.log('Car created:', data);
            setShowSuccessModal(true);
        } catch (error) {
            console.error('Error creating car:', error);
            setShowErrorModal(true);
            // Handle the error
        }
    };


    //console.log(formData)

    React.useEffect(() => {
        const {
            name,
            description,
            image,
            image_cars,
            gallery,
            model,
            body,
            fuel,
            transmission,
            drive,
            capacity,
            mileage,
            year,
            acceleration,
            cylinder_capacity,
            power_PS,
            power_HP,
            max_speed
        } = formData;

        // Check if name, description, model, body, fuel, transmission, drive, capacity, mileage, year, acceleration, cylinder_capacity, power_PS, power_HP, and max_speed are given
        const isNameValid = typeof name === 'string' && name.trim() !== '';
        const isDescriptionValid = typeof description === 'string' && description.trim() !== '';
        const isModelValid = typeof model === 'string' && model.trim() !== '';
        const isBodyValid = typeof body === 'string' && body.trim() !== '';
        const isFuelValid = typeof fuel === 'string' && fuel.trim() !== '';
        const isTransmissionValid = typeof transmission === 'string' && transmission.trim() !== '';
        const isDriveValid = typeof drive === 'string' && drive.trim() !== '';
        const isCapacityValid = capacity > 0;
        const isMileageValid = mileage > 0;
        const isYearValid = year > 0;
        const isAccelerationValid = acceleration > 0;
        const isCylinderCapacityValid = cylinder_capacity > 0;
        const isPowerPSValid = power_PS > 0;
        const isPowerHPValid = power_HP > 0;
        const isMaxSpeedValid = max_speed > 0;

        // Check if image and image_cars have exactly 2 URLs
        const imageCarsUrls = Object.values(image_cars);
        const isImageCarsValid = imageCarsUrls.filter(url => url.trim() !== '').length === 2;

        // Check if gallery has exactly 4 URLs
        const galleryUrls = Object.values(gallery);
        const isGalleryValid = galleryUrls.filter(url => url.trim() !== '').length === 4;

        setIsSaveDisabled!(
            !(
                isNameValid &&
                isDescriptionValid &&
                isModelValid &&
                isBodyValid &&
                isFuelValid &&
                isTransmissionValid &&
                isDriveValid &&
                isCapacityValid &&
                isMileageValid &&
                isYearValid &&
                isAccelerationValid &&
                isCylinderCapacityValid &&
                isPowerPSValid &&
                isPowerHPValid &&
                isMaxSpeedValid &&
                isImageCarsValid &&
                isGalleryValid
            )
        );

    }, [formData]);




    const handleDiscard = () => {
        window.location.reload(); // Refresh the page
    };

    const handleModalClose = () => {
        setShowSuccessModal(false);
        setShowErrorModal(false);
    };
    return (
        <div className="container mx-auto px-4 py-8">
            {showSuccessModal && (
                <div className="fixed inset-0 flex items-center justify-center z-10 bg-black bg-opacity-50 w-full h-full">
                    <div className="bg-white rounded-lg p-6 w-80">
                        <h2 className="text-2xl mb-4">Success!</h2>
                        <p className="text-gray-600">Car created successfully.</p>
                        <button
                            className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
                            onClick={handleModalClose}
                        >
                            <Link href={"/admin"}>
                                Close
                            </Link>
                        </button>
                    </div>
                </div>
            )}

            {/* Error Modal */}
            {showErrorModal && (
                <div className="fixed inset-0 flex items-center justify-center z-10">
                    <div className="bg-white rounded-lg p-6 w-80">
                        <h2 className="text-2xl mb-4">Error!</h2>
                        <p className="text-red-600">Failed to create car.</p>
                        <button
                            className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
                            onClick={handleModalClose}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}

            <div className="flex items-center mb-4">
                <Link className="text-[#00b300] hover:text-[#008000] text-[14px] cursor-pointer" href={'/admin'}>
                    <div className="w-[40px] h-[40px] border rounded-[5px] mr-[10px] flex justify-center items-center">
                        <p className="text-gray-400">←</p>
                    </div>
                </Link>
                <div className="flex flex-col">
                    <Link className="text-[#00b300] hover:text-[#008000] text-[14px] cursor-pointer" href={'/admin'}>
                        Back To Admin
                    </Link>
                    <h1 className="text-3xl font-bold ">Edit Car</h1>
                </div>
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
                            <FrontpageImage formData={formData} handleChange={handleChange} />
                            <CoverImage formData={formData} handleChange={handleChange} />
                            <GalleryImages formData={formData} handleChange={handleChange} />
                        </div>
                        <div className="flex">
                            <div className="w-full flex justify-start">
                                <button
                                    type="button"
                                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-4"
                                    onClick={handleDiscard}
                                >
                                    Discard
                                </button>
                            </div>
                            <div className="w-full flex justify-end">
                                <button
                                    type="submit"
                                    className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-4 ${isSaveDisabled ? 'opacity-50 cursor-not-allowed' : ''
                                        }`}
                                    disabled={false}
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
                                Number Gallery Image: {formData.image.trim() !== '' ? '1' : '0'}/1
                            </p>
                            <p className={Object.values(formData.image_cars).filter(url => url.trim() !== '').length >= 2 ? 'text-green-500' : 'text-red-500'}>
                                Number of Cover Images: {Object.values(formData.image_cars).filter(url => url.trim() !== '').length}/2
                            </p>
                            <p className={Object.values(formData.gallery).filter(url => url.trim() !== '').length >= 4 ? 'text-green-500' : 'text-red-500'}>
                                Number of Gallery Images {Object.values(formData.gallery).filter(url => url.trim() !== '').length}/4
                            </p>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
