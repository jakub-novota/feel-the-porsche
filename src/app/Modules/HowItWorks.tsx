import React from 'react';
import Image from 'next/image';

const Cards: React.FC = () => {
    return (
        <div className="flex justify-center">
            <div className="grid grid-rows-7 grid-flow-col">
                <div className="row-start-1 mt-[34px] row-span-2  relative">
                    <div className="card bg-cardhome w-[310px] h-[338px] rounded-[12px]  flex flex-col items-center">
                        <h1 className="text-[#313131] font-sohogothicpro font-bold text-[28px] leading-[42px] tracking-[-0.05em] pt-[22px]">
                            Choose car
                        </h1>
                        <p className="text-[#313131] pt-[21px]  max-w-[240px] text-[15px] leading-[20px] tracking-[-0.05em]  pb-[53px] whitespace-pre-line">
                            When selecting a premium car for rental, consider your budget and desired level of luxury.
                            <br />
                            <br />
                            Premium cars typically offer advanced features and luxurious amenities, but they can also be more expensive than standard rental cars.
                        </p>
                    </div>
                    <div className="absolute bottom-[-3rem] right-0 text-5xl font-bold text-black p-2">
                        <p className="text-[100px] leading-[150px] tracking-[-0.05em] font-sohogothicpro font-medium  text-[#4E5860]">01</p>
                    </div>
                </div>

                <div className="row-start-2 mt-[34px] row-span-2">
                    <Image
                        width={86}
                        height={0}
                        src="./svg/arrow.svg"
                        alt="Arrow"
                    />
                </div>

                <div className="row-start-1 mt-[65px] row-span-2  relative">
                    <div className="card bg-cardhome  w-[310px] h-[338px] rounded-[12px]   flex flex-col items-center">
                        <h1 className="text-[#313131] font-sohogothicpro font-bold text-[28px] leading-[42px] tracking-[-0.05em] pt-[22px]">
                            Choose location
                        </h1>
                        <p className="text-[#313131] pt-[21px]  max-w-[240px] text-[15px] leading-[20px] tracking-[-0.05em]  pb-[53px] whitespace-pre-line">
                            Choose a location that is convenient for your travel plans. Consider renting at the airport for convenience, but keep in mind it may be more expensive.
                            <br />
                            <br />
                            Renting from a location near your destination may be more affordable and convenient for driving during your stay.
                        </p>
                    </div>
                    <div className="absolute bottom-[-4.5rem] right-0 text-5xl font-bold text-black p-2">
                        <p className="text-[100px] leading-[150px] tracking-[-0.05em] font-sohogothicpro font-medium  text-[#4E5860]">02</p>
                    </div>
                </div>

                <div className="row-start-2 mt-[34px] row-span-2">
                    <Image
                        width={86}
                        height={0}
                        src="./svg/arrow_down.svg"
                        alt="Arrow"
                    />
                </div>

                <div className="row-start-1 mt-[34px] row-span-2  relative">
                    <div className="card bg-cardhome w-[310px] h-[338px]  rounded-[12px]  flex flex-col items-center">
                        <h1 className="text-[#313131] font-sohogothicpro font-bold text-[28px] leading-[42px] tracking-[-0.05em] pt-[22px]">
                            Pick the date
                        </h1>
                        <p className="text-[#313131] pt-[21px]  max-w-[240px] text-[15px] leading-[20px] tracking-[-0.05em]  pb-[53px] whitespace-pre-line">
                            When choosing your car rental dates, consider your travel plans and choose a pick-up time that allows for potential delays.
                            <br />
                            <br />
                            Plan for enough time to return the car before the rental agreement expires, and consider the rental location&apos;s hours of operation when selecting a return time.
                        </p>
                    </div>
                    <div className="absolute bottom-[-3rem] right-0 text-5xl font-bold text-black p-2">
                        <p className="text-[100px] leading-[150px] tracking-[-0.05em] font-sohogothicpro font-medium  text-[#4E5860]">03</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default function HowItWorks() {
    return (
        <div className="bg-[#F2F6F8]">
            <div className="flex  flex-col items-center pt-[41px]">
                <p className="font-sohogothicpro font-medium text-[15px] leading-[22px] tracking-[-0.05em] uppercase text-[#4E5860]">3 easy steps</p>
                <h1 className="font-sohogothicpro font-bold italic text-[42px] leading-[63px] tracking-[-0.05em] text-[#313131]">How it works?</h1>
            </div>
            <div className="pb-[123px]">
                <Cards />
            </div>
        </div>
    );
}
