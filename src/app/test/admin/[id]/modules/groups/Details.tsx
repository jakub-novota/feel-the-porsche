import { ChangeEvent } from 'react';
import { Car } from '@/app/cars/Modules/CarInterface';
interface Details {
    car: Car;
    formData: Car;
    handleChange: (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
}

export default function Details({ car, formData, handleChange }: Details): JSX.Element {
    return (
        <div className="border border-gray-300 rounded-[10px] p-[20px]">
            <h2 className="text-lg font-semibold mb-2">Details</h2>
          

            <div className="mb-4">
                <label htmlFor="capacity" className="text-[#313131]">
                    Capacity:
                </label>
                <input
                    type="number"
                    id="capacity"
                    name="capacity"
                    value={formData.capacity}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-[10px] px-3 py-2 w-full"
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
                    <option value="Manual">Manual</option>
                    <option value="Automatic">Automatic</option>
                </select>

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
        </div>
    );
}
