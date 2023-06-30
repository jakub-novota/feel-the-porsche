"use client"
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import carModels from '@/app/json/cars.json'; // Update the path to carModels.json
import Link from 'next/link';

interface SelectedCar {
    id: number;
    name: string;
}

export default function Options() {
    const [showMore, setShowMore] = useState(false);
    const [carModelOptions, setCarModelOptions] = useState<{ id: number; name: string; }[]>([]);
    const [selectedCarModel, setSelectedCarModel] = useState("default");
    const [selectedLocation, setSelectedLocation] = useState("default");
    const [pickupDate, setPickupDate] = useState("2023-09-22");
    const [pickupTime, setPickupTime] = useState("12:00");
    const [dropOffDate, setDropOffDate] = useState("2023-09-22");
    const [dropOffTime, setDropOffTime] = useState("12:00");
    const formRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Fetch car models from the JSON file
        setCarModelOptions(carModels);
    }, []);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (formRef.current && !formRef.current.contains(event.target as Node)) {
                setShowMore(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleShowMore = () => {
        setShowMore(!showMore);
    };

    const handleCarModelChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCarModel(event.target.value);
    };

    const handleLocationChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedLocation(event.target.value);
    };

    const handlePickupDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPickupDate(event.target.value);
    };

    const handlePickupTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPickupTime(event.target.value);
    };

    const handleDropOffDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedValue = event.target.value;
        setDropOffDate(selectedValue);
    };

    const handleDropOffTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedValue = event.target.value;
        setDropOffTime(selectedValue);
    };


    const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log("Selected Car ID:", selectedCarModel);
        console.log("Selected Location:", selectedLocation);
        console.log("Selected Pick up Date:", pickupDate);
        console.log("Selected Pick up Time:", pickupTime);
        console.log("Selected Drop off Date:", dropOffDate);
        console.log("Selected Drop off Time:", dropOffTime);
    };


    return (
        <div className="mt-[263px] md:mt-0">
            <div className="flex flex-col w-[268px] py-[31px] px-[30px] rounded-[24px] bg-white border-red shadow-[0px_20px_60px_rgba(74,80,83,0.3)] md:py-0 md:px-0 md:rounded-[90px] md:w-[768px] md:max-w-[975px] lg:w-[975px] md:h-[101px] md:items-center md:justify-center">
                <div ref={formRef} className="grid grid-cols-1 gap-4 md:grid-cols-[0.5fr,0.5fr,0.5fr,0.5fr,auto] lg:grid-cols-[1fr,1fr,1fr,1fr,auto] md:gap-0">
                    <form onSubmit={handleFormSubmit} className='flex '>
                        <div className={`relative my-auto border-b pb-[20px] md:border-b-0 md:pb-0 md:border-r md:px-[20px] lg:pl-[57px] lg:px-[30px]`}>
                            <div className='flex justify-between items-end'>
                                <h2 className="text-[14px] leading-[17px] font-medium tracking-[-0.05em]">Which </h2>
                                <svg className='sm:hidden' width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9 1C7.94866 2.45386 6.71804 3.7576 5.34008 4.87811C5.14022 5.04063 4.85978 5.04063 4.65992 4.87811C3.28196 3.7576 2.05134 2.45386 1 1" stroke="#475569" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <select
                                value={selectedCarModel}
                                onChange={handleCarModelChange}
                                className="bg-inherit w-full md:w-auto md:max-w-[80px] mt-[5px] md:mt-[7px] rounded appearance-none focus:outline-none text-[18px] leading-[22px] tracking-[-0.05em] text-[#D6D6D6]"
                            >
                                <option value="default" disabled hidden>
                                    Car model
                                </option>
                                {carModelOptions.map((carModel) => (
                                    <option key={carModel.id} value={carModel.id}>
                                        {carModel.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className={`relative my-auto pb-[20px] md:pb-0 md:border-r lg:pl-[57px] md:px-[20px] lg:mx-0 lg:px-[30px] ${showMore ? 'border-b pb-[20px]' : ''}`}>
                            <div className='flex justify-between items-end'>
                                <h2 className="text-[14px] leading-[17px] font-medium tracking-[-0.05em]">Location</h2>
                                <svg className='sm:hidden' width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9 1C7.94866 2.45386 6.71804 3.7576 5.34008 4.87811C5.14022 5.04063 4.85978 5.04063 4.65992 4.87811C3.28196 3.7576 2.05134 2.45386 1 1" stroke="#475569" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <select
                                value={selectedLocation}
                                onChange={handleLocationChange}
                                className="bg-inherit w-full lg:mr-[100px] md:w-auto lg:w-full mt-[5px] md:mt-[7px] rounded appearance-none focus:outline-none text-[18px] leading-[22px] tracking-[-0.05em] text-[#D6D6D6]">
                                <option value="default" disabled hidden>
                                    Where
                                </option>
                                <option value="1">Option 1</option>
                                <option value="2">Option 2</option>
                                <option value="3">Option 3</option>
                            </select>
                        </div>

                        {/* For mobile */}
                        <AnimatePresence>
                            {showMore && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="overflow-hidden"
                                >
                                    <div className="relative border-b pb-[20px] " >
                                        <h2 className="text-[14px] leading-[17px] font-medium tracking-[-0.05em]">Pick Up</h2>
                                        <div className="flex mt-[5px] space-x-[20px]">
                                            <input
                                                type="date"
                                                className="bg-inherit rounded appearance-none focus:outline-none text-[18px] leading-[22px] tracking-[-0.05em] text-[#D6D6D6]"
                                                defaultValue="2023-09-22"
                                            />
                                            <input
                                                type="time"
                                                className="bg-inherit  rounded appearance-none focus:outline-none text-[18px] leading-[22px] tracking-[-0.05em] text-[#D6D6D6]"
                                                defaultValue="12:00"
                                            />
                                        </div>
                                        <div className="absolute right-0 top-0 hidden h-full min-h-[1em] w-px self-stretch border-t-0 bg-gradient-to-tr from-transparent via-[#BCBCBC] to-transparent opacity-25 dark:opacity-100 md:block"></div>
                                    </div>

                                    <div className="relative ">
                                        <h2 className="text-[14px] leading-[17px] font-medium tracking-[-0.05em] mt-[20px]">Drop Off</h2>
                                        <div className="flex mt-[5px] space-x-[20px]">
                                            <input
                                                type="date"
                                                className="bg-inherit  date-input rounded appearance-none focus:outline-none text-[18px] leading-[22px] tracking-[-0.05em] text-[#D6D6D6]"
                                                defaultValue="2023-09-22"
                                            />
                                            <input
                                                type="time"
                                                className="bg-inherit time-input rounded appearance-none focus:outline-none text-[18px] leading-[22px] tracking-[-0.05em] text-[#D6D6D6]"
                                                defaultValue="12:00"
                                            />
                                        </div>
                                    </div>

                                    <button className="mt-[30px] flex items-center justify-between bg-[#4E5860] w-[208px] h-[52px] text-white font-bold py-[15px] px-4 rounded-[8px] text-left">
                                        Submit
                                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M17 17L11.622 11.622M11.622 11.622C12.748 10.496 13.4444 8.94044 13.4444 7.22222C13.4444 3.78578 10.6587 1 7.22222 1C3.78578 1 1 3.78578 1 7.22222C1 10.6587 3.78578 13.4444 7.22222 13.4444C8.94044 13.4444 10.496 12.748 11.622 11.622Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>
                                    </button>
                                </motion.div>

                            )}
                        </AnimatePresence>


                        {/* For Desktop */}
                        <div className="hidden md:block relative md:px-[20px]  lg:px-[30px] my-auto  border-r">
                            <h2 className="text-[14px] leading-[17px] font-medium tracking-[-0.05em]">Pick Up</h2>
                            <div className=" flex mt-[7px]">
                                <input
                                    type="date"
                                    value={pickupDate}
                                    onChange={handlePickupDateChange}
                                    className="bg-inherit rounded appearance-none focus:outline-none text-[18px] leading-[22px] tracking-[-0.05em] text-[#D6D6D6]"
                                />
                                <input
                                    type="time"
                                    value={pickupTime}
                                    onChange={handlePickupTimeChange}
                                    className="bg-inherit rounded appearance-none focus:outline-none text-[18px] leading-[22px] tracking-[-0.05em] text-[#D6D6D6]"
                                />
                            </div>
                        </div>

                        <div className="hidden md:block relative md:px-[20px] lg:px-[30px] my-auto ">
                            <h2 className="text-[14px] leading-[17px] font-medium tracking-[-0.05em]">Drop Off</h2>
                            <div className="flex mt-[7px] ">
                                <input
                                    type="date"
                                    value={dropOffDate}
                                    onChange={handleDropOffDateChange}
                                    className="bg-inherit date-input rounded appearance-none focus:outline-none text-[18px] leading-[22px] tracking-[-0.05em] text-[#D6D6D6]"
                                />
                                <input
                                    type="time"
                                    value={dropOffTime}
                                    onChange={handleDropOffTimeChange}
                                    className="bg-inherit time-input rounded appearance-none focus:outline-none text-[18px] leading-[22px] tracking-[-0.05em] text-[#D6D6D6]"
                                />
                            </div>
                        </div>

                        <div
                            className="hidden md:flex relative md:ml-[10px] lg:px-[30px]"
                        >
                            <button className="w-[62px] h-[62px] rounded-full bg-[#4E5860] flex justify-center items-center">
                                <Image width={19} height={19} src="./svg/search.svg" alt="search" />
                            </button>
                        </div>
                    </form>
                </div>
            </div >

            <div className="md:hidden">
                {!showMore && (
                    <div className="flex justify-center mt-4">
                        <button onClick={handleShowMore} className="text-black text-[16px] font-medium tracking-[-0.8px] underline">
                            Show More
                        </button>
                    </div>
                )}
            </div>
        </div >
    );
}
