import { ChangeEvent } from 'react';
import { Car } from '@/app/cars/Modules/CarInterface';
interface PowerAndSpeed {
    car: Car;
    formData: Car;
    handleChange: (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
}

export default function PowerAndSpeed({ car, formData, handleChange }: PowerAndSpeed): JSX.Element {
    return (
        <div className="border border-gray-300 rounded p-4">
            <h2 className="text-lg font-semibold mb-2">Power And Speed</h2>
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
        </div>
    );
}
