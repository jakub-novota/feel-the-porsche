import { useState, ChangeEvent } from 'react';
import { Car } from '@/app/cars/Modules/CarInterface';
import SpecificationsSection from './groups/SpecificationsSection';
import AdditionalDetailsSection from './groups/AdditionalDetailsSection';
import PowerAndSpeed from './groups/PowerAndSpeed';
import PeformanceAndSpecs from './groups/PerformanceAndSpecs';
import DetailsAndDescription from './groups/DetailsAndDescription';
import ImagesAndGallery from './groups/ImagesAndGallery';

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
            <h1 className="text-3xl font-bold mb-4">Car Details</h1>
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
