import React from 'react';
import Table from './DetailTable';

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

const CarDetails: React.FC<CarDetailsProps> = ({ car }) => {
  return (
    <div className="mt-[48px]">
      <h1 className="font-sohogothicpro font-medium text-[32px] leading-[48px] tracking-[-0.05em] mb-[21px]">Detail specifications</h1>
      <Table  car={car}/>
    </div>
  );
};

export default CarDetails;
