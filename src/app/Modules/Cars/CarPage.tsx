"use client"

import React, { useEffect, useRef, useState } from "react";
import CarCard from './CarCard';
import carsData from '@/app/json/cars.json';
import SwiperCore, { Navigation, Autoplay, Pagination } from 'swiper';
import AnimatedArrow from "@/app/Modules/Svg_Module/Arrow";
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

SwiperCore.use([Navigation]);

const CarsPage: React.FC = () => {
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

    return (
        <div className="relative">
            <Swiper slidesPerView={1} onSwiper={(swiper) => (swiperRef.current = swiper)}>
                {carsData.map((car, index) => (
                    <SwiperSlide key={index}>
                        <div className="flex justify-center">
                            <CarCard key={index} car={car} />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
            <button className="z-40 absolute top-1/4 mt-[25px] sm:mt-0 left-[37vw]  sm:top-1/4 sm:left-2 sm:transform sm:-translate-y-1/2" onClick={showPreviousCar}>
                <AnimatedArrow
                    direction="left"
                    color={isFirstSlide ? "#E0E8E5" : "#33B888"}
                    circleColor={isFirstSlide ? "#E0E8E5" : "#33B888"}
                    strokeWidth={2}
                    circleStrokeWidth={2}
                    circleFill="inherit"
                />
            </button>
            <button className="z-40  absolute top-1/4 mt-[25px] sm:mt-0 right-[37vw] sm:top-1/4 sm:right-2 sm:transform sm:-translate-y-1/2" onClick={showNextCar} >
                <AnimatedArrow
                    direction="right"
                    color={isLastSlide ? "#E0E8E5" : "#33B888"}
                    circleColor={isLastSlide ? "#E0E8E5" : "#33B888"}
                    strokeWidth={1.5}
                    circleStrokeWidth={2}
                    circleFill="inherit"
                />
            </button>
        </div>
    );
};

export default CarsPage;
