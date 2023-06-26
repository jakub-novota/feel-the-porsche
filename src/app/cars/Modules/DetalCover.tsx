import React, { useEffect, useRef, useState } from "react";
import Image from 'next/image';
import 'swiper/swiper.min.css';
import AnimatedArrow from '@/app/Modules/Svg_Module/Arrow';
import SwiperCore, { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import CarsJSON from '@/app/json/cars.json';
import { Car } from './CarInterface';

interface GalleryProps {
    carId: number;
}

SwiperCore.use([Navigation]);

export default function Gallery({ carId }: GalleryProps) {
    const selectedCar = CarsJSON.find((car: Car) => car.id === carId);
    const swiperRef = React.useRef<SwiperCore | null>(null);
    const [isLastSlide, setIsLastSlide] = useState(false);
    const [isFirstSlide, setIsFirstSlide] = useState(true);

    const showNextCar = () => {
        if (swiperRef.current && swiperRef.current.slideNext) {
            swiperRef.current.slideNext();
        }
    };

    const showPreviousCar = () => {
        if (swiperRef.current && swiperRef.current.slidePrev) {
            swiperRef.current.slidePrev();
        }
    };

    const handleSlideChange = (swiper: SwiperCore) => {
        const activeIndex = swiper.activeIndex;
        const totalSlides = swiper.slides.length;
        setIsFirstSlide(activeIndex === 0);
        setIsLastSlide(activeIndex === totalSlides - 1);
    };

    useEffect(() => {
        if (swiperRef.current) {
            swiperRef.current.on("slideChange", handleSlideChange);
        }
    }, []);


    if (!selectedCar) {
        return <div>Loading...</div>;
    }

    const images = Object.values(selectedCar.gallery);
    return (
        <>
            <div className='relative'>
                <Swiper
                    slidesPerView={1}
                    onSwiper={(swiper) => (swiperRef.current = swiper)}
                >
                    {images.map((imageUrl, index) => (
                        <React.Fragment key={(index + "cover")}>
                            <SwiperSlide key={(index + "cover")}>
                                <div className='z-10 relative w-full h-[660px] '>
                                    <Image className='z-10' src={imageUrl} alt={`Image ${index + 1}`} priority quality={100} fill style={{ objectFit: "cover" }} />
                                </div>
                            </SwiperSlide>
                        </React.Fragment>
                    ))}
                </Swiper >
                <div className="z-40 absolute bottom-0 left-0 ml-[168px] mb-[25px]">
                    <div className='flex  space-x-[25px] mb-[25px]'>
                        <button
                            className="z-40 ml-[20px] absolute top-1/2 left-2 transform -translate-y-1/2"
                            onClick={showNextCar}
                        >
                            <AnimatedArrow
                                direction="right"
                                circleColor={isLastSlide ? "inherit" : "#33B888"}
                                color={isLastSlide ? "#9AA9BF" : "white"}
                                circleFill={isLastSlide ? "#ffffffcc" : "#33B888"}
                                strokeWidth={2}
                                circleStrokeWidth={2}
                            />
                        </button>
                        <button
                            className="z-40 mr-[20px] absolute top-1/2 right-2 transform -translate-y-1/2"
                            onClick={showPreviousCar}
                        >
                            <AnimatedArrow
                                direction="left"
                                circleColor={isFirstSlide ? "inherit" : "#33B888"}
                                color={isFirstSlide ? "#9AA9BF" : "white"}
                                circleFill={isFirstSlide ? "#ffffffcc" : "#33B888"}
                                strokeWidth={2}
                                circleStrokeWidth={2}
                            />
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}