"use client"
import { useState, useEffect } from 'react';
import Information from '../Modules/Information';
import PriceOffer from '../Modules/PriceOffer';
import Galery from '../Modules/Galery';
import Cover from '../Modules/DetalCover';
import InterestCars from '../Interest/Interest';
import InterestCarsMobil from '../Interest/InterestMobil';
import { Car } from '../Modules/CarInterface';
import { useParams } from 'next/navigation';

export default function Page() {
    const [car, setCar] = useState<Car | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const params = useParams();
    // console.log(params.id)
    useEffect(() => {
        const fetchCar = async () => {
            try {
                const response = await fetch(`/api/cars/${params.id}`); // Replace with your API endpoint
                if (!response.ok) {
                    throw new Error('Failed to fetch car');
                }
                const carData: Car = await response.json();
                setCar(carData);
                setCar(carData.car); // Assuming the cars array is nested within the "cars" property

                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching car:', error);
                setIsLoading(false);
            }
        };

        fetchCar();
    }, [params.id]);

    if (isLoading) {
        return <div className='h-screen w-screen flex justify-center items-center'>Loading...</div>;
    }

    if (!car) {
        return <div className='h-screen w-screen flex justify-center items-center'>Car does not exist.</div>;
    }
    //console.log(car)
    return (
        <>
            <div className='z-20'>
                <Cover carImagesURL={JSON.stringify(car.gallery)} />
            </div>
            {params.id}
            <div className="flex ">
                <div className="flex-grow 2xl:ml-[10%] ">
                    <Information carData={car} />
                </div>
                <div className="z-40 hidden  w-[30%] xl:flex 2xl:mr-[5vw] ">
                    <PriceOffer />
                </div>
            </div>
            <div className='mt-[57px]'>
                <Galery carGalleryURL={JSON.stringify(car.gallery)} />
            </div>
            <div className='mt-[68px] lg:hidden mb-[200px] '>
                <InterestCarsMobil excludedId={car.id} />
            </div>
            <div className='mt-[68px] hidden lg:block mb-[200px] '>
                <InterestCars car={car} />
            </div>
        </>
    );
}
