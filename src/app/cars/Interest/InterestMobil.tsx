import { useState, useEffect } from 'react';
import CarsJSON from '@/app/json/cars.json';
import { Car } from '../Modules/CarInterface';
import CarsCard from './CarsCard';
import Link from 'next/link';
import AnimatedArrow from '@/app/Modules/Svg_Module/Arrow';

export default function InterestCarsMobile({ excludedId }: { excludedId: number }) {
    const [selectedCars, setSelectedCars] = useState<Car[]>([]);
    const [currentIndex, setCurrentIndex] = useState<number>(0);

    useEffect(() => {
        const cars = CarsJSON.filter((car: Car) => car.id !== excludedId);
        setSelectedCars(cars);
        setCurrentIndex(0);
    }, [excludedId]);

    const handlePrevSlide = () => {
        setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    };

    const handleNextSlide = () => {
        setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, selectedCars.length - 1));
    };

    return (
        <>
            <div className="flex flex-col items-center justify-center w-full">
                <h1 className="font-sohogothicpro italic font-bold text-3xl leading-7 tracking-wider text-gray-800 mb-4 max-w-xs">
                    Not interested in this car?
                </h1>
                <p className="text-sm leading-6 text-gray-800 max-w-xs mb-6">
                    Look at other cars from our collection and find the perfect car for you.
                </p>
                <Link href="/cars">
                    <button className="bg-green-500 text-white py-3 px-6 rounded-lg font-medium text-lg">
                        See all cars
                    </button>
                </Link>
            </div>
            <div className="flex flex-col items-center justify-center mt-8">
                {selectedCars.slice(currentIndex, currentIndex + 1).map((car: Car) => (
                    <CarsCard key={car.id} car={car} />
                ))}
            </div>
            <div className="flex justify-center mt-8">
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
                    <button onClick={handleNextSlide} disabled={currentIndex === selectedCars.length - 1}>
                        <AnimatedArrow
                            direction="right"
                            circleColor={currentIndex === selectedCars.length - 1 ? '#bec4cc' : '#33B888'}
                            color={currentIndex === selectedCars.length - 1 ? '#bec4cc' : '#33b888'}
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
