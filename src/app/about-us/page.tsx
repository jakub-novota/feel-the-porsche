import Image from 'next/image'


export default function About() {
    return (
        <>
            <div className="flex flex-col ">
                <div className='h-full w-1/2 flex justify-center '>
                    <h1 className="font-sohogothicpro italic font-bold text-[70px] leading-[105px] tracking-[-0.04em] text-[#313131]">About us</h1>
                </div>
                <div className=" h-[500px] w-screen flex">
                    <div className=" h-full w-1/2 flex items-center justify-center">
                        <p className=" max-w-[410px] text-[17px] leading-[22px] tracking-[-0.05em] text-[#313131]">
                            Welcome to <strong>Feel the Porsche,</strong> where luxury meets affordability. Our company was founded with the goal of providing customers with top-of-the-line vehicles and personalized service at competitive prices.
                            <br />
                            <br />
                            <strong>At Feel the Porsche,</strong> we understand that our customers want more than just a car rental. They want a luxurious experience that will make their travels memorable. That's why we offer a fleet of high-end vehicles, from sports cars to luxury sedans, with advanced features and amenities that cater to even the most discerning customers.
                        </p>
                    </div>
                    <div className=" h-full w-1/2 flex items-center">
                        <div className='relative w-full h-full'>
                            <Image
                                fill
                                priority
                                quality={100}
                                src={"/about/about1.png"}
                                style={{ objectFit: "contain" }}
                                alt=""
                            />
                        </div>
                    </div>
                </div>
                <div className=" h-[500px] w-screen flex">
                    <div className=" h-full w-1/2">
                        <div className='relative w-full h-full'>
                            <Image
                                fill
                                priority
                                quality={100}
                                src={"/about/about2.png"}
                                alt=""
                            />
                        </div>
                    </div>
                    <div className=" h-full w-1/2 flex justify-center items-center">
                        <p className=" max-w-[472px] text-[17px] leading-[22px] tracking-[-0.05em] text-[#313131]">
                            Our team of experienced professionals is dedicated to providing personalized service that goes above and beyond expectations. From customized travel itineraries to concierge services, we are committed to making every rental experience a truly unforgettable one.
                            <br />
                            <br />
                            Thank you for considering <strong> Feel the Porsche </strong> for your transportation needs. We look forward to serving you and helping you indulge in the ultimate luxury travel experience.
                        </p>
                    </div>
                </div>
            </div>




            <div className='relative mr-[188px] ml-[188px] mt-[154px] flex justify-center mb-[50px]'>
                <Image
                    fill
                    priority
                    quality={100}
                    src={"/about/mask.png"}
                    alt="mask"
                    className='z-10  mix-blend-multiply'
                />
                <div className='absolute top-0 left-0 w-full h-full bg-[#12385B] '>
                </div>

                <div className="z-30 h-249 w-1170px  flex items-center  pt-[50px] pl-[100px] pr-[100px] pb-[50px]">
                    <div>
                        <Image
                            width={150}
                            height={150}
                            priority
                            quality={100}
                            src={"/about/ceo.png"}
                            className='rounded-full z-30'
                            alt="CEO"
                        />
                    </div>
                    <div className="z-30 ml-6 w-2/3">
                        <p className="z-30 text-[14px] w-[769px] leading-[23px] tracking-[-0.05em] text-[#D4E6F6]">
                            At our premium rental car company, we are committed to providing the best possible service to our customers. With a fleet of top-of-the-line vehicles and personalized support from our experienced professionals, we strive to make every rental experience truly exceptional. Thank you for choosing our company, and we look forward to providing you with an unmatched level of luxury and convenience.
                        </p>
                        <div className="z-30 mt-4">
                            <p className="z-30 text-[16px] font-semibold leading-[23px] tracking-[-0.05em] text-white">Andrej Šturc</p>
                            <p className="z-30 text-[16px] font-semibold leading-[23px] tracking-[-0.05em] text-white ">CEO</p>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}