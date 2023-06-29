"use client"
import { useParams } from 'next/navigation';
import Information from '../Modules/Information';
import PriceOffer from '../Modules/PriceOffer';
import carData from '@/app/json/cars.json';
import Galery from '../Modules/Galery';
import Cover from '../Modules/DetalCover';
import InterestCars from '../Interest/Interest';

export default function Page() {
    const params = useParams();
    const carId = parseInt(params.id)

    const car = carData.find((car) => car.id === carId);
    if (!car) {
        return <div className='h-screen w-screen flex justify-center items-center'>Car does not exist.</div>;
    }

    return (
        <>
            <div className='z-20'>
                <Cover carId={parseInt(params.id)} />
            </div>
            {params.id}
            <div className="flex ">
                <div className="flex-grow 2xl:ml-[10%] ">
                    <Information carId={parseInt(params.id)} />
                </div>
                <div className="z-40 hidden  w-[30%] sm:flex justify-center 2xl:justify-ends ">
                    <PriceOffer />
                </div>
            </div>
            <div className='mt-[57px]'>
                <Galery carId={parseInt(params.id)} />
            </div>
            <div className='mt-[68px] mb-[200px] hidden'>
                <InterestCars excludedId={parseInt(params.id)} />
            </div>

        </>
    )



}