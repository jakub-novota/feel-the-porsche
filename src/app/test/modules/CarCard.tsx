import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';


interface Car {
    name: string;
    power: number;
    max_speed: number;
    transmission: string;
    acceleration: number;
    year: number;
    capacity: number;
    image: string;
}

interface CarCardProps {
    car: Car;
}

const CarCard: React.FC<CarCardProps> = ({ car }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className='relative w-[741px] h-[346px] mb-[27px]'>
                <Image
                    fill
                    priority
                    src={car.image}
                    alt={car.name}
                />
            </div>
            <h1 className='text-center font-sohogothicpro font-bold text-[42px] leading-[63px] tracking-[-0.05em] text-[#071529] mb-[40px]'>{car.name}</h1>
            <div className='flex justify-center space-x-[65px]'>
                <div>
                    <p className='text-[#646464] text-[12px] font-light leading-[15px] tracking-[-0.05em]'>Power</p>
                    <p className='text-[20px] font-sohogothicpro font-bold  leading-[30px] tracking-[-0.02em] text-[#313131]'>{car.power} PS</p>
                </div>
                <div>
                    <p className='text-[#646464] text-[12px] font-light leading-[15px] tracking-[-0.05em]'>Max Speed</p>
                    <p className='text-[20px] font-sohogothicpro font-bold  leading-[30px] tracking-[-0.02em] text-[#313131]'>{car.max_speed} km/h</p>
                </div>
                <div>
                    <p className='text-[#646464] text-[12px] font-light leading-[15px] tracking-[-0.05em]'>Transmission</p>
                    <p className='text-[20px] font-sohogothicpro font-bold  leading-[30px] tracking-[-0.02em] text-[#313131]'>{car.transmission}</p>
                </div>
                <div>
                    <p className='text-[#646464] text-[12px] font-light leading-[15px] tracking-[-0.05em]'>0-100 km/h</p>
                    <p className='text-[20px] font-sohogothicpro font-bold  leading-[30px] tracking-[-0.02em] text-[#313131]'>{car.acceleration} s</p>
                </div>
                <div>
                    <p className='text-[#646464] text-[12px] font-light leading-[15px] tracking-[-0.05em]'>Year</p>
                    <p className='text-[20px] font-sohogothicpro font-bold  leading-[30px] tracking-[-0.02em] text-[#313131]'>{car.year}</p>
                </div>
                <div>
                    <p className='text-[#646464] text-[12px] font-light leading-[15px] tracking-[-0.05em]'>Capacity</p>
                    <p className='text-[20px] font-sohogothicpro font-bold  leading-[30px] tracking-[-0.02em] text-[#313131]'>{car.capacity} pers</p>
                </div>
            </div>
        </motion.div>
    );
};

export default CarCard;