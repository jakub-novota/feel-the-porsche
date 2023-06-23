import React from 'react';
import Link from 'next/link';
import CarImages from "./CarsImage";
import { Car } from './CarInterface';

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
                            <p className='text-[20px] font-sohogothicpro font-bold  leading-[30px] tracking-[-0.02em] text-[#313131]'>{car.power_PS} PS</p>
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
