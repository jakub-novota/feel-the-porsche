import Map from "./Map"


export default function ContactUs() {
    return (
        <>
            <div className="w-full  pb-[10px] sm:pb-0">
                <div className="flex flex-col items-center">
                    <p className="font-sohogothicpro font-medium text-[#33B888] text-[15px] leading-[22px] tracking-[-0.02em] uppercase">contact us</p>
                    <h1 className="ml-[20px] mr-[20px] w-[292px] sm:w-[408px] font-sohogothicpro font-bold italic text-[30px] sm:text-[42px] text-center leading-[37px] sm:leading-[48px] tracking-[-1.5px]  sm:tracking-[-0.05em] text-[#313131] max-w-[408px]">
                        If you are interested,
                        let us know
                    </h1>
                </div>
                <div className="mt-[60px] block">
                    <Map />
                </div>
            </div>
        </>
    )
}

