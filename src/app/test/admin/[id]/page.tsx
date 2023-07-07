"use client"
import CarForm from "./modules/createcar";
import React, { useEffect, useState } from 'react';
import { Car } from "@/app/cars/Modules/CarInterface";
import { useParams } from 'next/navigation';

export default function Page() {
    const [carData, setCarData] = useState<Car | null>(null); // Set initial state as null or empty Car object
    const [isLoading, setIsLoading] = useState(true);
    const params = useParams();
    console.log("ID :", params.id)
    let carId = params.id

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`/api/cars/${carId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const responseData = await response.json();
                setCarData(responseData.car);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [carId]);

    console.log("DATA :", carData);

    const handleFormSubmit = (formData: Car) => {
        // Handle form submission, e.g., save the data to the backend
        console.log("Edited: ", formData);
    };

    return (
        <>
            <p>{carId}</p>
            {carData && (
                <CarForm car={carData} onSubmit={handleFormSubmit} />
            )}
        </>
    )
}
