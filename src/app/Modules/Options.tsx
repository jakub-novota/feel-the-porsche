"use client"
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export default function () {
    const [showMore, setShowMore] = useState(false);
    const formRef = useRef<HTMLDivElement>(null);

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

    return (
        <div className="mt-[263px] sm:mt-0">
            <div className="flex flex-col w-[268px] py-[31px] px-[30px] rounded-[24px] bg-white border-red shadow-[0px_20px_60px_rgba(74,80,83,0.3)] sm:py-0 sm:px-0 sm:rounded-[90px] sm:w-screen lg:w-[975px] sm:h-[101px] sm:items-center sm:justify-center">
                <div ref={formRef} className="grid grid-cols-1 gap-4 sm:grid-cols-[0.5fr,0.5fr,0.5fr,0.5fr,auto] lg:grid-cols-[1fr,1fr,1fr,1fr,auto] sm:gap-0">

                    <div className={`relative my-auto border-b pb-[20px] sm:border-b-0 sm:pb-0 sm:border-r sm:px-[20px] lg:pl-[57px] lg:px-[30px]`}>
                        <h2 className="text-[14px] leading-[17px] font-medium tracking-[-0.05em]">Which</h2>
                        <select defaultValue="default" className="bg-inherit w-full sm:w-auto mt-[5px] sm:mt-[7px] rounded appearance-none focus:outline-none text-[18px] leading-[22px] tracking-[-0.05em] text-[#D6D6D6]">
                            <option value="default" disabled hidden>
                                Car model
                            </option>
                            <option value="">Option 1</option>
                            <option value="">Option 2</option>
                            <option value="">Option 3</option>
                        </select>
                    </div>

                    <div className={`relative my-auto pb-[20px] sm:pb-0 sm:border-r lg:pl-[57px] sm:px-[20px] lg:mx-0 lg:px-[30px] ${showMore ? 'border-b pb-[20px]' : ''}`}>
                        <h2 className="text-[14px] leading-[17px] font-medium tracking-[-0.05em]">Location</h2>
                        <select defaultValue="default" className="bg-inherit w-full sm:w-auto lg:w-full mt-[5px] sm:mt-[7px] rounded appearance-none focus:outline-none text-[18px] leading-[22px] tracking-[-0.05em] text-[#D6D6D6]">
                            <option value="default" disabled selected hidden>
                                Where
                            </option>
                            <option value="">Option 1</option>
                            <option value="">Option 2</option>
                            <option value="">Option 3</option>
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
                                    <div className="absolute right-0 top-0 hidden h-full min-h-[1em] w-px self-stretch border-t-0 bg-gradient-to-tr from-transparent via-[#BCBCBC] to-transparent opacity-25 dark:opacity-100 sm:block"></div>
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

                                <button className="mt-[30px] bg-[#4E5860] w-[208px] h-[52px] text-white font-bold py-2 px-4 rounded text-left">
                                    Submit
                                </button>
                            </motion.div>

                        )}
                    </AnimatePresence>


                    {/* For Desktop */}
                    <div
                        className="hidden sm:block relative sm:px-[20px]  lg:px-[30px] my-auto  border-r"
                    >
                        <h2 className="text-[14px] leading-[17px] font-medium tracking-[-0.05em]">Pick Up</h2>
                        <div className=" flex mt-[7px]">
                            <input
                                type="date"
                                className="bg-inherit rounded appearance-none focus:outline-none text-[18px] leading-[22px] tracking-[-0.05em] text-[#D6D6D6]"
                                defaultValue="2023-09-22"
                            />
                            <input
                                type="time"
                                className="bg-inherit rounded appearance-none focus:outline-none text-[18px] leading-[22px] tracking-[-0.05em] text-[#D6D6D6]"
                                defaultValue="12:00"
                            />
                        </div>
                    </div>

                    <div

                        className="hidden sm:block relative sm:px-[20px] lg:px-[30px] my-auto "
                    >
                        <h2 className="text-[14px] leading-[17px] font-medium tracking-[-0.05em]">Drop Off</h2>
                        <div className="flex mt-[7px] ">
                            <input
                                type="date"
                                className="bg-inherit date-input rounded appearance-none focus:outline-none text-[18px] leading-[22px] tracking-[-0.05em] text-[#D6D6D6]"
                                defaultValue="2023-09-22"
                            />
                            <input
                                type="time"
                                className="bg-inherit time-input rounded appearance-none focus:outline-none text-[18px] leading-[22px] tracking-[-0.05em] text-[#D6D6D6]"
                                defaultValue="12:00"
                            />
                        </div>
                    </div>

                    <div
                        className="hidden sm:flex relative sm:ml-[10px] lg:px-[30px]"
                    >
                        <button className="w-[62px] h-[62px] rounded-full bg-[#4E5860] flex justify-center items-center">
                            <Image width={19} height={19} src="./svg/search.svg" alt="search" />
                        </button>
                    </div>

                </div>
            </div>

            <div className="sm:hidden">
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
