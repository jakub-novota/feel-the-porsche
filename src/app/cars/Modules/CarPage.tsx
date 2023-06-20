import React from 'react';
import CarCard from './CarCard';
import carsData from '@/app/json/cars.json';

const CarsPage: React.FC = () => {
    return (
        <div>
            {carsData.map((car, index) => (
                <>
                    <CarCard key={index} car={car} />
                    <br/>
                </>
            ))}
        </div>
    );
};

export default CarsPage;
