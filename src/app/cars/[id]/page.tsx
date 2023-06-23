"use client"
import { useParams } from 'next/navigation';
import { usePathname } from 'next/navigation'
import Information from '../Modules/Information';
import PriceOffer from '../Modules/PriceOffer';
import carData from '@/app/json/cars.json';
import Galery from '../Modules/Galery';
import Cover from '../Modules/DetalCover';

export default function Page() {
    const params = useParams();
    const pathname = usePathname()
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
                <div className="flex-grow 2xl:ml-[10%]">
                    <Information carId={parseInt(params.id)} />
                </div>
                <div className="z-40 w-[30%] flex justify-center 2xl:justify-ends ">
                    <PriceOffer />
                </div>
            </div>
            <div className='mt-[57px]'>
                <Galery carId={parseInt(params.id)} />
            </div>

        </>
    )



}