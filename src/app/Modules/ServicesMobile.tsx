"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.min.css';

interface BoxProps {
    imageSrc: string;
    title: string;
    text: string;
}

const Box: React.FC<BoxProps> = ({ imageSrc, title, text }) => {
    return (
        <div className="box flex flex-col items-center">
            <div className='bg-[#081625] p-[27px] rounded-[12px]'>
                <Image src={imageSrc} priority alt={title} width={46} height={46} />
            </div>
            <h1 className='mt-[26px] mb-[12px] font-sohogothicpro font-medium text-[26px] leading-[23px] tracking-[-0.05em] text-white'>{title}</h1>
            <p className='text-center max-w-[279px] font-medium text-[14px] leading-[23px] text-[#BBBBBB] '>{text}</p>
        </div>
    );
};

const ServicesMobile: React.FC = () => {
    const [activeSlideIndex, setActiveSlideIndex] = useState(0);

    const handleSlideChange = (swiper: any) => {
        setActiveSlideIndex(swiper.activeIndex);
    };


    const services = [
        {
            imageSrc: '/svg/icon.svg',
            title: 'Movie / advertising',
            text: 'We offer the possibility of renting cars for movie and advertising production. This can be a great option for filmmakers and advertisers looking for high-end vehicles for their projects. Be sure to inquire about any additional fees or requirements for using the rental car in a film or advertisement.',
        },
        {
            imageSrc: '/svg/icon2.svg',
            title: 'Wedding / PR events',
            text: 'Our premium car selection could be great option for couples or event planners looking to add a touch of luxury or elegance to their special day. We offer a range of vehicles, including luxury cars, vintage models, and even limousines, and can provide personalized service to ensure that the rental meets the specific needs of the event.',
        },
        {
            imageSrc: '/svg/icon3.svg',
            title: 'Personal',
            text: 'Renting a premium car can be a great option for personal use, whether for a special occasion or just to treat yourself to a luxurious driving experience. With high-end features and amenities, a premium rental car can provide a level of comfort and convenience that is unmatched by standard rental cars.',
        },
    ];

    return (
        <div className="container relative">
            <div className="z-40 absolute w-screen">
                <div className='flex flex-col items-center pt-[60px] sm:pt-[100px]'>
                    <p className="font-sohogothicpro font-medium text-[15px] leading-[22px] tracking-[-0.02em] uppercase text-[#33B888]">services</p>
                    <h1 className='text-center mt-[5px] font-sohogothicpro font-bold italic text-[42px] leading-[63px] tracking-[-0.05em] text-white '>Which occasion?</h1>
                </div>
                <div className='mt-[48px]'>
                    <Swiper
                        slidesPerView={1}
                        className="mySwiper"
                        onSlideChange={handleSlideChange}
                    >
                        {services.map((service, index) => (
                            <SwiperSlide key={index}>
                                <Box
                                    imageSrc={service.imageSrc}
                                    title={service.title}
                                    text={service.text}
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>

                </div>
                <div className="flex justify-center mt-[82px]">
                    {services.map((service, index) => (
                        <div
                            key={index}
                            className={`h-[10px] w-[10px]  mx-[10px] ${activeSlideIndex === index ? 'bg-[#D9D9D9]' : 'bg-[#4E5860]'}`}
                        ></div>
                    ))}
                </div>
            </div>

            <div className="relative w-screen h-[714px] sm:h-[711px] bg-[#12385B]">
                <div className="absolute top-0 left-0 right-0 bottom-0">
                    <Image src="/Home/bg-services-02.png" alt="Main Image" fill sizes="() 100vw" />
                </div>
            </div>
        </div>
    );
};

export default ServicesMobile;
