"use client"
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { usePathname } from 'next/navigation'
import AnimatedArrow from '@/app/Modules/Svg_Module/Arrow';
import Information from '../Modules/Information';
import PriceOffer from '../Modules/PriceOffer';
import carData from '@/app/json/cars.json';
import Galery from '../Modules/Galery';

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
            <div className=' relative w-full h-[690px] '>
                <Image fill priority quality={100} src="/Detail/image6.png" alt="Image" style={{ objectFit: "cover" }} />
                <div className="absolute bottom-0 left-0 ml-[168px] mb-[25px]">
                    <div className='flex  space-x-[25px]'>
                        <AnimatedArrow direction="left" color="white" circleColor="#ffffffcc" strokeWidth={2} circleStrokeWidth={2} circleFill="#ffffffcc" />
                        <AnimatedArrow direction="right" color="white" circleColor="inherit" strokeWidth={2} circleStrokeWidth={2} circleFill="#33B888" />
                    </div>
                </div>
            </div>
            {params.id}
            <div className="flex">
                <div className="flex-grow 2xl:ml-[10%]">
                    <Information carId={parseInt(params.id)} />
                </div>
                <div className="w-[30%] flex justify-center 2xl:justify-ends ">
                    <PriceOffer />
                </div>
            </div>
            <div className='mt-[57px]'>
                <Galery />
            </div>

        </>
    )



}