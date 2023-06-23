import React from 'react';
import Table from './DetailTable';
import { Car } from './CarInterface';

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
