import React from 'react';

interface Car {
    id: number;
    name: string;
    power_PS: number;
    power_HP: number;
    max_speed: number;
    transmission: string;
    acceleration: number;
    year: number;
    capacity: number;
    image: string;
    image_cars: {
        "1": string;
        "2": string;
        "3"?: string | undefined;
        "4"?: string | undefined;
    };
    drive: string;
    description: string;
    cylinder_capacity: number;
    model: string;
    body: string;
    mileage: number;
    fuel: string;
}

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
        <div className="grid grid-cols-2 ">
            <div className="max-w-[277px]">
                <ul>
                    {leftColumnDetails.map((item, index) => (
                        <li
                            className="flex items-center  border-b-[0.5px] border-[#B7B7B7] "
                            key={index}
                        >
                            <span className="flex-grow text-left text-[16px] leading-[41px] tracking-[-0.05em] text-[#313131]">{item.label}:</span>
                            <span className="text-right text-[16px] font-semibold leading-[41px] tracking-[-0.05em] text-[#313131]">{item.value}</span>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="max-w-[277px]">
                <ul>
                    {rightColumnDetails.map((item, index) => (
                        <li
                            className="flex items-center  border-[#B7B7B7] border-b-[0.5px]"
                            key={index}
                        >
                            <span className="flex-grow text-left text-[16px] leading-[41px] tracking-[-0.05em] text-[#313131]">{item.label}:</span>
                            <span className='text-right text-[16px] font-semibold leading-[41px] tracking-[-0.05em] text-[#313131]'>{item.value}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Table;
