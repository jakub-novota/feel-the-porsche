import React from 'react';
import carData from '@/app/json/cars.json';
import CarDetails from './CarDetails';
import InfoCards from './InfoCards';

interface CarInformationProps {
  carId: number;
}

const CarInformation: React.FC<CarInformationProps> = ({ carId }) => {
  const car = carData.find((car) => car.id === carId);

  if (!car) {
    return <div>Car not found.</div>;
  }

  return (
    <div className="w-full pl-[89px]">
      <h1 className="font-sohogothicpro font-bold italic text-[49px] leading-[73px] tracking-[-0.03em] text-[#313131]">
        {car.name}
      </h1>
      <div className="flex mt-[32px]">
        <div className="w-[400px] ">
          <p className="w-[320px] text-[14px] leading-[20px] tracking-[-0.05em] text-[#545454]" dangerouslySetInnerHTML={{ __html: car.description }}></p>
        </div>
        <div className="w-full">
          <InfoCards power={car.power_PS} maxSpeed={car.max_speed} year={car.year} transmission={car.transmission} acceleration={car.acceleration} capacity={car.capacity} />
        </div>
      </div>
      <CarDetails car={car} />
    </div>
  );
};

export default CarInformation;
