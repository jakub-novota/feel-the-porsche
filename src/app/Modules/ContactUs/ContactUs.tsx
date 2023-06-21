import Map from "./Map"


export default function ContactUs() {
    return (
        <>
            <div className="w-full h-[500px] ">
                <div className="flex flex-col items-center">
                    <p className="font-sohogothicpro font-medium text-[#33B888] text-[15px] leading-[22px] tracking-[-0.02em] uppercase">contact us</p>
                    <h1 className="font-sohogothicpro font-bold italic text-[42px] text-center leading-[48px] tracking-[-0.05em] text-[#313131] max-w-[408px]">
                        If you are interested,
                        let us know
                    </h1>
                </div>
                <div className="mt-[75px]">
                    <Map />
                </div>
            </div>
        </>
    )
}