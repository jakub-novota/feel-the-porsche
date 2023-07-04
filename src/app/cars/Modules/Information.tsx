import React from 'react';
import CarDetails from './CarDetails';
import InfoCards from './InfoCards';
import { Car } from './CarInterface';

interface CarInformationProps {
  carData: Car; // Update prop type to Car instead of Car[]
}

const CarInformation: React.FC<CarInformationProps> = ({ carData }) => {
  if (!carData) {
    return <div>Car not found.</div>;
  }

  return (
    <div className="w-full xl:pl-[89px] lg:pl-[60px] pl-[20px] pr-[20px]">
      <h1 className="font-sohogothicpro font-bold italic text-[32px] tracking-[-0.96px] sm:text-[49px] sm:tracking-[-0.03em] text-[#313131]">
        {carData.name}
      </h1>
      <div className="flex flex-col sm:flex-row mt-[20px] sm:mt-[32px]">
        <p className="max-w-[320px] text-[14px] leading-[20px] tracking-[-0.05em] text-[#545454]" dangerouslySetInnerHTML={{ __html: carData.description }}></p>
        <div className="w-full flex justify-start sm:justify-center mt-[50px] sm:mt-0">
          <InfoCards power={carData.power_PS} maxSpeed={carData.max_speed} year={carData.year} transmission={carData.transmission} acceleration={carData.acceleration} capacity={carData.capacity} />
        </div>
      </div>
      <CarDetails car={carData} />
    </div>
  );
};

export default CarInformation;
