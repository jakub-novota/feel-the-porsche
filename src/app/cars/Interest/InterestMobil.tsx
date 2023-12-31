import { useState, useEffect } from 'react';
import { Car } from '../Modules/CarInterface';
import CarsCard from './CarsCard';
import Link from 'next/link';
import AnimatedArrow from '@/app/Modules/Svg_Module/Arrow';

interface InterestCarsProps {
    car: Car;
}

export default function InterestCarsMobile({ car }: InterestCarsProps) {
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
        setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    };

    const handleNextSlide = () => {
        setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, selectedCars.length - 2));
    };

    const filteredCars = selectedCars.filter((c) => c._id !== car._id);



    return (
        <>
            <div className="flex flex-col items-center justify-center w-full">
                <div className='sflex flex-col justify-center text-center'>
                    <h1 className="font-sohogothicpro italic font-bold text-3xl leading-7 tracking-wider text-gray-800 mb-4 max-w-xs">
                        Not interested in this car?
                    </h1>
                    <p className="mx-auto text-[16pxs] leading-[22px] text-[#313131] max-w-[261px] tracking-[-0.8px] mt-[30px]">
                        Look at other cars from our collection and find the perfect car for you.
                    </p>
                    <Link href="/cars" >
                        <button className="mt-[36px] bg-[#33B888] text-white py-3 px-6 rounded-[8px] font-sohogothicpro uppercase tracking-[0.3px] font-medium text-[15px]">
                            See all cars
                        </button>
                    </Link>
                </div>
            </div>
            <div className="flex flex-col items-center justify-center mt-8">
                {filteredCars.slice(currentIndex, currentIndex + 1).map((car: Car) => (
                    <CarsCard key={car.id} car={car} />
                ))}
            </div>
            <div className="flex justify-end mt-[50px] mr-[10vw]">
                <div className="flex space-x-4">
                    <button onClick={handlePrevSlide} disabled={currentIndex === 0}>
                        <AnimatedArrow
                            direction="left"
                            circleColor={currentIndex === 0 ? '#bec4cc' : '#33b888'}
                            color={currentIndex === 0 ? '#bec4cc' : '#33b888'}
                            circleFill="white"
                            strokeWidth={2}
                            circleStrokeWidth={2}
                        />
                    </button>
                    <button onClick={handleNextSlide} disabled={currentIndex === selectedCars.length - 2}>
                        <AnimatedArrow
                            direction="right"
                            circleColor={currentIndex === selectedCars.length - 2 ? '#bec4cc' : '#33B888'}
                            color={currentIndex === selectedCars.length - 2 ? '#bec4cc' : '#33b888'}
                            circleFill="white"
                            strokeWidth={2}
                            circleStrokeWidth={2}
                        />
                    </button>
                </div>
            </div>
        </>
    );
}
