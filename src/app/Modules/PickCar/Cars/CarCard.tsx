import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Car } from '@/app/cars/Modules/CarInterface';
import API_BASE_URL from '@/app/config';

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
            className="w-[325px] sm:w-full mb-4 sm:mb-[27px] ml-[20px] mr-[20px]"
        >
            <div className="relative mx-auto h-[152px] md:w-[741px] md:h-[346px] sm:h-[252px] sm:w-[525px] mb-4">
                {car.image ? (
                    <Image
                        fill
                        priority
                        quality={100}
                        src={`${API_BASE_URL}/photos/${car.image}`}
                        alt={car.name}
                        sizes="() 100vw"
                    />
                ) : (
                    <div className="w-full h-full bg-gray-300 flex justify-center  items-center" >
                        <p>No image</p>
                    </div> // Placeholder or default image when car.image is null
                )}
            </div>
            <h1 className="font-sohogothicpro font-bold text-[28px]  mt-[70px] sm:mt-0 sm:text-[42px] tracking-[-1.4] sm:tracking-[-2.1px] text-[#071529] mb-[35px] sm:mb-[40px] text-center">
                {car.name}
            </h1>
            <div className=" grid grid-cols-3  sm:gap-[32px] md:gap-[65px] sm:flex sm:justify-center">
                <div>
                    <p className="text-[#9C9C9C] text-[12px] font-light  tracking-[-0.6px]">Power</p>
                    <p className="text-[18px] font-sohogothicpro font-bold  tracking-[-0.36px] sm:tracking-[-0.4px] sm:text-[20px] text-black">
                        {car.power_PS} PS
                    </p>
                </div>
                <div>
                    <p className="text-[#9C9C9C] text-[12px] font-light  tracking-[-0.6px]">Max Speed</p>
                    <p className="text-[18px] font-sohogothicpro font-bold  tracking-[-0.36px]  sm:tracking-[-0.4px] sm:text-[20px] text-black">
                        {car.max_speed} km/h
                    </p>
                </div>
                <div>
                    <p className="text-[#9C9C9C] text-[12px] font-light  tracking-[-0.6px]">Transmission</p>
                    <p className="text-[18px] font-sohogothicpro font-bold  tracking-[-0.36px]  sm:tracking-[-0.4px] sm:text-[20px] text-black">
                        {car.transmission}
                    </p>
                </div>
                <div>
                    <p className="text-[#9C9C9C] text-[12px] font-light  tracking-[-0.6px]">0-100 km/h</p>
                    <p className="text-[18px] font-sohogothicpro font-bold  tracking-[-0.36px]  sm:tracking-[-0.4px] sm:text-[20px] text-black">
                        {car.acceleration} s
                    </p>
                </div>
                <div>
                    <p className="text-[#9C9C9C] text-[12px] font-light  tracking-[-0.6px]">Year</p>
                    <p className="text-[18px] font-sohogothicpro font-bold  tracking-[-0.36px]  sm:tracking-[-0.4px] sm:text-[20px] text-black">
                        {car.year}
                    </p>
                </div>
                <div>
                    <p className="text-[#9C9C9C] text-[12px] font-light  tracking-[-0.6px]">Capacity</p>
                    <p className="text-[18px] font-sohogothicpro font-bold  tracking-[-0.36px] sm:tracking-[-0.4px] sm:text-[20px] text-black">
                        {car.capacity} pers
                    </p>
                </div>
            </div>
            <div className="flex justify-center mt-[70px] sm:mt-[67px]">
                <Link href={`/cars/${carId}`}>
                    <div className="flex justify-center items-center bg-buttonmoreinfo w-40 h-12 p-2 rounded-lg sm:w-[165px] sm:h-[52px] sm:p-[8px]">
                        <p className="text-white font-sohogothicpro font-medium text-[15px] sm:text-[15px] leading-[15px]  tracking-[0.3px] uppercase">
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
