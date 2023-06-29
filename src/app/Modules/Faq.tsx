import FAQ_MODULE from "./Faq_Module";

export default function FAQ() {
    return (
        <>
            <div className="flex flex-col sm:flex-row">
                <div className="flex sm:w-[40%]   justify-center 2xl:justify-end ">
                    <div className="text-center">
                        <p className="text-[15px] font-sohogothicpro font-medium leading-[22px] tracking-[-0.02em] uppercase text-[#33B888] " >FAQ</p>
                        <h1 className="text-[42px] font-sohogothicpro italic font-bold leading-[63px] tracking-[-0.05em]">Got question?</h1>
                        <p className="mt-[8px] text-[16px] leading-[22px] tracking-[-0.05em] text-[#313131] max-w-[316px] sm:w-[338px]">Take a look at the answers to the most frequent questions.Is there still something unclear? Contact us.</p>
                    </div>
                </div>
                <div className="flex-grow flex justify-center 2xl:justify-start ">
                    <FAQ_MODULE />
                </div>
            </div>
        </>
    )
}