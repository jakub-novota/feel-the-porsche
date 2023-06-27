"use client"
import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

export default function MyForm() {
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
        setShowMore(true);
    };

    const handleClose = () => {
        setShowMore(false);
    };

    return (
        <div className='h-screen flex justify-center items-center flex-col'>
            <div className="flex flex-col w-[268px] items-center justify-center bg-white rounded-[24px] sm:rounded-[90px] border-red shadow-[0px_20px_60px_rgba(74,80,83,0.3)] p-4 sm:w-[975px]">
                <div ref={formRef} className="grid grid-cols-1 gap-4 sm:grid-cols-[1fr,1fr,1fr,1fr,auto]">
                    <div className="relative">
                        <h2 className="text-[14px] leading-[17px] font-medium tracking-[-0.05em]">Which</h2>
                        <select
                            defaultValue="default"
                            className="mt-[7px] rounded appearance-none focus:outline-none text-[18px] leading-[22px] tracking-[-0.05em] text-[#D6D6D6]"
                        >
                            <option value="default" disabled hidden>
                                Car model
                            </option>
                            <option value="">Option 1</option>
                            <option value="">Option 2</option>
                            <option value="">Option 3</option>
                        </select>
                        <div className="absolute right-0 top-0 hidden h-full min-h-[1em]  self-stretch border-t-0 bg-gradient-to-tr from-transparent via-[#BCBCBC] to-transparent opacity-25 dark:opacity-100 lg:block"></div>
                    </div>
                    <div className="relative">
                        <h2 className="text-[14px] leading-[17px] font-medium tracking-[-0.05em]">Location</h2>
                        <select
                            defaultValue="default"
                            className="mt-[7px] rounded appearance-none focus:outline-none text-[18px] leading-[22px] tracking-[-0.05em] text-[#D6D6D6]"
                        >
                            <option value="default" disabled hidden>
                                Location
                            </option>
                            <option value="">Option 1</option>
                            <option value="">Option 2</option>
                            <option value="">Option 3</option>
                        </select>
                        <div className="absolute right-0 top-0 hidden h-full min-h-[1em]  self-stretch border-t-0 bg-gradient-to-tr from-transparent via-[#BCBCBC] to-transparent opacity-25 dark:opacity-100 lg:block"></div>
                    </div>

                    {showMore && (
                        <>
                            <div className="relative">
                                <h2 className="text-[14px] leading-[17px] font-medium tracking-[-0.05em]">Pick Up</h2>
                                <div className="flex mt-[7px]">
                                    <input
                                        type="date"
                                        className="rounded appearance-none focus:outline-none text-[18px] leading-[22px] tracking-[-0.05em] text-[#D6D6D6]"
                                        defaultValue="2023-09-22"
                                    />
                                    <input
                                        type="time"
                                        className="rounded appearance-none focus:outline-none text-[18px] leading-[22px] tracking-[-0.05em] text-[#D6D6D6]"
                                        defaultValue="12:00"
                                    />
                                </div>
                                <div className="absolute right-0 top-0 hidden h-full min-h-[1em] w-px self-stretch border-t-0 bg-gradient-to-tr from-transparent via-[#BCBCBC] to-transparent opacity-25 dark:opacity-100 lg:block"></div>
                            </div>

                            <div className="relative">
                                <h2 className="text-[14px] leading-[17px] font-medium tracking-[-0.05em]">Drop Off</h2>
                                <div className="flex mt-[7px]">
                                    <input
                                        type="date"
                                        className="date-input rounded appearance-none focus:outline-none text-[18px] leading-[22px] tracking-[-0.05em] text-[#D6D6D6]"
                                        defaultValue="2023-09-22"
                                    />
                                    <input
                                        type="time"
                                        className="time-input rounded appearance-none focus:outline-none text-[18px] leading-[22px] tracking-[-0.05em] text-[#D6D6D6]"
                                        defaultValue="12:00"
                                    />
                                </div>
                            </div>

                            <div className="relative  hidden sm:block">
                                <button className="w-[62px] h-[62px] rounded-full bg-[#4E5860] flex justify-center items-center">
                                    <Image width={19} height={19} src="./svg/search.svg" alt="search" />
                                </button>
                            </div>

                            <button className="bg-[#4E5860] w-[208px] h-[52px] text-white font-bold py-2 px-4 rounded mt-4 text-left">
                                Submit
                            </button>
                        </>
                    )}

                </div>
            </div>
            {!showMore && (
                <div className="flex justify-center mt-4">
                    <button onClick={handleShowMore} className=" text-black font-bold py-2 px-4 rounded">
                        Show More
                    </button>
                </div>
            )}
        </div>
    );
}
