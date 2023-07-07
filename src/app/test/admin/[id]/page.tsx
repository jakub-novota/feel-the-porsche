"use client"
import CarForm from "./modules/createcar";
import React, { useEffect, useState } from 'react';
import { Car } from "@/app/cars/Modules/CarInterface";
import { useParams } from 'next/navigation';

export default function Page() {
    const [carData, setCarData] = useState<Car | null>(null); // Set initial state as null or empty Car object
    const [isLoading, setIsLoading] = useState(true);
    const params = useParams();
    //console.log("ID :", params.id)
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

    //console.log("DATA :", carData);
    const handleFormSubmit = (formData: Car) => {
        const { _id, ...updatedData } = formData;

        // Make the PUT request to the API
        fetch(`/api/cars/${_id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedData),
        })
            .then((response) => response.json())
            .then((data) => {
                // Handle the response from the API
                console.log('Updated car:', data);
            })
            .catch((error) => {
                // Handle any errors that occur during the request
                console.error('Error updating car:', error);
            });
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
