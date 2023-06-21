"use client"
import Image from 'next/image';
import React, { useState } from 'react';

interface FAQItemProps {
    question: string;
    answer: string;
    isOpen?: boolean;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer, isOpen = false }) => {
    const [isOpenState, setIsOpenState] = useState(isOpen);

    const toggleAccordion = () => {
        setIsOpenState(!isOpenState);
    };

    return (
        <div className={`max-w-[765px] mx-auto p-8  rounded-sm  backdrop-blur-lg bg-opacity-75 border-b-[0.5px] border-b-[#D0DCD7] ${isOpenState ? 'bg-[#F9F9F9]' : 'bg-none'} duration-300`}>
            <button className={`faq-question  w-full ${isOpenState ? 'active' : ''}`} onClick={toggleAccordion}>
                <h1 className="z-30 text-[23px] text-[#33B888] font-sohogothicpro font-medium leading-[23px] tracking-[-0.05em]">
                    <span className="flex items-center justify-between">
                        <span>{question}</span>
                        <div>
                            <div className={`${isOpenState ? 'block' : 'hidden'}`}>
                                <div className={`${isOpenState ? 'opacity-100' : 'opacity-0'}`}>
                                    <Image src="/svg/minus.svg" height={44} width={44} alt="-" />
                                </div>
                            </div>
                            <div className={`${isOpenState ? 'hidden' : 'block'}`}>
                                <div className={`${isOpenState ? 'opacity-0' : 'opacity-100'}`}>
                                    <Image src="/svg/plus.svg" height={44} width={44} alt="+" />
                                </div>
                            </div>
                        </div>
                    </span>
                </h1>
            </button>

            {isOpenState && (
                <div className="faq-answer mt-[20px] text-[15px] leading-[21px] tracking-[-0.05em] text-[#6D6D6D] max-w-[633px]">
                    <p>{answer}</p>
                </div>
            )}
        </div>
    );
};

const FAQ_MODULE: React.FC = () => {
    const faqItems: FAQItemProps[] = [
        {
            question: 'How much does a premium car rental cost?',
            answer: 'The cost of a premium car rental varies depending on the type of vehicle, rental duration, and location. Premium rentals are typically more expensive than standard rentals, but pricing can vary depending on the rental company and other factors.',
            isOpen: true,
        },
        {
            question: 'What are the requirements for renting a premium car?',
            answer: 'This is the answer to FAQ item 2.',
        },
        {
            question: 'Can I rent a premium car for just one day?',
            answer: 'This is the answer to FAQ item 3.',
        },
        {
            question: 'Do premium car rentals come with insurance?',
            answer: 'This is the answer to FAQ item 3.',
        },
    ];

    return (
        <div className="faq-section w-full ">
            {faqItems.map((item, index) => (
                <FAQItem key={index} question={item.question} answer={item.answer} isOpen={item.isOpen} />
            ))}
        </div>
    );
};

export default FAQ_MODULE;
