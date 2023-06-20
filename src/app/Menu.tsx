"use client"
import Image from "next/image"
import { usePathname } from 'next/navigation'
import Link from "next/link"


export default function Menu() {
    const pathname = usePathname()
    const isListPage = pathname === '/cars';
    const isFaqPage = pathname === '/cars';
    const isAboutPage = pathname === '/about-us';
    const isHomePage = pathname === '/'; // Adjust the condition based on your actual homepage route

    return (
        <>
            <nav className={`z-50 ${isHomePage ? 'absolute top-0' : ''} left-0 w-screen`}>
                <div className="w-screen mt-[18px] bg-transparent ">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <div className="pl-[135px]">
                                <Link href="/">
                                    <Image
                                        width={72}
                                        height={79}
                                        src="/menu/Logo.svg"
                                        alt="Logo"
                                    />
                                </Link>
                            </div>
                            <div className={`ml-[70px] space-x-[40px] font-medium text-[16px] leading-[16px] tracking-[-0.05em] ${isHomePage  ? 'text-white' : 'text-black'}`}>
                                <Link href="/">Home</Link>
                                <Link href="/about-us">About us</Link>
                                <Link href="/services">Services</Link>
                                <Link href="/faq">FAQ</Link>
                                <Link href="/cars">Cars</Link>
                            </div>
                        </div>
                        <div className="flex items-center  mr-[135px] ">
                            <button type="button" className="flex items-center  bg-[#30B887]  rounded-[8px] px-5 py-2.5 mr-[10px]">
                                <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-[10px]">
                                    <path d="M17 15.6618V16.189C17 16.4041 16.9145 16.6103 16.7624 16.7624C16.6103 16.9145 16.4041 17 16.189 17H14.567C10.9105 17 7.40369 15.5474 4.81813 12.9619C2.23258 10.3763 0.780029 6.86955 0.780029 3.21302L0.780029 1.59103C0.780029 1.37594 0.865473 1.16966 1.01756 1.01756C1.16966 0.865473 1.37594 0.780029 1.59103 0.780029H4.83501C5.0501 0.780029 5.25638 0.865473 5.40848 1.01756C5.56057 1.16966 5.64601 1.37594 5.64601 1.59103V4.83501C5.64601 5.28917 5.3946 5.89742 5.07831 6.21371L3.34278 7.94924C4.5755 10.8688 6.91117 13.2045 9.83076 14.4372L11.5501 12.7179C11.8745 12.3935 12.4827 12.1421 12.9288 12.1421H16.189C16.4027 12.1442 16.6069 12.2306 16.7572 12.3825C16.9075 12.5343 16.9919 12.7394 16.9919 12.9531V15.6699L17 15.6618Z" fill="white" />
                                </svg>
                                <p className="text-[15px] font-sohogothicpro uppercase font-medium leading-[22px] tracking-[2%] text-white ">
                                    Contact us
                                </p>
                            </button>
                            <div className={`border rounded-[8px] px-[14px] py-[10px] ${isListPage || isFaqPage || isAboutPage ? 'text-[#33B888] border-[#33B888]' : 'text-white'}`}>
                                <a>EN</a>
                            </div>
                        </div>

                    </div>
                </div>
            </nav>
        </>
    )
}