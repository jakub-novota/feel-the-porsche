import { ChangeEvent } from 'react';
import { Car } from '@/app/cars/Modules/CarInterface';
interface PeformanceAndSpecs {
    car: Car;
    formData: Car;
    handleChange: (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
}

export default function PeformanceAndSpecs({ car, formData, handleChange }: PeformanceAndSpecs): JSX.Element {
    return (
        <div>
            <h2 className="text-[26px] mb-4">Performance And Specs</h2>
            <div className="border border-gray-300 space-y-[20px] rounded-[10px] p-[20px]">
                <div className="">
                    <label htmlFor="acceleration" className="text-[#313131]">
                        Acceleration:
                    </label>
                    <div className="relative">
                        <input
                            type="number"
                            id="acceleration"
                            name="acceleration"
                            value={formData.acceleration}
                            onChange={handleChange}
                            className="border border-gray-300 rounded-[10px] px-3 py-2 w-full"
                        />
                        <span className="absolute top-2 right-8 text-gray-500">0-100km/h</span>
                    </div>
                </div>

                <div className="">
                    <label htmlFor="cylinder_capacity" className="text-[#313131]">
                        Cylinder Capacity:
                    </label>
                    <div className="relative">

                        <input
                            type="number"
                            id="cylinder_capacity"
                            name="cylinder_capacity"
                            value={formData.cylinder_capacity}
                            onChange={handleChange}
                            className="border border-gray-300 rounded px-3 py-2 w-full"
                        />
                        <span className="absolute top-2 right-8 text-gray-500">liter</span>
                    </div>
                </div>

                <div className='flex justify-between   space-x-[20px]  '>
                    <div className="  flex  flex-col">
                        <label htmlFor="power_PS" className="text-[#313131]">
                            Power (PS):
                        </label>
                        <div className="relative">

                            <input
                                type="number"
                                id="power_PS"
                                name="power_PS"
                                value={formData.power_PS}
                                onChange={handleChange}
                                className="border border-gray-300  px-3 py-2 w-auto rounded-[10px]"
                            />
                            <span className="absolute top-2 right-8 text-gray-500">PS</span>
                        </div>
                    </div>

                    <div className=" flex flex-col ">
                        <label htmlFor="power_HP" className=" text-[#313131]">
                            Power (HP):
                        </label>
                        <div className="relative">
                            <input
                                type="number"
                                id="power_HP"
                                name="power_HP"
                                value={formData.power_HP}
                                onChange={handleChange}
                                className="border border-gray-300 rounded-[10px] px-3 py-2 w-auto "
                            />
                            <span className="absolute top-2 right-8 text-gray-500">HP</span>
                        </div>

                    </div>

                    <div className="  flex flex-col ">
                        <label htmlFor="max_speed" className="text-[#313131]">
                            Max Speed:
                        </label>
                        <div className="relative">
                            <input
                                type="number"
                                id="max_speed"
                                name="max_speed"
                                value={formData.max_speed}
                                onChange={handleChange}
                                className="border border-gray-300 rounded-[10px] px-3 py-2 w-auto"
                            />
                            <span className="absolute top-2 right-8 text-gray-500">km/h</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
