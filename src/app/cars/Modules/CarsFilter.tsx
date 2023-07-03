"use client"
import React, { useEffect, useState } from 'react';
import CarCard from './CarsCard';
import { Car } from './CarInterface';

const CarGrid: React.FC = () => {
  const [carData, setCarData] = useState<Car[]>([]);
  const [filter, setFilter] = useState('');
  const [sortBy, setSortBy] = useState('id');
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/cars'); // Replace with your API endpoint
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const responseData = await response.json();
        setCarData(responseData.cars); // Assuming the cars array is nested within the "cars" property
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };

  const handleSortByChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value);
    setSortOrder('asc'); // Reset sort order when changing the sort property
  };

  const handleSortOrderChange = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const filteredCars = carData.filter((car: Car) =>
    car.name.toLowerCase().includes(filter.toLowerCase())
  );

  const sortedCars = filteredCars.sort((a: Car, b: Car) => {
    if (sortBy === 'acceleration') {
      return sortOrder === 'asc' ? a[sortBy] - b[sortBy] : b[sortBy] - a[sortBy];
    } else {
      const aValue = typeof a[sortBy] === 'string' ? a[sortBy].toLowerCase() : a[sortBy];
      const bValue = typeof b[sortBy] === 'string' ? b[sortBy].toLowerCase() : b[sortBy];

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortOrder === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
      } else {
        return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
      }
    }
  });

  return (
    <div className="pb-[50px]">
      <div className="mb-4">
        <label htmlFor="filter" className="mr-2">
          Filter:
        </label>
        <input
          type="text"
          id="filter"
          value={filter}
          onChange={handleFilterChange}
          className="border border-gray-300 rounded-md px-2 py-1 mr-4"
        />
        <label htmlFor="sortBy" className="mr-2">
          Sort By:
        </label>
        <select
          id="sortBy"
          value={sortBy}
          onChange={handleSortByChange}
          className="border border-gray-300 rounded-md px-2 py-1 mr-2"
        >
          <option value="name">Name</option>
          <option value="power_PS">Power</option>
          <option value="max_speed">Max Speed</option>
          <option value="acceleration">Acceleration</option>
          <option value="year">Year</option>
          <option value="capacity">Capacity</option>
        </select>
        <button onClick={handleSortOrderChange} className="text-blue-500">
          {sortOrder === 'asc' ? '↑' : '↓'}
        </button>
      </div>

      <div className="flex justify-center">
        <div className="flex flex-col items-start">
          <div>
            <h1 className="font-sohogothicpro font-bold italic text-[70px] leading-[79px] tracking-[-0.02em] text-[#313131] mb-[71px]">Cars</h1>
            <p className="mb-[31px] font-medium text-[14px] leading-[17px] tracking-[-0.05em] text-[#313131]">Sort by</p>
          </div>
          <div className="grid grid-cols-1 space-y-[45px] sm:space-y-0 lg:grid-cols-2 sm:gap-x-[25px] sm:gap-y-[54px]">
            {sortedCars.map((car: Car, index) => (
              <CarCard car={car} key={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarGrid;
