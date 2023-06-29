import React from 'react';
import { Car } from './CarInterface';

interface CarDetailsProps {
    car: Car;
}

const Table: React.FC<CarDetailsProps> = ({ car }) => {
    const leftColumnDetails = [
        { label: 'Year', value: car.year },
        { label: 'Model', value: car.model },
        { label: 'Body', value: car.body },
        { label: 'Mileage', value: `${car.mileage} km` },
        { label: 'Power', value: `${car.power_HP} HP` },
    ];

    const rightColumnDetails = [
        { label: 'Cylinder capacity', value: `${car.cylinder_capacity} liter` },
        { label: 'Transmission', value: car.transmission },
        { label: 'Drive', value: car.drive === 'RWD' ? 'Rear drive' : 'Front drive' },
        { label: 'Fuel', value: car.fuel },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 ">
            <div className="max-w-[353px] sm:w-[277px]">
                <ul>
                    {leftColumnDetails.map((item, index) => (
                        <li
                            className="flex items-center  border-b-[0.5px] border-[#B7B7B7] "
                            key={index}
                        >
                            <span className="flex-grow text-left text-[16px] leading-[41px] tracking-[-0.8px] text-[#313131]">{item.label}:</span>
                            <span className="text-right text-[16px] font-semibold leading-[41px] tracking-[-0.8px] text-[#313131]">{item.value}</span>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="max-w-[353px] sm:w-[277px]">
                <ul>
                    {rightColumnDetails.map((item, index) => (
                        <li
                            className="flex items-center  border-[#B7B7B7] border-b-[0.5px]"
                            key={index}
                        >
                            <span className="flex-grow text-left text-[16px] leading-[41px] tracking-[-0.8px] text-[#313131]">{item.label}:</span>
                            <span className='text-right text-[16px] font-semibold leading-[41px] tracking-[-0.8px] text-[#313131]'>{item.value}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Table;
