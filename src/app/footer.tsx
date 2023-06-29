export default function Footer() {
    return (
        <footer className="bg-[#0C1B26] relative grid">
            <div className="mx-[20px] md:mx-[136px] flex flex-col md:flex-row justify-between pt-[30px] md:pt-[143px] pb-[30px] border-b-[0.5px] border-[#5C7282]">
                
                
                <div className="flex flex-row  w-full">
                    <div className=" order-2 md:order-1 md:text-left text-[14px] leading-[21px] tracking-[-0.05em] text-[#BCBCBC]">
                        <p >Konventná 6</p>
                        <p >811 03 Bratislava</p>
                        <strong>
                            <a href="mailto:info@feeltheporsche.com">info@feeltheporsche.com</a>
                            <br />
                            <a href="tel:+421902222341">+421 902 222 341</a>
                        </strong>
                    </div>
                    <div className="text-left order-1 md:order-2 w-full  md:text-right flex  flex-col md:flex-row md:items-end md:justify-end text-white md:space-x-[20px] text-[16px] leading-[26px] tracking-[-0.05em]">
                        <a href="/" className="hover:underline">
                            Home
                        </a>
                      
                        <a href="/about" className="hover:underline">
                            About us
                        </a>
                        <a href="/cars" className="hover:underline">
                            Cars
                        </a>
                        <a href="/services" className="hover:underline">
                            Services
                        </a>
                        <a href="/contact" className="hover:underline">
                            Contact us
                        </a>
                    </div>
                </div>

            </div>
            <div className="mx-[20px] md:mx-[136px] max-w-[745px] pt-[30px]">
                <p className="text-[11px] leading-[19px] tracking-[-0.05em] text-[#5C7282]">
                    © 2023 Feel the Porsche®, s. r. o., all rights reserved
                    <br />
                    All rights reserved. The content of Feel the Porsche is protected by copyright. Transcripts, copies
                    and / or subsequent provision of public access to the graphics and / or texts of this content and / or
                    parts thereof is without the initial written consent of Feel the Porsche®, s.r.o. prohibited. General Terms and Conditions
                </p>
            </div>
        </footer>

    );
}
