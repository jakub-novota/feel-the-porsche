import React from 'react';

interface Car {
  name: string;
  power: string;
  max_speed: string;
  transmission: string;
  acceleration: string;
  year: number;
  capacity: number;
  image: string;
}

interface CarCardProps {
  car: Car;
}

const CarCard: React.FC<CarCardProps> = ({ car }) => {
  return (
    <div>
      <h2>{car.name}</h2>
      <p>Power: {car.power}</p>
      <p>Max Speed: {car.max_speed}</p>
      <p>Transmission: {car.transmission}</p>
      <p>0-100 km/h: {car.acceleration}</p>
      <p>Year: {car.year}</p>
      <p>Capacity: {car.capacity}</p>
      <img src={car.image} alt={car.name} />
    </div>
  );
};

export default CarCard;
