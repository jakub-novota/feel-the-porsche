"use client"
import React, { useState, useEffect } from 'react';
import Image from "next/image";
import { usePathname } from 'next/navigation';
import Link from "next/link";
import { signIn, signOut, useSession } from 'next-auth/react';
import { setCookie, getCookie } from 'cookies-next';
import { useTranslation } from 'react-i18next';
import i18nInstance from '@/app/i18n'; // Rename the imported object

interface Car {
    _id: string; // Adjust the type based on your actual car data structure
}

export default function Menu() {
    const pathname = usePathname();
    const { t, i18n } = useTranslation();
    const storedLanguage = getCookie('language');
    const [clickedLanguage, setClickedLanguage] = useState<string | null>(null);
    const [isDetailsPage, setIsDetailsPage] = useState(false);
    const [carData, setCarData] = useState<Car[]>([]); // Provide explicit type for carData
    const [isLoading, setIsLoading] = useState(true); // State to track loading state
    const [lng, setLng] = useState<string>();


    //PATHS
    const isListPage = pathname === '/cars';
    const isCarsPage = pathname === '/cars/';
    const isCarsDetailPage = pathname.startsWith('/cars/');
    const isFaqPage = pathname === '/cars';
    const isAboutPage = pathname === '/about-us';
    const isHomePage = pathname === '/';
    const isAdminPage = pathname.startsWith('/admin');




    const handleClick = (language: string) => {
        setLng(language)
        setCookie("language", language)
        i18nInstance.changeLanguage(language); // Use i18nInstance instead of i18n
    };


    useEffect(() => {
        const t = storedLanguage?.toString()
        if (t === "sk") {
            i18nInstance.changeLanguage("sk");
        }
        if (typeof storedLanguage === 'string') {
            if (storedLanguage == "sk") {
                i18nInstance.changeLanguage("sk");
            }
            setLng(storedLanguage)
        }
    }, []);

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

    const { data: session } = useSession()



    return (
        <>
            <nav className={`z-50 static ${isDetailsPage ? 'absolute top-0' : 'static'} ${isHomePage ? 'absolute top-0' : 'static'} ${isCarsPage ? 'bg-gray-100' : ''} left-0 w-screen `}>
                <div className="w-screen  pt-[18px] bg-transparent ">
                    <div className="flex items-center justify-between sm:ml-[20px] sm:mr-[20px] lg:ml-[135px] lg:mr-[135px]">
                        <div className="flex items-center">
                            <div className="">
                                <Link href="/" >
                                    <Image
                                        width={72}
                                        height={0}
                                        src="/menu/Logo.svg"
                                        alt="Logo"
                                        className="w-full h-auto"
                                    />
                                </Link>
                            </div>
                            <div className={`sm:ml-[20px]  xl:ml-[70px] space-x-[40px] font-medium text-[16px] leading-[16px] tracking-[-0.05em] ${isDetailsPage ? 'text-white' : 'text-black'} ${isHomePage ? 'text-white' : 'text-black'} ${isCarsPage ? 'text-black' : 'text-black'}`}>
                                <Link href="/">Home</Link>
                                <Link href="/about-us">About us</Link>
                                <Link href="/#service">Services</Link>
                                <Link href="/#faq">FAQ</Link>
                                <Link href="/cars">Cars</Link>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <Link href={"/#contact"}>
                                <button type="button" className="flex items-center bg-[#30B887]  rounded-[8px] px-5 py-2.5 mr-[10px]">
                                    <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-[10px]">
                                        <path d="M17 15.6618V16.189C17 16.4041 16.9145 16.6103 16.7624 16.7624C16.6103 16.9145 16.4041 17 16.189 17H14.567C10.9105 17 7.40369 15.5474 4.81813 12.9619C2.23258 10.3763 0.780029 6.86955 0.780029 3.21302L0.780029 1.59103C0.780029 1.37594 0.865473 1.16966 1.01756 1.01756C1.16966 0.865473 1.37594 0.780029 1.59103 0.780029H4.83501C5.0501 0.780029 5.25638 0.865473 5.40848 1.01756C5.56057 1.16966 5.64601 1.37594 5.64601 1.59103V4.83501C5.64601 5.28917 5.3946 5.89742 5.07831 6.21371L3.34278 7.94924C4.5755 10.8688 6.91117 13.2045 9.83076 14.4372L11.5501 12.7179C11.8745 12.3935 12.4827 12.1421 12.9288 12.1421H16.189C16.4027 12.1442 16.6069 12.2306 16.7572 12.3825C16.9075 12.5343 16.9919 12.7394 16.9919 12.9531V15.6699L17 15.6618Z" fill="white" />
                                    </svg>
                                    <p className="text-[15px] font-sohogothicpro uppercase font-medium leading-[22px] tracking-[2%] text-white ">
                                        Contact us
                                    </p>
                                </button>
                            </Link>
                            {
                                <div className='relative'>
                                    <div
                                        className={`border w-[50px] rounded-[8px] px-[14px] py-[10px] ${clickedLanguage === 'en' ? 'text-white bg-[#33B888]' : 'text-[#33B888] border-[#33B888]'
                                            }`}
                                        onMouseEnter={() => setClickedLanguage('en')}
                                        onMouseLeave={() => setClickedLanguage(null)}
                                    >
                                        <p>{lng === 'en' ? 'EN' : lng === 'sk' ? 'SK' : null}</p>
                                    </div>
                                    {clickedLanguage && (
                                        <div className=' absolute left-0 bg-red-400'
                                            onMouseEnter={() => setClickedLanguage('sk')}
                                            onMouseLeave={() => setClickedLanguage(null)}
                                        >
                                            <div className='pt-[10px] '>
                                                <div
                                                    className={`border w-[50px] rounded-[8px] px-[14px] py-[10px] ${clickedLanguage === 'sk' ? 'text-white bg-[#33B888]' : 'text-[#33B888] border-[#33B888]'}`}
                                                    onClick={() => handleClick(lng === 'sk' ? 'en' : "sk")}
                                                >
                                                    <p>{lng === 'sk' ? 'EN' : lng === 'en' ? 'SK' : null}</p>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            }
                            <div className="ml-[20px]">
                                {session?.user ? (
                                    <>
                                        <button
                                            type="submit"
                                            className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                            onClick={() => signOut()}
                                        >
                                            Sign Out
                                        </button>

                                    </>
                                ) : (
                                    <></>
                                )
                                }
                            </div>
                        </div>

                    </div>
                </div>
            </nav >
        </>
    )
}