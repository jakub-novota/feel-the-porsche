import React from 'react';
import Link from 'next/link';
import CarImages from "./CarsImage";
import { Car } from '../Modules/CarInterface';

interface CarCardProps {
  car: Car;
}
const CarCard: React.FC<CarCardProps> = ({ car }) => (
  < Link href={`/cars/${car._id}`}>
    <div className='flex justify-center'>
      <div className='w-[350px] h-[382px]'>
        <CarImages elementId={car.id} />
        <div className='bg-white rounded-b-[12px] pt-[25px] pl-[30px] pr-[30px] pb-[27px] shadow-[0px_15px_100px_rgba(81,111,133,0.25)]'>
          <h1 className="font-sohogothicpro font-bold italic text-[20px] leading-[45px] text-[#071529]">{car.name}</h1>
          <div className='flex justify-between mt-[17px]'>
            <div>
              <p className='text-[#9C9C9C] text-[14px] leading-[17px] tracking-[-0.05em]'>Power</p>
              <p className='text-[18px] font-sohogothicpro font-medium leading-[27px] tracking-[-0.05em] text-[#000000]'>{car.power_PS} PS</p>
            </div>
            <div>
              <p className='text-[#9C9C9C] text-[14px] leading-[17px] tracking-[-0.05em]'>Transmission</p>
              <p className='text-[18px] font-sohogothicpro font-medium leading-[27px] tracking-[-0.05em] text-[#000000]'>{car.transmission}</p>
            </div>
            <div>
              <p className='text-[#9C9C9C] text-[14px] leading-[17px] tracking-[-0.05em]'>Drive</p>
              <p className='text-[18px] font-sohogothicpro font-medium leading-[27px] tracking-[-0.05em] text-[#000000]'>{car.drive}</p>
            </div>
            <div>
              <p className='text-[#9C9C9C] text-[14px] leading-[17px] tracking-[-0.05em]'>Year</p>
              <p className='text-[18px] font-sohogothicpro font-medium leading-[27px] tracking-[-0.05em] text-[#000000]'>{car.year}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Link >
);

export default CarCard;
