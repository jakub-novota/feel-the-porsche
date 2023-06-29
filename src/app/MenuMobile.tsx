"use client"
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import MenuCloseIcon from './Modules/Svg_Module/Menu_Close';
import CallIcon from './Modules/Svg_Module/CallIcon';
import MenuIcon from './Modules/Svg_Module/Menu_Open';
import { motion, AnimatePresence } from 'framer-motion';

export default function MenuMobile() {
    const [showOverlay, setShowOverlay] = useState(false);

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

    const pathname = usePathname();
    const isCarsPage = pathname === '/cars';
    const isDetailsPage = pathname.match(/^\/cars\/\d+$/); //To find all car ID
    const isHomePage = pathname === '/';

    return (
        <>
            <nav
                className={`z-50 ${isDetailsPage ? 'absolute top-0' : ''} ${isHomePage ? 'absolute top-0' : ''
                    } left-0 w-screen ${isCarsPage ? '' : ''}`}
            >
                <div className="w-screen mt-[10px] h-[74px]">
                    <div className="pl-[23px] pr-[31px] w-full flex">
                        <Link href="/">
                            <Image
                                priority
                                width={72}
                                height={79}
                                src="/menu/Logo.svg"
                                alt="Logo"
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
                                <MenuIcon />
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
                        <div className="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center">
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
                            <ul className="text-white text-[16px] font-medium tracking-[-0.8px] space-y-[50px]">
                                <li>
                                    <Link href="/" onClick={toggleOverlay}>
                                        Page 1
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/" onClick={toggleOverlay}>
                                        Page 2
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/" onClick={toggleOverlay}>
                                        Page 3
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
