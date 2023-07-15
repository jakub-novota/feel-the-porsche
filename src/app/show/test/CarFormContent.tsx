import React, { useEffect, useState } from 'react';
import CarFormGallery from './CarFormGallery';
import CarFormImageCars from './CarFormImageCars';
import CarFormImage from './CarFormImage';
import CarFormDetails from './CarFormDetails';
import Gallery from '@/app/cars/Modules/DetalCover';


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

    const [errorMessage, setErrorMessage] = useState('');
    const [deletedFiles, setDeletedFiles] = useState<string[]>([]); //Ukaze vymazane obrazky

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


        //Tu vypiše ako array deleted files podla tohot potom sa bude dat deeltnut s apiny !!!!
        // rest of the code ...

        console.log('Deleted files:', deletedFiles);
        deletedFiles.forEach((file, index) => {
            console.log(`Deleted file ${index + 1}:`, file);
        });


        // Clear the deletedFiles array after submission
        setDeletedFiles([]);

        try {


            // Tu ukaze vsetky nove selected subory /obrazky podla tohoto s bude dat upludnut nove obrazky na apinu !!!
            for (const key in carData.gallery) {
                if (carData.gallery.hasOwnProperty(key)) {
                    const fileInput = document.querySelector(`input[name="${key}"]`) as HTMLInputElement;
                    if (fileInput?.files && fileInput.files.length > 0) {
                        const selectedFile = fileInput.files[0];
                        console.log(`Selected file for ${key}:`, selectedFile);
                    }
                }
            }

            console.log('Car data:', carData);

            const originalGallery = { ...carData.gallery };
            const originalImageCars = { ...carData.image_cars };
            const originalImage = carData.image || '';

            const updatedGallery = { ...originalGallery };
            const updatedImageCars = { ...originalImageCars };
            let updatedImage: string | undefined = originalImage;

            // Log selected files
            for (const key in carData.gallery) {
                if (carData.gallery.hasOwnProperty(key)) {
                    const fileInput = document.querySelector(`input[name="${key}"]`) as HTMLInputElement;
                    if (fileInput?.files && fileInput.files.length > 0) {
                        const selectedFile = fileInput.files[0];
                        console.log(`Selected file for ${key}:`, selectedFile.name);
                    }
                }
            }


            const updatedCarData = {
                ...carData,
                gallery: updatedGallery,
                image_cars: updatedImageCars,
                image: updatedImage,
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

            console.log('Car updated successfully');

            // Rest of the code for uploading images...
        } catch (error) {
            const errorMessage = (error as Error).message;
            setErrorMessage('Error updating car: ' + errorMessage);
        }
    };


    const handleDelete = (key: string, type: 'gallery' | 'image_cars') => {
        setCarData((prevData) => {
            const updatedGallery = { ...prevData.gallery };
            const updatedImageCars = { ...prevData.image_cars };

            let deletedFile = '';

            if (type === 'gallery') {
                deletedFile = prevData.gallery?.[key] || '';
                updatedGallery[key] = '';
            } else if (type === 'image_cars') {
                deletedFile = prevData.image_cars?.[key] || '';
                updatedImageCars[key] = '';

                const inputField = document.querySelector(`input[name="${key}"]`) as HTMLInputElement;
                if (inputField) {
                    inputField.value = '';
                    updatedImageCars[key] = inputField.dataset.previousValue || '';
                }
            }

            setDeletedFiles(prevDeletedFiles => [...prevDeletedFiles, deletedFile]);
            console.log(`Deleted file ${key}:`, deletedFile);

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

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setCarData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    return (
        <form onSubmit={handleSubmit}>
            <CarFormImage
                carData={carData}
                handleImageChange={handleImageChange}
                handleDeleteImage={() => setCarData((prevData) => ({ ...prevData, image: '' }))}
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
                handleDelete={(key: string) => handleDelete(key, 'image_cars')}
            />

            <CarFormDetails carData={carData} handleInputChange={handleInputChange} />



            <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
            >
                Update Car
            </button>
        </form>
    );
};

export default CarFormContent;
