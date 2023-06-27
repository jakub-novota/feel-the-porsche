"use client"
import { useState, useEffect } from 'react';
import CarsJSON from '@/app/json/cars.json';
import { Car } from '@/app/cars/Modules/CarInterface';
import CarsCard from '@/app/cars/Interest/CarsCard'
import Link from 'next/link';
import AnimatedArrow from '@/app/Modules/Svg_Module/Arrow';
import { motion } from 'framer-motion';

export default function InterestCars({ excludedId }: { excludedId: number }) {
  const [selectedCars, setSelectedCars] = useState<Car[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const [currentCarIndex, setCurrentCarIndex] = useState(0);
  const currentCar = CarsJSON[currentCarIndex];

  useEffect(() => {
    const cars = CarsJSON.filter((car: Car) => car.id !== excludedId);
    setSelectedCars(cars);
    setCurrentIndex(0);
  }, [excludedId]);

  const handlePrevSlide = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 2, 0));
  };

  const handleNextSlide = () => {
    setCurrentIndex((prevIndex) => Math.min(prevIndex + 2, selectedCars.length - 2));
  };

  const handleNextCar = () => {
    setCurrentCarIndex((prevIndex) => (prevIndex + 1) % CarsJSON.length);
  };

  const handleNextCarRight = () => {
    setCurrentIndex((prevIndex) => prevIndex + 1);
    handleNextCar();
  };

  const handleNextCarLeft = () => {
    setCurrentIndex((prevIndex) => prevIndex - 1);
    handleNextCar();
  };

  return (
    <>
      <div className='flex  mb-[20px] justify-end mr-[135px]'>
        <div className='flex space-x-[10px]'>
          <button onClick={() => {
            handlePrevSlide();
            handleNextCarLeft();
          }} disabled={currentIndex === 0}>
            <AnimatedArrow
              direction="left"
              circleColor={currentIndex === 0 ? "#bec4cc" : "#33b888"}
              color={currentIndex === 0 ? "#bec4cc" : "#33b888"}
              circleFill="white"
              strokeWidth={2}
              circleStrokeWidth={2}
            />
          </button>
          <button onClick={() => {
            handleNextSlide();
            handleNextCarRight();
          }} disabled={currentIndex >= selectedCars.length - 2}>
            <AnimatedArrow
              direction="right"
              circleColor={currentIndex === selectedCars.length - 2 ? "#bec4cc" : "#33B888"}
              color={currentIndex === selectedCars.length - 2 ? "#bec4cc" : "#33b888"}
              circleFill="white"
              strokeWidth={2}
              circleStrokeWidth={2}
            />
          </button>
        </div>
      </div>
      <div className="flex w-screen justify-between">
        <div className='ml-[137px]'>
          <h1 className="font-sohogothicpro italic font-bold text-[42px] leading-[49px] tracking-[-0.05em] text-[#313131] max-w-[291px]">Not interested in this car?</h1>
          <p className='max-w-[261px] mt-[23px] text-[16px] leading-[22px] tracking-[-0.05em] text-[#313131]'>Look at other cars from our collection and find the perfect car for you.</p>
          <Link href={'/cars'}>
            <button className="bg-[#33B888] mt-[35px] text-white py-[15px] px-[28px] rounded-[8px] font-medium text-[18px] leading-[22px] tracking-[-0.05em]">
              See all cars
            </button>
          </Link>
        </div>
        <motion.div
          key={currentCar.id}
          initial={{ opacity: 0, x: currentIndex > 0 ? 50 : -50 }} // Update x values
          animate={{ opacity: 1, x: 0 }} // Update x values
          transition={{ duration: 0.3, delay: currentIndex === 0 ? 0 : 0.1 }}
          exit={{ opacity: 0 }}
        >
          <div className='flex mr-[135px]'>
            <div className='flex space-x-[60px]'>
              {selectedCars
                .slice(currentIndex, currentIndex + 2)
                .map((car: Car, index: number) => (
                  <motion.div
                    key={car.id}
                    initial={{ opacity: 0, x: currentIndex > 0 ? 50 : -50 }} // Update x values
                    animate={{ opacity: 1, x: 0 }} // Update x values
                    transition={{ duration: 0.3, delay: currentIndex > 0 ? index * 0.1 : (index + 1) * 0.1 }}
                  >
                    <CarsCard key={car.id} car={car} />
                  </motion.div>
                ))}
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
}
