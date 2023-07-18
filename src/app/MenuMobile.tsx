"use client"
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import MenuCloseIcon from './Modules/Svg_Module/Menu_Close';
import CallIcon from './Modules/Svg_Module/CallIcon';
import MenuIcon from './Modules/Svg_Module/Menu_Open';
import { motion, AnimatePresence } from 'framer-motion';


interface Car {
    _id: string; // Adjust the type based on your actual car data structure
}

export default function MenuMobile() {
    const [showOverlay, setShowOverlay] = useState(false);
    const pathname = usePathname();
    const isCarsPage = pathname === '/cars';
    const isServicesPage = pathname === '/services';
    const isAboutPage = pathname === '/about-us';
    const isFaqPage = pathname === '/faq';
    const [isDetailsPage, setIsDetailsPage] = useState(false);
    const isHomePage = pathname === '/';
    let menuIconColor = isDetailsPage ? 'white' : 'black';

    if (isCarsPage || isServicesPage || isAboutPage || isFaqPage) {
        menuIconColor = 'black';
    } else {
        menuIconColor = "white"
    }

    const toggleOverlay = () => {
        setShowOverlay(!showOverlay);
    };

    useEffect(() => {
        if (showOverlay) {
            document.body.style.overflow = 'hidden'; // Disable scrolling
        } else {
            document.body.style.overflow = 'unset'; // Enable scrolling
        }
    }, [showOverlay]);

    const [carData, setCarData] = useState<Car[]>([]); // Provide explicit type for carData
    const [isLoading, setIsLoading] = useState(true); // State to track loading state

    useEffect(() => {
        if (pathname.startsWith('/cars/')) {
            const fetchData = async () => {
                try {
                    const response = await fetch('/api/cars'); // Replace with your API endpoint
                    if (!response.ok) {
                        throw new Error('Failed to fetch data');
                    }
                    const responseData = await response.json();
                    setCarData(responseData.cars);
                    setIsLoading(false);
                } catch (error) {
                    console.error('Error fetching data:', error);
                    setIsLoading(false);
                }
            };

            fetchData();
        }
    }, [pathname]);

    useEffect(() => {
        if (!isLoading) {
            const carIds = carData.map(car => car._id);
            const matchedCarId = carIds.find(id => pathname === `/cars/${id}`);

            if (matchedCarId) {
                setIsDetailsPage(true);
            } else {
                setIsDetailsPage(false);
            }
        }
    }, [pathname, carData, isLoading]);

    return (
        <>
            <nav
                className={`z-50 ${isDetailsPage ? 'absolute top-0' : ''} ${isHomePage ? 'absolute top-0' : ''
                    } left-0 w-screen ${isCarsPage ? 'bg-[#F2F6F8]' : ''}`}
            >
                <div className="w-screen mt-[10px] h-[74px]">
                    <div className="pl-[23px] pr-[31px] flex">
                        <Link href="/">
                            <Image
                                priority
                                width={72}
                                height={0}
                                src="/menu/Logo.svg"
                                alt="Logo"
                                className="w-full h-auto"
                            />
                        </Link>
                        <div className="flex justify-end items-center w-full">
                            <button
                                type="button"
                                className="flex items-center w-[147px] h-[38px] bg-[#30B887] rounded-[8px] justify-center"
                            >
                                <CallIcon />
                                <p className="text-[14px] font-sohogothicpro uppercase font-medium tracking-[0.28px] text-white">
                                    Contact us
                                </p>
                            </button>
                            <motion.button
                                className="ml-[5%]"
                                onClick={toggleOverlay}
                                whileTap={{ scale: 0.95 }}
                                transition={{ duration: 0.1 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0 }}
                            >
                                <MenuIcon color={menuIconColor} />
                            </motion.button>
                        </div>
                    </div>
                </div>
            </nav>
            <AnimatePresence>
                {showOverlay && (
                    <motion.div
                        className="z-50 fixed inset-0 flex items-center justify-center backdrop-blur-[20px]"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <div className="absolute inset-0 bg-black opacity-[0.75] "></div>
                        <div className="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center ">
                            <Link href="/" className="absolute top-0 left-0 ml-[23px] mt-[10px] h-[64px] w-[59px]">
                                <Image
                                    priority
                                    fill
                                    src="/menu/Logo.svg"
                                    alt="Logo"
                                />
                            </Link>

                            <motion.button
                                className="absolute top-0 right-0 mr-[21px] mt-[20px] text-white"
                                onClick={toggleOverlay}
                                whileTap={{ scale: 0.95 }}
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.2 }}
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0 }}
                            >
                                <MenuCloseIcon />
                            </motion.button>
                            <ul className="text-white uppercase text-[16px] text-center font-medium tracking-[-0.8px] space-y-[50px]">
                                <li>
                                    <Link href="/" onClick={toggleOverlay}>
                                        Home
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/about-us" onClick={toggleOverlay}>
                                        About us
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/#service" onClick={toggleOverlay}>
                                        Services
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/#faq" onClick={toggleOverlay}>
                                        FAQ
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/cars" onClick={toggleOverlay}>
                                        Cars
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
