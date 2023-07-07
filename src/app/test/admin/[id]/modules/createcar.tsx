import { useState, ChangeEvent } from 'react';
import { Car } from '@/app/cars/Modules/CarInterface';
import SpecificationsSection from './groups/SpecificationsSection';
import AdditionalDetailsSection from './groups/AdditionalDetailsSection';
import PowerAndSpeed from './groups/PowerAndSpeed';
import PeformanceAndSpecs from './groups/PerformanceAndSpecs';
import DetailsAndDescription from './groups/DetailsAndDescription';
import ImagesAndGallery from './groups/ImagesAndGallery';
import Link from 'next/link';

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
    };



    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex items-center mb-4">
                <div className='flex flex-col'>
                    <Link
                        className="text-[#00b300] hover:text-[#008000] font-medium cursor-pointer"
                        href={"./"}
                    >Back</Link>
                    <h1 className="text-3xl font-bold ">Car Details</h1>
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
                    <PowerAndSpeed car={car} formData={formData} handleChange={handleChange} />
                    <PeformanceAndSpecs car={car} formData={formData} handleChange={handleChange} />
                    <DetailsAndDescription car={car} formData={formData} handleChange={handleChange} />
                    <ImagesAndGallery car={car} formData={formData} handleChange={handleChange} />
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-4"
                >
                    Save
                </button>
            </form>
        </div>
    );
}
