import FAQ_MODULE from "./Faq_Module";

export default function FAQ() {
    return (
        <>
            <div className="flex flex-col sm:flex-row">
                <div className="flex sm:w-[40%]   justify-center 2xl:justify-end ">
                    <div className="text-center">
                        <p className="text-[13px] tracking-[-0.26px] sm:text-[15px] font-sohogothicpro font-medium  sm:tracking-[-0.3px] uppercase text-[#33B888] " >FAQ</p>
                        <h1 className="text-[30px] tracking-[-1.5px] sm:text-[42px] font-sohogothicpro italic font-bold leading-[63px] sm:tracking-[-2.1px]">Got question?</h1>
                        <p className="mt-[8px] text-[15px] tracking-[-0.75px] sm:text-[16px] leading-[22px] sm:tracking-[-0.05em] text-[#313131] max-w-[316px] sm:w-[338px]">Take a look at the answers to the most frequent questions.Is there still something unclear? </p>
                        <a className="mt-[8px] underline font-bold text-[15px] tracking-[-0.75px] sm:text-[16px] leading-[22px] sm:tracking-[-0.05em] text-[#313131] max-w-[316px] sm:w-[338px]">Contact us.</a>
                    </div>
                </div>
                <div className="mt-[34px] sm:mt-0 flex-grow flex justify-center 2xl:justify-start ">
                    <FAQ_MODULE />
                </div>
            </div>
        </>
    )
}