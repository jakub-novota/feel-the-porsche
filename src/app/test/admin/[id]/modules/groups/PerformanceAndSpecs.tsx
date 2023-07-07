import { ChangeEvent } from 'react';
import { Car } from '@/app/cars/Modules/CarInterface';
interface PeformanceAndSpecs {
    car: Car;
    formData: Car;
    handleChange: (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
}

export default function PeformanceAndSpecs({ car, formData, handleChange }: PeformanceAndSpecs): JSX.Element {
    return (
        <div className="border border-gray-300 rounded p-4">
            <h2 className="text-lg font-semibold mb-2">Performance And Specs</h2>
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
        </div>
    );
}
