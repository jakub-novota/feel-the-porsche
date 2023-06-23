import React from 'react';
import Link from 'next/link';
import CarImages from "./CarsImage";


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
    [key: string]: any; // Index signature allowing dynamic indexing
}

interface CarCardProps {
    car: Car;
}

const CarCard: React.FC<CarCardProps> = ({ car }) => (
    <Link href={`/cars/${car.id}`}>
        <div className='flex justify-center'>
            <div className=" w-[572px] h-[537px]">
                <CarImages elementId={car.id} />
                <div className='bg-white rounded-b-[12px] pt-[25px] pl-[30px] pr-[30px] pb-[27px]'>
                    <h1 className="font-sohogothicpro font-bold  italic text-[30px] leading-[45px] text-[#071529]">{car.name}</h1>
                    <div className='flex justify-between mt-[26px]'>
                        <div >
                            <p className='text-[#646464] text-[12px] font-light leading-[15px] tracking-[-0.05em]'>Power</p>
                            <p className='text-[20px] font-sohogothicpro font-bold  leading-[30px] tracking-[-0.02em] text-[#313131]'>{car.power} PS</p>
                        </div>
                        <div >
                            <p className='text-[#646464] text-[12px] font-light leading-[15px] tracking-[-0.05em]'>Transmission</p>
                            <p className='text-[20px] font-sohogothicpro font-bold  leading-[30px] tracking-[-0.02em] text-[#313131]'>{car.transmission}</p>
                        </div>
                        <div >
                            <p className='text-[#646464] text-[12px] font-light leading-[15px] tracking-[-0.05em]'>Drive</p>
                            <p className='text-[20px] font-sohogothicpro font-bold  leading-[30px] tracking-[-0.02em] text-[#313131]'>{car.drive}</p>
                        </div>
                        <div >
                            <p className='text-[#646464] text-[12px] font-light leading-[15px] tracking-[-0.05em]'>Year</p>
                            <p className='text-[20px] font-sohogothicpro font-bold  leading-[30px] tracking-[-0.02em] text-[#313131]'>{car.year}</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </Link>
);

export default CarCard;
