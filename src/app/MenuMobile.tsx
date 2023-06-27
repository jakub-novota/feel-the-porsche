"use client"
import Image from "next/image"
import { usePathname } from 'next/navigation'
import Link from "next/link"

export default function MenuMobile() {
    const pathname = usePathname()
    const isListPage = pathname === '/cars';
    const isCarsPage = pathname === '/cars';
    const isFaqPage = pathname === '/cars';
    const isDetailsPage = pathname.match(/^\/cars\/\d+$/);
    const isAboutPage = pathname === '/about-us';
    const isHomePage = pathname === '/'; // Adjust the condition based on your actual homepage route
    return (
        <nav className={`z-50 ${isDetailsPage ? 'absolute top-0' : ''} ${isHomePage ? 'absolute top-0' : ''}  left-0 w-screen ${isCarsPage ? 'bg-gray-100' : ''}`}>
            <div className="w-screen mt-[10px] h-[74px] ">
                <div className="pl-[23px] pr-[31px] w-full flex">
                    <Link href="/" >
                        <Image
                            width={72}
                            height={79}
                            src="/menu/Logo.svg"
                            alt="Logo"
                        />
                    </Link>
                    <div className="flex justify-end items-center w-full">
                        <button type="button" className="flex items-center w-[147px] h-[38px] bg-[#30B887]  rounded-[8px]  justify-center">
                            <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-[10px]">
                                <path d="M17 15.6618V16.189C17 16.4041 16.9145 16.6103 16.7624 16.7624C16.6103 16.9145 16.4041 17 16.189 17H14.567C10.9105 17 7.40369 15.5474 4.81813 12.9619C2.23258 10.3763 0.780029 6.86955 0.780029 3.21302L0.780029 1.59103C0.780029 1.37594 0.865473 1.16966 1.01756 1.01756C1.16966 0.865473 1.37594 0.780029 1.59103 0.780029H4.83501C5.0501 0.780029 5.25638 0.865473 5.40848 1.01756C5.56057 1.16966 5.64601 1.37594 5.64601 1.59103V4.83501C5.64601 5.28917 5.3946 5.89742 5.07831 6.21371L3.34278 7.94924C4.5755 10.8688 6.91117 13.2045 9.83076 14.4372L11.5501 12.7179C11.8745 12.3935 12.4827 12.1421 12.9288 12.1421H16.189C16.4027 12.1442 16.6069 12.2306 16.7572 12.3825C16.9075 12.5343 16.9919 12.7394 16.9919 12.9531V15.6699L17 15.6618Z" fill="white" />
                            </svg>
                            <p className="text-[14px] font-sohogothicpro uppercase font-medium tracking-[0.28px] text-white ">
                                Contact us
                            </p>
                        </button>
                        <button className="ml-[5%]">
                            <svg width="30" height="24" viewBox="0 0 30 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g id="Group 84">
                                    <line id="Line 21" y1="1" x2="30" y2="1" stroke="white" stroke-width="2" />
                                    <line id="Line 22" y1="12" x2="30" y2="12" stroke="white" stroke-width="2" />
                                    <line id="Line 23" y1="23" x2="30" y2="23" stroke="white" stroke-width="2" />
                                </g>
                            </svg>
                        </button>
                    </div>

                </div>
            </div>
        </nav>
    )
}