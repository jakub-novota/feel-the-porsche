"use client"
import { useState, useEffect } from 'react';
import Information from '../Modules/Information';
import PriceOffer from '../Modules/PriceOffer';
import Galery from '../Modules/Galery';
import Cover from '../Modules/DetalCover';
import InterestCars from '../Interest/Interest';
import InterestCarsMobil from '../Interest/InterestMobil';
import { Car } from '../Modules/CarInterface';
import { useParams, useSearchParams } from 'next/navigation';

export default function Page() {
    const [car, setCar] = useState<Car | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const params = useParams();
    const searchParams = useSearchParams()
    const location = searchParams.get('location')
    const pickupdate = searchParams.get('pickupdate')
    const pickuptime = searchParams.get('pickuptime')
    const dropofdate = searchParams.get('dropofdate')
    const dropoftime = searchParams.get('dropoftime')
    //console.log("Params: ", params.id, location, pickupdate, pickuptime, dropofdate, dropoftime)

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
        return (
            <div className='h-screen w-screen flex justify-center items-center'>
                <div role="status">
                    <svg aria-hidden="true" className="w-8 h-8 mr-2 text-gray-200 animate-spin  fill-[#30B887]" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                    </svg>
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        );
    }

    if (!car) {
        return (
            <div className='h-screen w-screen flex justify-center items-center text-center'>
                <p>
                    Apologies, the car does not exist.
                    <br /> Please verify the details or contact support for assistance.
                </p>
            </div>
        );
    }
    return (
        <>
            <div className='z-20'>
                <Cover carImagesURL={JSON.stringify(car.gallery)} />
            </div>
            <div className="flex ">
                <div className="flex-grow 2xl:ml-[10%] ">
                    <Information carData={car} />
                </div>
                <div className="z-40 hidden  w-[30%] xl:flex 2xl:mr-[5vw] ">
                    <PriceOffer pickUp={pickupdate ?? undefined} dropOff={dropofdate ?? undefined} />
                </div>
            </div>
            <div className='mt-[57px]'>
                <Galery carGalleryURL={JSON.stringify(car.gallery)} />
            </div>
            <div className='mt-[68px] lg:hidden mb-[200px] '>
                <InterestCarsMobil car={car} />
            </div>
            <div className='mt-[68px] hidden lg:block mb-[200px] '>
                <InterestCars car={car} />
            </div>
        </>
    );
}
