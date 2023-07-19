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
            className="w-[325px] sm:w-[741px] mb-4 sm:mb-[27px]"
        >
            <div className="relative mx-auto h-[152px] md:w-[741px] md:h-[346px] sm:h-[252px] sm:w-[525px] mb-4">
                <Image fill priority quality={100} src={car.image} alt={car.name} />
            </div>
            <h1 className="font-sohogothicpro font-bold mt-[100px] sm:mt-0 text-[28px] sm:text-[42px] tracking-[-1.4] sm:tracking-[-2.1px] text-[#071529] mb-[35px] sm:mb-[40px] text-center">
                {car.name}
            </h1>
            <div className="ml-[20px] mr[20px] sm:ml-0 sm:mr-0 grid grid-cols-3 sm:gap-[32px] md:gap-[65px] sm:flex sm:justify-center">
                <div>
                    <p className="text-[#9C9C9C] text-sm leading-5 tracking-[-0.05em]">Power</p>
                    <p className="text-lg font-sohogothicpro font-medium leading-9 tracking-[-0.02em] text-black">
                        {car.power} PS
                    </p>
                </div>
                <div>
                    <p className="text-[#9C9C9C] text-sm leading-5 tracking-[-0.05em]">Max Speed</p>
                    <p className="text-lg font-sohogothicpro font-medium leading-9 tracking-[-0.02em] text-black">
                        {car.max_speed} km/h
                    </p>
                </div>
                <div>
                    <p className="text-[#9C9C9C] text-sm leading-5 tracking-[-0.05em]">Transmission</p>
                    <p className="text-lg font-sohogothicpro font-medium leading-9 tracking-[-0.02em] text-black">
                        {car.transmission}
                    </p>
                </div>
                <div>
                    <p className="text-[#9C9C9C] text-sm leading-5 tracking-[-0.05em]">0-100 km/h</p>
                    <p className="text-lg font-sohogothicpro font-medium leading-9 tracking-[-0.02em] text-black">
                        {car.acceleration} s
                    </p>
                </div>
                <div>
                    <p className="text-[#9C9C9C] text-sm leading-5 tracking-[-0.05em]">Year</p>
                    <p className="text-lg font-sohogothicpro font-medium leading-9 tracking-[-0.02em] text-black">
                        {car.year}
                    </p>
                </div>
                <div>
                    <p className="text-[#9C9C9C] text-sm leading-5 tracking-[-0.05em]">Capacity</p>
                    <p className="text-lg font-sohogothicpro font-medium leading-9 tracking-[-0.02em] text-black">
                        {car.capacity} pers
                    </p>
                </div>
            </div>
            <div className="flex justify-center mt-4 sm:mt-[49px]">
                <Link href={`/cars/${carId}`}>
                    <div className="flex justify-center items-center bg-buttonmoreinfo w-40 h-12 p-2 rounded-lg sm:w-[165px] sm:h-[52px] sm:p-[8px]">
                        <p className="text-white font-sohogothicpro font-medium text-sm sm:text-[15px] leading-3 sm:leading-[15px] tracking-wide uppercase">
                            more info
                        </p>
                        <p className="text-white pl-2">&rarr;</p>
                    </div>
                </Link>
            </div>
        </motion.div>
    );
};

export default CarCard;
