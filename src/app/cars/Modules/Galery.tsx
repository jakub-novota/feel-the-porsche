import { useState } from 'react';
import Image from 'next/image';
import CarsJSON from '@/app/json/cars.json';
import { Car } from './CarInterface';

interface GaleryProps {
  carId: number;
}

export default function Galery({ carId }: GaleryProps) {
  const selectedCar = CarsJSON.find((car: Car) => car.id === carId);

  if (!selectedCar) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="flex flex-wrap">
        {Object.values(selectedCar.gallery).map((imageUrl, index) => (
          <div className="w-full md:w-1/2" key={index}>
            <div className="bg-white relative w-full h-[503px]">
              <Image src={imageUrl} alt={`Image ${index + 1}`} priority quality={100} fill style={{ objectFit: "cover" }} />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
