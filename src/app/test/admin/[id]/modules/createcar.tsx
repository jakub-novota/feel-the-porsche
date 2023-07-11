import { useState, ChangeEvent } from 'react';
import { Car } from '@/app/cars/Modules/CarInterface';
import PeformanceAndSpecs from './groups/PerformanceAndSpecs';
import Details from './groups/Details';
import ImagesAndGallery from './groups/ImagesAndGallery';
import Link from 'next/link';
import Description from './groups/Description';
import Test from '../test/page';
import FrontPageImage from './groups/ImagesAndGallery/FrontpageImage';
import CoverImage from './groups/ImagesAndGallery/CoverImages';
import GalleryImages from './groups/ImagesAndGallery/GalleryImages';

interface CarFormProps {
    car: Car;
    onSubmit: (formData: Car) => void;
}

export default function CarForm({ car, onSubmit }: CarFormProps): JSX.Element {
    const [formData, setFormData] = useState<Car>(car);

    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSubmit(formData);
        window.location.reload(); // Refresh the page
    };

    //console.log('Images:', car.image, car.image_cars, car.gallery);

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
                    <span className="font-medium">Name:</span> {car.name}
                </p>
                <p className="">
                    <span className="font-medium">ID:</span> {car._id}
                </p>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className='space-y-[40px]'>
                        <Description car={car} formData={formData} handleChange={handleChange} />
                        <Details car={car} formData={formData} handleChange={handleChange} />
                    </div>
                    <div className=''>
                        <div className='space-y-[40px]'>
                            <FrontPageImage car={car} formData={formData} handleChange={handleChange} />
                            <CoverImage car={car} formData={formData} handleChange={handleChange} />
                            <GalleryImages car={car} formData={formData} handleChange={handleChange} />
                            <PeformanceAndSpecs car={car} formData={formData} handleChange={handleChange} />
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
