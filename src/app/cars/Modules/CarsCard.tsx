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
            <div className=" w-[353px]  sm:w-[572px] sm:h-[537px]">
                <CarImages carImagesURL={JSON.stringify(car.image_cars)} />

                <div className='bg-white rounded-b-[12px] pt-[15px] pl-[19px] pr-[16px] pb-[30px] sm:pt-[25px] sm:pl-[30px] sm:pr-[30px] sm:pb-[27px]'>
                    <h1 className="font-sohogothicpro font-bold  italic text-[24px] sm:text-[30px]  text-[#071529]">{car.name}</h1>
                    <div className='flex justify-between mt-[26px]'>
                        <div >
                            <p className='text-[#646464] text-[12px] font-light leading-[15px] tracking-[-0.7px] sm:tracking-[-0.05em]'>Power</p>
                            <p className='text-[19px] sm:text-[20px] font-sohogothicpro font-bold tracking-[-0.95px]  sm:tracking-[-0.02em] text-[#313131]'>{car.power_PS} PS</p>
                        </div>
                        <div >
                            <p className='text-[#646464] text-[12px] font-light leading-[15px] tracking-[-0.7px] sm:tracking-[-0.05em]'>Transmission</p>
                            <p className='text-[19px] sm:text-[20px] font-sohogothicpro font-bold tracking-[-0.95px]  sm:tracking-[-0.02em] text-[#313131]'>{car.transmission}</p>
                        </div>
                        <div >
                            <p className='text-[#646464] text-[12px] font-light leading-[15px] tracking-[-0.7px] sm:tracking-[-0.05em]'>Drive</p>
                            <p className='text-[19px] sm:text-[20px] font-sohogothicpro font-bold tracking-[-0.95px]  sm:tracking-[-0.02em] text-[#313131]'>{car.drive}</p>
                        </div>
                        <div >
                            <p className='text-[#646464] text-[12px] font-light leading-[15px] tracking-[-0.7px] sm:tracking-[-0.05em]'>Year</p>
                            <p className='text-[19px] sm:text-[20px] font-sohogothicpro font-bold tracking-[-0.95px]  sm:tracking-[-0.02em] text-[#313131]'>{car.year}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Link>
);

export default CarCard;
