import React, { useEffect, useState } from 'react';
import CarFormGallery from './CarFormGallery';
import CarFormImageCars from './CarFormImageCars';
import CarFormImage from './CarFormImage';
import CarFormDetails from './CarFormDetails';
import { useParams } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';
import { useMemo } from 'react';

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

const CarFormContent: React.FC = () => {
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


    const params = useParams();
    const carId = params.id;
    const [isSaveDisabled, setIsSaveDisabled] = useState(true);
    // useState to hold error message if an error occurs during car data fetching or submission
    const [errorMessage, setErrorMessage] = useState('');
    // useState to hold deleted file names (images)
    const [deletedFiles, setDeletedFiles] = useState<string[]>([]);
    // useState to hold selected files (images) for car
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [errorMessages, setErrorMessages] = useState<string[]>([]);




    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            // Deleting the files
            const deletePromises = deletedFiles.map(async (file) => {
                const deleteResponse = await fetch(`http://localhost:3001/photos/${file}`, {
                    method: 'DELETE'
                });
                if (!deleteResponse.ok) {
                    const errorData = await deleteResponse.json();
                    throw new Error(errorData.message);
                }
                console.log(`Deleted file: ${file}`);
            });
            // Execute all the delete promises
            await Promise.all(deletePromises);
            // Uploading the files
            const uploadPromises = selectedFiles.map(async (file) => {
                const formData = new FormData();
                formData.append('photo', file);
                const uploadResponse = await fetch('http://localhost:3001/photos/upload', {
                    method: 'POST',
                    body: formData
                });
                if (!uploadResponse.ok) {
                    const errorData = await uploadResponse.json();
                    throw new Error(errorData.message);
                }
                const uploadData = await uploadResponse.json();
                return uploadData.fileName;
            });
            // Execute all the upload promises
            const uploadedFileNames = await Promise.all(uploadPromises);
            console.log('Images uploaded successfully:', uploadedFileNames);
            setDeletedFiles([]);
            setSelectedFiles([]);
            const originalGallery = { ...carData.gallery };
            const originalImageCars = { ...carData.image_cars };
            const originalImage = carData.image || '';
            const updatedCarData = {
                ...carData,
                gallery: originalGallery,
                image_cars: originalImageCars,
                image: originalImage,
            };
            const response = await fetch(`/api/cars/${carId}`, {
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

            console.log('Car updated successfully');
        } catch (error) {
            const errorMessage = (error as Error).message;
            setErrorMessage(`Error updating car: ${errorMessage}`);
        }
    };




    const handleDelete = (key: string, type: 'gallery' | 'image_cars' | 'image') => {
        setDeletedFiles([]);
        setCarData((prevData) => {
            const updatedGallery = { ...prevData.gallery };
            const updatedImageCars = { ...prevData.image_cars };

            let updatedImage = prevData.image || '';
            let deletedFile = '';

            if (type === 'gallery') {
                deletedFile = prevData.gallery?.[key] || '';
                updatedGallery[key] = '';
            } else if (type === 'image_cars') {
                deletedFile = prevData.image_cars?.[key] || '';
                updatedImageCars[key] = '';
            } else if (type === 'image') {
                deletedFile = prevData.image || '';
                updatedImage = '';
            }

            setDeletedFiles((prevDeletedFiles) => [...prevDeletedFiles, deletedFile]);
            //console.log(`Deleted file ${key}:`, deletedFile);

            return {
                ...prevData,
                gallery: updatedGallery,
                image_cars: updatedImageCars,
                image: updatedImage,
            };
        });
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`/api/cars/${carId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const responseData = await response.json();
                const fetchedCarData = responseData.car;
                setCarData({ ...fetchedCarData, });
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);



    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, type: 'image_cars' | 'gallery' | 'image') => {
        const { name, files } = event.target;
        const file = files?.[0];

        if (file) {
            const fileExtension = file.name.split('.').pop();
            const fileName = uuidv4() + '.' + fileExtension;


            const newFile = new File([file], fileName, { type: file.type }); // Create a new file with the new name
            setSelectedFiles((prev) => [...prev, newFile]); // Add new file to the selectedFiles state

            setCarData((prevData) => ({
                ...prevData,
                [type]: type === 'image'
                    ? fileName
                    : {
                        ...prevData[type],
                        [name]: fileName
                    },
            }));
        }

    };



    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        handleFileChange(event, 'image');
    };

    const handleImageCarsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        handleFileChange(event, 'image_cars');
    };

    const handleGalleryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        handleFileChange(event, 'gallery');
    };


    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setCarData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Add useMemo hooks to calculate number of valid URLs for each image type
    const numGalleryImages = useMemo(() => {
        if (carData.gallery) {
            return Object.values(carData.gallery).filter(url => url && url.trim() !== '').length;
        }
        return 0;
    }, [carData]);

    const numCoverImages = useMemo(() => {
        if (carData.image_cars) {
            return Object.values(carData.image_cars).filter(url => url && url.trim() !== '').length;
        }
        return 0;
    }, [carData]);

    const isMainImageValid = useMemo(() => carData.image && carData.image.trim() !== '', [carData]);

    React.useEffect(() => {
        const errorMessages: string[] = [];

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
        } = carData;

        // Check if name, description, model, body, fuel, transmission, drive, capacity, mileage, year, acceleration, cylinder_capacity, power_PS, power_HP, and max_speed are given
        const isNameValid = typeof name === 'string' && name.trim() !== '';
        const isDescriptionValid = typeof description === 'string' && description.trim() !== '';
        const isModelValid = typeof model === 'string' && model.trim() !== '';
        const isBodyValid = typeof body === 'string' && body.trim() !== '';
        const isFuelValid = typeof fuel === 'string' && fuel.trim() !== '';
        const isTransmissionValid = typeof transmission === 'string' && transmission.trim() !== '';
        const isDriveValid = typeof drive === 'string' && drive.trim() !== '';

        const isCapacityValid = capacity && capacity > 0;
        const isMileageValid = mileage && mileage > 0;
        const isYearValid = year && year > 0;
        const isAccelerationValid = acceleration && acceleration > 0;
        const isCylinderCapacityValid = cylinder_capacity && cylinder_capacity > 0;
        const isPowerPSValid = power_PS && power_PS > 0;
        const isPowerHPValid = power_HP && power_HP > 0;
        const isMaxSpeedValid = max_speed && max_speed > 0;


        // Update image validation to store error messages
        if (!isMainImageValid) errorMessages.push('Main image is required.');
        if (numCoverImages < 2) errorMessages.push('At least 2 cover images are required.');
        if (numGalleryImages < 4) errorMessages.push('At least 4 gallery images are required.');



        setErrorMessages(errorMessages);
        setIsSaveDisabled(errorMessages.length > 0);
    }, [carData]);

    return (
        <form onSubmit={handleSubmit}>
            <CarFormImage
                carData={carData}
                handleImageChange={handleImageChange}
                handleDelete={handleDelete}
            />

            <h2 className="text-2xl font-bold mb-2">Gallery:</h2>
            <CarFormGallery
                carData={carData}
                handleGalleryChange={handleGalleryChange}
                handleDelete={handleDelete}
            />

            <h2 className="text-2xl font-bold mb-2">Image Cars:</h2>
            <CarFormImageCars
                carData={carData}
                handleImageCarsChange={handleImageCarsChange}
                handleDelete={handleDelete}
            />

            <CarFormDetails carData={carData} handleInputChange={handleInputChange} />


            <div className='w-full flex justify-end'>
                <button
                    type="submit"
                    className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-4 ${isSaveDisabled ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                    disabled={isSaveDisabled}
                >
                    Save
                </button>
            </div>
            <div>
                {errorMessages.length > 0 && (
                    <ul className="text-red-500 mt-2">
                        {errorMessages.map((message, index) => (
                            <li key={index}>{message}</li>
                        ))}
                    </ul>
                )}
                {/* Add the image count indicators */}
                <div className="text-gray-500 mt-2">
                    <p className={isMainImageValid ? 'text-green-500' : 'text-red-500'}>
                        Number Gallery Image: {isMainImageValid ? '1' : '0'}/1
                    </p>
                    <p className={numCoverImages >= 2 ? 'text-green-500' : 'text-red-500'}>
                        Number of Cover Images: {numCoverImages}/2
                    </p>
                    <p className={numGalleryImages >= 4 ? 'text-green-500' : 'text-red-500'}>
                        Number of Gallery Images {numGalleryImages}/4
                    </p>
                </div>
            </div>
        </form>
    );
};

export default CarFormContent;
