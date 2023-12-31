import { useState, useEffect } from 'react';
import { Car } from '../Modules/CarInterface';
import CarsCard from './CarsCard';
import Link from 'next/link';
import AnimatedArrow from '@/app/Modules/Svg_Module/Arrow';

interface InterestCarsProps {
  car: Car;
}

export default function InterestCars({ car }: InterestCarsProps) {
  const [selectedCars, setSelectedCars] = useState<Car[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      const response = await fetch('/api/cars');
      const data = await response.json();
      setSelectedCars(data.cars);
    } catch (error) {
      console.error('Error fetching cars:', error);
    }
  };

  const handlePrevSlide = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 2, 0));
  };

  const handleNextSlide = () => {
    setCurrentIndex((prevIndex) => Math.min(prevIndex + 2, selectedCars.length - 2));
  };

  const filteredCars = selectedCars.filter((c) => c._id !== car._id);

  return (
    <>
      <div className='flex mb-[20px] justify-end mr-[135px]'>
        <div className='flex space-x-[10px]'>
          <button onClick={handlePrevSlide} disabled={currentIndex === 0}>
            <AnimatedArrow
              direction='left'
              circleColor={currentIndex === 0 ? '#bec4cc' : '#33b888'}
              color={currentIndex === 0 ? '#bec4cc' : '#33b888'}
              circleFill='white'
              strokeWidth={2}
              circleStrokeWidth={2}
            />
          </button>
          <button onClick={handleNextSlide} disabled={currentIndex >= filteredCars.length - 2}>
            <AnimatedArrow
              direction='right'
              circleColor={currentIndex === filteredCars.length - 2 ? '#bec4cc' : '#33B888'}
              color={currentIndex === filteredCars.length - 2 ? '#bec4cc' : '#33b888'}
              circleFill='white'
              strokeWidth={2}
              circleStrokeWidth={2}
            />
          </button>
        </div>
      </div>

      <div className='flex pr-[20px] pl-[20px] flex-col sm:flex-row w-screen justify-between'>
        <div className='xl:ml-[137px]'>
          <div className='flex text-center sm:text-left flex-col items-center sm:items-start w-full'>
            <h1 className='font-sohogothicpro italic font-bold lg:text-[35px] xl:text-[42px] leading-[49px] tracking-[-0.05em] text-[#313131] max-w-[291px]'>
              Not interested in this car?
            </h1>
            <p className='mx-auto sm:mx-0 max-w-[261px] mt-[23px] text-[16px] leading-[22px] tracking-[-0.05em] text-[#313131]'>
              Look at other cars from our collection and find the perfect car for you.
            </p>
            <Link href={'/cars'}>
              <button className='bg-[#33B888] mt-[35px] text-white py-[15px] px-[28px] rounded-[8px] font-medium text-[18px] leading-[22px] tracking-[-0.05em]'>
                See all cars
              </button>
            </Link>
          </div>
        </div>

        <div className='flex ml-[10px] xl:mr-[135px]'>
          <div className='flex xl:space-x-[60px] lg:space-x-[10px]'>
            {filteredCars.slice(currentIndex, currentIndex + 2).map((car: Car) => (
              <CarsCard key={car._id} car={car} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
