"use client"
import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const Card: React.FC<{ title: string; content: string; number: string }> = ({ title, content, number }) => {
    return (
        <div className="card bg-cardhome w-[310px] h-[338px] rounded-[12px] pt-[27px] relative px-[20px]">
            <h1 className="text-[#313131] font-sohogothicpro font-bold text-[28px] tracking-[-1.4px] ">
                {title}
            </h1>
            <p className="text-[#313131] pt-[22px] w-[240px] text-[15px] leading-[20px] tracking-[-0.75px] pb-[53px] whitespace-pre-line">
                {content}
            </p>
            <div className="absolute bottom-0 right-0 ">
                <span className="relative inline-block">
                    <span className="absolute right-0 mt-[-60px] mr-[50px] text-[80px] text-[#4E5860] font-sohogothicpro font-medium tracking-[-4px]">
                        {number}
                    </span>
                </span>
            </div>
        </div>
    );
};

const cardData = [
    {
        title: "Choose location",
        content:
            "When selecting a premium car for rental, consider your budget and desired level of luxury.\n\nPremium cars typically offer advanced features and luxurious amenities, but they can also be more expensive than standard rental cars.",
        number: "01",
    },
    {
        title: "Choose location",
        content:
            "Choose a location that is convenient for your travel plans. Consider renting at the airport for convenience, but keep in mind it may be more expensive.\n\nRenting from a location near your destination may be more affordable and convenient for driving during your stay.",
        number: "02",
    },
    {
        title: "Pick the date",
        content:
            "When choosing your car rental dates, consider your travel plans and choose a pick-up time that allows for potential delays.\n\nPlan for enough time to return the car before the rental agreement expires, and consider the rental location's hours of operation when selecting a return time.",
        number: "03",
    },
];

const CardSlider: React.FC = () => {
    const [activeSlideIndex, setActiveSlideIndex] = useState(0);

    const handleSlideChange = (swiper: any) => {
        setActiveSlideIndex(swiper.activeIndex);
    };

    const breakpoints = {
        0: {
            slidesPerView: 1,
        },
        325: {
            slidesPerView: 1.15,
        },
        640: {
            slidesPerView: 1,
        },
    };

    return (
        <div>
            <Swiper slidesPerView={1.2} breakpoints={breakpoints} className="" onSlideChange={handleSlideChange}>
                {cardData.map((data, index) => (
                    <SwiperSlide key={index}>
                        <div className="flex justify-start sm:justify-center py-[50px] sm:mr-0 sm:ml-0 pl-[20px] pr-[20px]">
                            <Card title={data.title} content={data.content} number={data.number} />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
            <div className="flex justify-center">
                {cardData.map((data, index) => (
                    <div
                        key={index}
                        className={`h-[10px] w-[10px]  mx-1 ${activeSlideIndex === index ? 'bg-[#4E5860]' : 'bg-gray-400'}`}
                    ></div>
                ))}
            </div>
        </div>
    );
};

export default function MyPage() {
    return (
        <div className="bg-[#F2F6F8]  pt-[220px] pb-[50px] md:pt-0   ">
            <CardSlider />
        </div>
    );
}
