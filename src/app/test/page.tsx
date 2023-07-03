"use client"
import { useEffect, useState } from 'react';
import { Car } from '../cars/Modules/CarInterface';

async function getData() {
    const response = await fetch('/api/cars');

    if (!response.ok) {
        throw new Error('Failed to fetch data');
    }

    const responseData = await response.json();
    //console.log('API Response:', responseData);

    // Assuming the cars array is nested within the "cars" property
    const data = responseData.cars;
    //console.log('Extracted Data:', data);
    return data;
}

export default function Page() {
    const [data, setData] = useState<Car[]>([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const fetchedData = await getData();
                setData(fetchedData);
            } catch (error) {
                //console.error('Error fetching data:', error);
                Error("Error")
            }
        }

        fetchData();
    }, []);


    return (
        <div>
            <h1>All Cars</h1>
            {data.map((car) => (
                <div key={car._id}>
                    <br />
                    <br />
                    <h2>{car.name}</h2>
                    <p>ID: {car.id}</p>
                    <p>Power (PS): {car.power_PS}</p>
                    <p>Power (HP): {car.power_HP}</p>
                    <p>Max Speed: {car.max_speed}</p>
                    <p>Transmission: {car.transmission}</p>
                    <p>Acceleration: {car.acceleration}</p>
                    <p>Year: {car.year}</p>
                    <p>Capacity: {car.capacity}</p>
                    <p>Drive: {car.drive}</p>
                    <p>Description: {car.description}</p>
                    <p>Cylinder Capacity: {car.cylinder_capacity}</p>
                    <p>Model: {car.model}</p>
                    <p>Body: {car.body}</p>
                    <p>Mileage: {car.mileage}</p>
                    <p>Fuel: {car.fuel}</p>
                    <p>Image: {car.image}</p>
                    <p>Car Images: {JSON.stringify(car.image_cars)}</p>
                    <p>Gallery: {JSON.stringify(car.gallery)}</p>
                </div>
            ))}
        </div>
    );

}
