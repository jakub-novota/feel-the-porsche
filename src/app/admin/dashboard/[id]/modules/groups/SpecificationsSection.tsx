import { ChangeEvent } from 'react';
import { Car } from '@/app/cars/Modules/CarInterface';
interface SpecificationsSectionProps {
    car: Car;
    formData: Car;
    handleChange: (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
}

export default function SpecificationsSection({ car, formData, handleChange }: SpecificationsSectionProps): JSX.Element {
    return (
        <div className="border border-gray-300 rounded p-4">
            <h2 className="text-lg font-semibold mb-2">Specifications</h2>
            <p className="">
                <span className="font-medium">ID:</span> {car._id}
            </p>
            <p className="mb-4">
                <span className="font-medium">Name:</span> {car.name}
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
    );
}
