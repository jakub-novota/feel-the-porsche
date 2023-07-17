import React, { ChangeEvent } from 'react';


interface Car {
    id?: number;
    name?: string;
    power_PS?: number;
    power_HP?: number;
    max_speed?: number;
    transmission?: string;
    acceleration?: number;
    year?: number;
    capacity?: number;
    drive?: string;
    description?: string;
    cylinder_capacity?: number;
    model?: string;
    body?: string;
    mileage?: number;
    fuel?: string;
    image?: string;
    image_cars?: {
        [key: string]: string | undefined;
    };
    gallery?: {
        [key: string]: string | undefined;
    };
}

interface CarFormDetailsProps {
    carData: Car;
    handleInputChange: (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
}

const CarFormDetails: React.FC<CarFormDetailsProps> = ({ carData, handleInputChange }) => {
    return (
        <div>
            <h2 className="text-[26px] mb-4">Details</h2>
            <div className="border border-gray-300 rounded-[10px] p-[20px] space-y-[20px]">
                <div className=" space-y-[10px]">
                    <label htmlFor="model" className="text-[#313131]">
                        Model:
                    </label>
                    <input
                        type="text"
                        id="model"
                        name="model"
                        value={carData.model || ''}
                        onChange={handleInputChange}
                        className="border border-gray-300 rounded-[10px]  px-3 py-2 w-full"
                    />
                </div>
                <div className=" space-y-[10px]">
                    <label htmlFor="body" className="text-[#313131]">
                        Body:
                    </label>
                    <input
                        type="text"
                        id="body"
                        name="body"
                        value={carData.body || ''}
                        onChange={handleInputChange}
                        className="border border-gray-300 rounded-[10px]  px-3 py-2 w-full"
                    />
                </div>

                <div className="flex  justify-between  space-x-[20px] ">
                    <div className="flex flex-col  w-full space-y-[10px]">
                        <label htmlFor="fuel" className="text-[#313131]">
                            Fuel:
                        </label>
                        <select
                            id="fuel"
                            name="fuel"
                            value={carData.fuel || ''}
                            onChange={handleInputChange}
                            className="border border-gray-300 rounded-[10px]  px-3 py-2 w-full"
                        >
                            <option value="Gasoline">Gasoline</option>
                            <option value="Diesel">Diesel</option>
                            <option value="Electric">Electric</option>
                        </select>
                    </div>

                    <div className="flex flex-col  w-full space-y-[10px]">
                        <label htmlFor="transmission" className="text-[#313131]">
                            Transmission:
                        </label>
                        <select
                            id="transmission"
                            name="transmission"
                            value={carData.transmission || ''}
                            onChange={handleInputChange}
                            className="border border-gray-300 rounded-[10px]  px-3 py-2 w-full"
                        >
                            <option value="Manual">Manual</option>
                            <option value="Automatic">Automatic</option>
                        </select>
                    </div>




                    <div className="flex flex-col  w-full space-y-[10px]">
                        <label htmlFor="drive" className="text-[#313131]">
                            Drive:
                        </label>
                        <select
                            id="drive"
                            name="drive"
                            value={carData.drive || ''}
                            onChange={handleInputChange}
                            className="border border-gray-300 rounded-[10px]  px-3 py-2 w-full"
                        >
                            <option value="RWD">Rear-Wheel Drive (RWD)</option>
                            <option value="FWD">Front-Wheel Drive (FWD)</option>
                            <option value="AWD">All-Wheel Drive (AWD)</option>
                            <option value="4WD">Four-Wheel Drive (4WD)</option>
                            <option value="FR">Front-Engine, Rear-Wheel Drive (FR)</option>
                            <option value="MR">Mid-Engine, Rear-Wheel Drive (MR)</option>
                            <option value="FAWD">Front-Engine, All-Wheel Drive (FAWD)</option>
                        </select>
                    </div>
                </div>

                <div className="flex justify-between space-x-[20px]">
                    <div className="flex flex-col  w-full space-y-[10px]">
                        <label htmlFor="capacity" className="text-[#313131]">
                            Capacity:
                        </label>
                        <div className="relative">
                            <input
                                type="number"
                                id="capacity"
                                name="capacity"
                                value={carData.capacity || ''}
                                onChange={handleInputChange}
                                className="border  border-gray-300 rounded-[10px] px-3 py-2 w-full "
                            />
                            <span className="absolute top-2 right-8 text-gray-500 ">pers</span>
                        </div>
                    </div>

                    <div className="flex flex-col  w-full space-y-[10px]">
                        <label htmlFor="mileage" className="text-[#313131] ">
                            Mileage:
                        </label>
                        <div className="relative ">
                            <input
                                type="text"
                                id="mileage"
                                name="mileage"
                                value={carData.mileage || ''}
                                onChange={handleInputChange}
                                className="border border-gray-300 rounded-[10px]  px-3 py-2 w-full "
                            />
                            <span className="absolute top-2 right-2 text-gray-500">km</span>
                        </div>
                    </div>

                    <div className="flex flex-col  w-full space-y-[10px]">
                        <label htmlFor="year" className="text-[#313131]">
                            Year:
                        </label>
                        <input
                            type="number"
                            id="year"
                            name="year"
                            value={carData.year || ''}
                            onChange={handleInputChange}
                            className="border border-gray-300 rounded-[10px]  px-3 py-2 w-full"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CarFormDetails;
