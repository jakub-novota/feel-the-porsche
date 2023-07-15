"use client"


import React, { useEffect, useState } from 'react';

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

const CarForm: React.FC = () => {
    const [carData, setCarData] = useState<Car>({
        image: '',
        gallery: {
            '1': '',
            '2': '',
            '3': '',
            '4': '',
        },
        image_cars: {
            '1': '',
            '2': '',
            '3': '',
            '4': '',
        },
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
    });

    const [errorMessage, setErrorMessage] = useState('');

    const handleGalleryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name } = event.target;
        const file = event.target.files?.[0];
        const fileName = file ? file.name : carData.gallery?.[name] || '';

        // Check if the value is explicitly deleted
        const isDeleted = event.target.value === '';
        const updatedValue = isDeleted ? '' : fileName || carData.gallery?.[name] || '';

        setCarData((prevData) => ({
            ...prevData,
            gallery: {
                ...prevData.gallery,
                [name]: updatedValue,
            },
        }));
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            const updatedGallery = { ...carData.gallery };
            for (const key in updatedGallery) {
                if (!updatedGallery[key]) {
                    updatedGallery[key] = carData.gallery?.[key] || '';
                }
            }

            const updatedCarData = {
                ...carData,
                gallery: updatedGallery,
            };

            const response = await fetch('/api/cars/64b16552ab5e5b22d7d249c1', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedCarData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message);
            }

            const responseData = await response.json();
            console.log('Car updated successfully:', responseData.car);
        } catch (error) {
            const errorMessage = (error as Error).message;
            setErrorMessage('Error updating car: ' + errorMessage);
        }
    };

    const handleDelete = (key: string) => {
        setCarData((prevData) => {
            const updatedGallery = { ...prevData.gallery };
            const updatedImageCars = { ...prevData.image_cars };

            // Clear the value from the corresponding input field
            updatedGallery[key] = '';
            updatedImageCars[key] = '';

            // Reset the file input field value
            const inputField = document.querySelector(`input[name="${key}"]`) as HTMLInputElement;
            if (inputField) {
                inputField.value = '';
                updatedGallery[key] = inputField.dataset.previousValue || '';
            }

            return {
                ...prevData,
                gallery: updatedGallery,
                image_cars: updatedImageCars,
            };
        });
    };

    const carId = '64b16552ab5e5b22d7d249c1';

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`/api/cars/${carId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const responseData = await response.json();
                const fetchedCarData = responseData.car;

                // Create a new gallery object with keys formatted as strings
                const formattedGallery: { [key: string]: string } = {};
                for (const key in fetchedCarData.gallery) {
                    formattedGallery[String(key)] = fetchedCarData.gallery[key];
                }

                setCarData({
                    ...fetchedCarData,
                    gallery: formattedGallery,
                    image_cars: fetchedCarData.image_cars || {
                        '1': '',
                        '2': '',
                        '3': '',
                        '4': '',
                    },
                });
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handleImageCarsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name } = event.target;
        const file = event.target.files?.[0];
        const fileName = file ? file.name : '';
        setCarData((prevData) => ({
            ...prevData,
            image_cars: {
                ...prevData.image_cars,
                [name]: fileName,
            },
        }));
    };

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        const fileName = file ? file.name : '';
        setCarData((prevData) => ({
            ...prevData,
            image: fileName,
        }));
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setCarData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Car Form</h1>
            {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
            <form onSubmit={handleSubmit}>
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
                                onClick={() => setCarData((prevData) => ({ ...prevData, image: '' }))}
                                className="text-red-500"
                            >
                                Delete
                            </button>
                        </div>
                    )}
                </div>

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
                            {value && (
                                <div className="flex items-center">
                                    <p className="mr-2">{value}</p>
                                    <button
                                        type="button"
                                        onClick={() => handleDelete(key)}
                                        disabled={!value}
                                        className="text-red-500"
                                    >
                                        Delete
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}

                <h2 className="text-2xl font-bold mb-2">Image Cars:</h2>
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
                            {value && (
                                <div className="flex items-center">
                                    <p className="mr-2">{value.split('/').pop()}</p>
                                    <button
                                        type="button"
                                        onClick={() => handleDelete(key)}
                                        disabled={!value}
                                        className="text-red-500"
                                    >
                                        Delete
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}

                <h2 className="text-2xl font-bold mb-2">Car Details:</h2>
                <div className="mb-4">
                    <label className="block mb-2">
                        Name:
                        <input
                            type="text"
                            name="name"
                            value={carData.name}
                            onChange={handleInputChange}
                            className="mt-1 p-2 border rounded w-full"
                        />
                    </label>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                        <label className="block mb-2">
                            Power (PS):
                            <input
                                type="number"
                                name="power_PS"
                                value={carData.power_PS}
                                onChange={handleInputChange}
                                className="mt-1 p-2 border rounded w-full"
                            />
                        </label>
                    </div>
                    <div>
                        <label className="block mb-2">
                            Power (HP):
                            <input
                                type="number"
                                name="power_HP"
                                value={carData.power_HP}
                                onChange={handleInputChange}
                                className="mt-1 p-2 border rounded w-full"
                            />
                        </label>
                    </div>
                </div>
                {/* Add other input fields for car details */}

                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
                >
                    Update Car
                </button>
            </form>
        </div>
    );
};

export default CarForm;
