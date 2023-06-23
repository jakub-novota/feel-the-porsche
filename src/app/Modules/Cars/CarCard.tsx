import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Car } from '@/app/cars/Modules/CarInterface';


interface CarCardProps {
    car: Car;
}

const CarCard: React.FC<CarCardProps> = ({ car }) => {
    const carId = car.id; // Assuming each car object has an 'id' property

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className='relative w-[741px] h-[346px] mb-[27px]'>
                <Image fill priority quality={100} src={car.image} alt={car.name} />
            </div>
            <h1 className='font-sohogothicpro font-bold text-[30px] leading-[45px] tracking-[-0.05em] text-[#071529] mb-[40px]'>
                {car.name}
            </h1>
            <div className='flex justify-center space-x-[65px]'>
                <div>
                    <p className='text-[#9C9C9C] text-[14px]  leading-[17px] tracking-[-0.05em]'>Power</p>
                    <p className='text-[24px] font-sohogothicpro font-medium  leading-[36px] tracking-[-0.02em] text-black'>{car.power} PS</p>
                </div>
                <div>
                    <p className='text-[#9C9C9C] text-[14px] leading-[17px] tracking-[-0.05em]'>Max Speed</p>
                    <p className='text-[24px] font-sohogothicpro font-medium  leading-[36px] tracking-[-0.02em] text-black'>{car.max_speed} km/h</p>
                </div>
                <div>
                    <p className='text-[#9C9C9C] text-[14px]  leading-[17px] tracking-[-0.05em]'>Transmission</p>
                    <p className='text-[24px]font-sohogothicpro font-medium  leading-[36px] tracking-[-0.02em] text-black'>{car.transmission}</p>
                </div>
                <div>
                    <p className='text-[#9C9C9C] text-[14px]  leading-[17px] tracking-[-0.05em]'>0-100 km/h</p>
                    <p className='text-[24px] font-sohogothicpro font-medium  leading-[36px] tracking-[-0.02em] text-black'>{car.acceleration} s</p>
                </div>
                <div>
                    <p className='text-[#9C9C9C] text-[14px]]  leading-[17px] tracking-[-0.05em]'>Year</p>
                    <p className='text-[24px] font-sohogothicpro font-medium  leading-[36px] tracking-[-0.02em] text-black'>{car.year}</p>
                </div>
                <div>
                    <p className='text-[#9C9C9C] text-[14px] leading-[17px] tracking-[-0.05em]'>Capacity</p>
                    <p className='text-[24px] font-sohogothicpro font-medium  leading-[36px] tracking-[-0.02em] text-black'>{car.capacity} pers</p>
                </div>
            </div>
            <div className='flex justify-center mt-[49px]'>
                <Link href={`/cars/${carId}`}>
                    <div className='flex justify-center  items-center bg-buttonmoreinfo w-[165px] h-[52px]  p-[8px] rounded-[8px]'>
                        <p className='text-white font-sohogothicpro font-medium text-[15px] leading-[15px] tracking-[2%] uppercase'>more info</p>
                        <p className='text-white pl-[20px]'>&rarr;</p>
                    </div>
                </Link>
            </div>
        </motion.div>
    );
};

export default CarCard;
