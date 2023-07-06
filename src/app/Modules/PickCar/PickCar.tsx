"use client"
import CarsPage from "./Cars/CarPage";
import React, { useEffect, useState } from 'react';
import { Car } from "@/app/cars/Modules/CarInterface";



export default function Pick() {
    const [carData, setCarData] = useState<Car[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/cars'); // Replace with your API endpoint
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const responseData = await response.json();
                setCarData(responseData.cars); // Assuming the cars array is nested within the "cars" property
                setIsLoading(false); // Mark loading as complete
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);




    return (
        <>
            <div className="flex justify-center items-center ">
                <div className="flex flex-col text-center items-center">
                    <p className="font-sohogothicpro font-medium text-[15px] leading-[22px] tracking-[-0.02em] uppercase text-[#33B888]">
                        Our collection
                    </p>
                    <h1 className="text-[42px] font-sohogothicpro italic font-bold leading-[63px] tracking-[-0.05em] text-[#313131]">
                        Pick your ideal premium car
                    </h1>
                    <p className="mt-[15px] w-[296px] sm:w-[470px] text-[16px] leading-[24px] tracking-[-0.05em] text-[#313131]">
                        Consider your needs and preferences when choosing a rental car.
                        This will help you choose the best car for a comfortable and enjoyable rental experience.
                    </p>
                </div>
            </div>
            <div className="mt-[79px]">
                <CarsPage car={carData} />
            </div>
        </>
    )
}