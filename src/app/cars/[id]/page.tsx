"use client"
import { useParams } from 'next/navigation';
import Information from '../Modules/Information';
import PriceOffer from '../Modules/PriceOffer';
import carData from '@/app/json/cars.json';
import Galery from '../Modules/Galery';
import Cover from '../Modules/DetalCover';
import InterestCars from '../Interest/Interest';
import InterestCarsMobil from '../Interest/InterestMobil';

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
                <div className="z-40 hidden  w-[30%] xl:flex 2xl:mr-[5vw] ">
                    <PriceOffer />
                </div>
            </div>
            <div className='mt-[57px]'>
                <Galery carId={parseInt(params.id)} />
            </div>
            <div className='mt-[68px] lg:hidden mb-[200px] '>
                <InterestCarsMobil excludedId={parseInt(params.id)}/>
            </div>
            <div className='mt-[68px] hidden lg:block mb-[200px] '>
                <InterestCars excludedId={parseInt(params.id)} />
            </div>

        </>
    )



}