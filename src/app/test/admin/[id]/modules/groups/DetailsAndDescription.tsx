import { ChangeEvent } from 'react';
import { Car } from '@/app/cars/Modules/CarInterface';
interface DetailsAndDescription {
    car: Car;
    formData: Car;
    handleChange: (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
}

export default function DetailsAndDescription({ car, formData, handleChange }: DetailsAndDescription): JSX.Element {
    return (
        <div className="border border-gray-300 rounded p-4">
            <h2 className="text-lg font-semibold mb-2">Details And Description</h2>
            <div className="mb-4">
                <label htmlFor="description" className="font-medium">
                    Description:
                </label>
                <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="border border-gray-300 rounded px-3 py-2 w-full min-h-[200px]"
                />
            </div>
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
                    <option value="Gasoline">Gasoline</option>
                    <option value="Diesel">Diesel</option>
                    <option value="Electric">Electric</option>
                </select>
            </div>
        </div>
    );
}
