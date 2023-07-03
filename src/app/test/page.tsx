"use client"
import { useEffect, useState } from 'react';
import { Car } from '../cars/Modules/CarInterface';

async function getData() {
    const response = await fetch('/api/cars');

    if (!response.ok) {
        throw new Error('Failed to fetch data');
    }

    const responseData = await response.json();
    console.log('API Response:', responseData);

    // Assuming the cars array is nested within the "cars" property
    const data = responseData.cars;
    console.log('Extracted Data:', data);

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
                console.error('Error fetching data:', error);
            }
        }

        fetchData();
    }, []);

    console.log('State Data:', data);

    return (
        <div>
            <h1>All Cars</h1>
            {data.map((car) => (

                <div key={car._id}>
                    <br />
                    <br />
                    <h2>{car.name}</h2>
                    <p>{car.description}</p>
                </div>
            ))}

        </div>
    );
}
