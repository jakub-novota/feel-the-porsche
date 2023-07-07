import { useState, ChangeEvent } from 'react';
import { Car } from '@/app/cars/Modules/CarInterface';

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
                    <div className="border border-gray-300 rounded p-4">
                        <h2 className="text-lg font-semibold mb-2">Specifications</h2>
                        <p className="mb-4">
                            <span className="font-medium">ID:</span> {car.id}
                        </p>
                        <div className="mb-4">
                            <label htmlFor="power_PS" className="font-medium">
                                Power (PS):
                            </label>
                            <input
                                type="number"
                                id="power_PS"
                                name="power_PS"
                                value={formData.power_PS}
                                onChange={handleChange}
                                className="border border-gray-300 rounded px-3 py-2 w-full"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="power_HP" className="font-medium">
                                Power (HP):
                            </label>
                            <input
                                type="number"
                                id="power_HP"
                                name="power_HP"
                                value={formData.power_HP}
                                onChange={handleChange}
                                className="border border-gray-300 rounded px-3 py-2 w-full"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="max_speed" className="font-medium">
                                Max Speed:
                            </label>
                            <input
                                type="number"
                                id="max_speed"
                                name="max_speed"
                                value={formData.max_speed}
                                onChange={handleChange}
                                className="border border-gray-300 rounded px-3 py-2 w-full"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="transmission" className="font-medium">
                                Transmission:
                            </label>
                            <select
                                id="transmission"
                                name="transmission"
                                value={formData.transmission}
                                onChange={handleChange}
                                className="border border-gray-300 rounded px-3 py-2 w-full"
                            >
                                <option value="manual">Manual</option>
                                <option value="automatic">Automatic</option>
                            </select>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="acceleration" className="font-medium">
                                Acceleration:
                            </label>
                            <input
                                type="number"
                                id="acceleration"
                                name="acceleration"
                                value={formData.acceleration}
                                onChange={handleChange}
                                className="border border-gray-300 rounded px-3 py-2 w-full"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="year" className="font-medium">
                                Year:
                            </label>
                            <input
                                type="number"
                                id="year"
                                name="year"
                                value={formData.year}
                                onChange={handleChange}
                                className="border border-gray-300 rounded px-3 py-2 w-full"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="capacity" className="font-medium">
                                Capacity:
                            </label>
                            <input
                                type="number"
                                id="capacity"
                                name="capacity"
                                value={formData.capacity}
                                onChange={handleChange}
                                className="border border-gray-300 rounded px-3 py-2 w-full"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="drive" className="font-medium">
                                Drive:
                            </label>
                            <input
                                type="text"
                                id="drive"
                                name="drive"
                                value={formData.drive}
                                onChange={handleChange}
                                className="border border-gray-300 rounded px-3 py-2 w-full"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="description" className="font-medium">
                                Description:
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                className="border border-gray-300 rounded px-3 py-2 w-full"
                            />
                        </div>
                    </div>
                    <div className="border border-gray-300 rounded p-4">
                        <h2 className="text-lg font-semibold mb-2">Additional Details</h2>
                        <div className="mb-4">
                            <label htmlFor="cylinder_capacity" className="font-medium">
                                Cylinder Capacity:
                            </label>
                            <input
                                type="number"
                                id="cylinder_capacity"
                                name="cylinder_capacity"
                                value={formData.cylinder_capacity}
                                onChange={handleChange}
                                className="border border-gray-300 rounded px-3 py-2 w-full"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="model" className="font-medium">
                                Model:
                            </label>
                            <input
                                type="text"
                                id="model"
                                name="model"
                                value={formData.model}
                                onChange={handleChange}
                                className="border border-gray-300 rounded px-3 py-2 w-full"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="body" className="font-medium">
                                Body:
                            </label>
                            <input
                                type="text"
                                id="body"
                                name="body"
                                value={formData.body}
                                onChange={handleChange}
                                className="border border-gray-300 rounded px-3 py-2 w-full"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="mileage" className="font-medium">
                                Mileage:
                            </label>
                            <input
                                type="text"
                                id="mileage"
                                name="mileage"
                                value={formData.mileage}
                                onChange={handleChange}
                                className="border border-gray-300 rounded px-3 py-2 w-full"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="fuel" className="font-medium">
                                Fuel:
                            </label>
                            <select
                                id="fuel"
                                name="fuel"
                                value={formData.fuel}
                                onChange={handleChange}
                                className="border border-gray-300 rounded px-3 py-2 w-full"
                            >
                                <option value="gasoline">Gasoline</option>
                                <option value="diesel">Diesel</option>
                                <option value="electric">Electric</option>
                            </select>
                        </div>
                    </div>
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
