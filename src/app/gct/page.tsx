"use client"
import { useEffect, useState } from 'react';

export default function Faq() {
    const [faqContent, setFaqContent] = useState('');

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(`/api/data?name=GCT`);
                const data = await response.json();
                setFaqContent(data[0].text);
            } catch (error) {
                console.error('Failed to fetch FAQ content:', error);
            }
        }

        fetchData();
    }, []);

    return (
        <>
            <div className="mx-[20px] md:mx-[20px] lg:ml-[135px]  mt-[70px] ">
                <h1 className='text-[50px] font-sohogothicpro sm:text-[70px] text-[#313131] italic font-bold leading-[79px] tracking-[-3.5px]'>General <br /> Commercial Terms</h1>
                <section className='md:max-w-[756px] mt-[59px] mb-[20px]'>
                    <p className="textarea-content whitespace-pre-wrap text-[#313131] text-[17px] leading-[22px] tracking-[-0.85px]">{faqContent}</p>
                </section>
            </div>
        </>
    );
}
