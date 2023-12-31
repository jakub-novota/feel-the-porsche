"use client"
import Image from "next/image";
import { useState, ChangeEvent, FormEvent } from 'react';

type CustomCheckboxProps = {
    isChecked: boolean;
    onChange: () => void;
};

export default function ContactFromular() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [isChecked, setIsChecked] = useState(false);
    const [isValidEmail, setIsValidEmail] = useState(true);
    const [isNameEmpty, setisNameEmpty] = useState(true);
    const [isMessageEmpty, setIsMessageEmpty] = useState(true);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSent, setIsSent] = useState(false);


    const sendData = async () => {
        const data = {
            name: name,
            email: email,
            message: message,
        };
        const response = await fetch('/api/sendmail', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        const result = await response.json();
        console.log(result);
    };



    const CustomCheckbox: React.FC<CustomCheckboxProps> = ({ isChecked, onChange }) => {
        return (
            <div className="flex items-center mr-4">
                <input
                    checked={isChecked}
                    id="custom-checkbox"
                    type="checkbox"
                    value=""
                    className="hidden"
                    onChange={onChange}
                />
                <label
                    htmlFor="custom-checkbox"
                    className="flex items-center cursor-pointer"
                >
                    <div className={`w-10 h-10 sm:w-8 sm:h-8 border  rounded-lg flex-shrink-0 flex justify-center items-center ${!isChecked && isSubmitted ? 'border border-red-500 ' : ''}`}>
                        {isChecked && (
                            <svg width="17" height="15" viewBox="0 0 17 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2 8.92023L4.69889 12.3902C4.78996 12.5086 4.90665 12.6047 5.0402 12.6715C5.17375 12.7383 5.3207 12.7739 5.47 12.7758C5.6169 12.7775 5.76233 12.7464 5.89572 12.6849C6.02911 12.6233 6.1471 12.5328 6.24111 12.4199L14.8519 2" stroke="#33B888" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        )}
                    </div>
                </label>
            </div>
        );
    };


    const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
        setIsSubmitted(false); // Reset the isSubmitted state when message is changed
        setIsSent(false); // Set isSent to false when any field is changed
        setisNameEmpty(e.target.value === "");
    };

    const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
        setIsSubmitted(false); // Reset the isSubmitted state when email is changed
        setIsSent(false); // Set isSent to false when any field is changed
        validateEmail(e.target.value);
    };

    const handleMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setMessage(e.target.value);
        setIsSubmitted(false); // Reset the isSubmitted state when message is changed
        setIsSent(false); // Set isSent to false when any field is changed
        setIsMessageEmpty(e.target.value === "");
    };


    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
        setIsSent(false); // Set isSent to false when any field is changed
    };

    const validateEmail = (email: string) => {
        // Email validation using regular expression
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setIsValidEmail(emailRegex.test(email));
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setIsSubmitted(true);

        if (email === "") {
            setIsValidEmail(false);
        }

        if (message === "") {
            setIsMessageEmpty(true);
        }
        if (name === "") {
            setisNameEmpty(true);
        }

        if (!isChecked || !isValidEmail || isMessageEmpty || isNameEmpty) {
            // Handle validation errors, e.g., set border color to red
            return;
        }

        // Perform form submission logic here
        sendData();
        console.log("Form submitted successfully!");
        setIsSent(true);
    };

    return (
        <>
            <div className="z-40 max-w-[354px] sm:w-[383px]  bg-[#fbfbfbc9] sm:mt-[59px] sm:ml-[135px] backdrop-filter backdrop-blur-[5px] roundedn-[12px] rounded-[12px] border-[0.5px] boreder-[#DEDEDE]">
                <div className="px-[39px] pt-[40px] text-[#707070]">
                    <div>
                        <form onSubmit={handleSubmit}>
                            <p className="text-[12px] leading-[15px] tracking-[-0.6px] sm:tracking-[-0.05em]">Name and surname</p>
                            <input
                                type="text"
                                id="name"
                                className={`z-40 mt-[10px] ring-[1px] ring-[#C5C5C5]  text-black placeholder-[#D6D6D6] text-[16px]  tracking-[-0.05] rounded-[8px] block w-full p-[15px] focus:outline-none focus:border-[#756C63] focus:ring-1 focus:ring-[#756C63]  ${isNameEmpty && isSubmitted ? 'border border-red-500 ' : ''
                                    }`}
                                placeholder="John Doe"
                                value={name}
                                onChange={handleNameChange}
                            />

                            <p className="text-[12px] leading-[15px] tracking-[-0.6px]  sm:tracking-[-0.05em] mt-[15px]">Email</p>
                            <input
                                type="text"
                                id="email"
                                className={`z-40 mt-[10px] ring-[1px] ring-[#C5C5C5]  bg-customInput text-black placeholder-[#D6D6D6]  text-[16px]  tracking-[-0.05]  rounded-[8px] block w-full p-[15px] focus:outline-none  focus:border-[#756C63] focus:ring-1 focus:ring-[#756C63] ${!isValidEmail && isSubmitted ? 'border border-red-500 ' : ''
                                    }`}
                                placeholder="@"
                                value={email}
                                onChange={handleEmailChange}
                            />

                            <p className="text-[12px] leading-[15px] tracking-[-0.6px] sm:tracking-[-0.05em] mt-[15px]">Message</p>
                            <textarea
                                id="text"
                                rows={4}
                                className={`z-40 mt-[10px] ring-[1px] ring-[#C5C5C5]   h-[127px] w-full break-after-auto whitespace-pre-wrap break-words   placeholder-[#D6D6D6]   text-black text-[16px] leading-[16px] tracking-[-0.05]  rounded-[8px] block p-[15px]  pb-20  focus:outline-none focus:border-[#756C63] focus:ring-1 focus:ring-[#756C63] ${isMessageEmpty && isSubmitted ? 'border border-red-500 ' : ''}`}
                                placeholder="Any other special requirements?"
                                value={message}
                                onChange={handleMessageChange} // Pass the event object correctly
                            >
                            </textarea>

                            <div className="z-40 flex items-center mt-[25px] ">
                                <CustomCheckbox isChecked={isChecked} onChange={handleCheckboxChange} />
                                <label className="z-40 ml-[11px] w-[260px] sm:max-w-[307px] text-[11px] font-medium tracking-[-0.55px]  text-[#8A8A8A]">
                                    I agree with personal data processing for sales and marketing purposes. You can find more information in the Personal data protection section.
                                </label>
                            </div>
                            <div className="z-40 flex item-center justify-center  mt-[29px]  ">
                                <button
                                    type="submit"
                                    className={`z-40  block p-[15px]  h-[54px] w-full font-sohogothicpro font-medium text-[15px] leading-[22px] tracking-[2%]  text-white uppercase rounded-lg items-center justify-center ${isSent ? 'bg-green-500' : 'bg-[#33B888]'}`}
                                >
                                    {isSent ? (
                                        <>
                                            <div className="flex justify-center items-center">
                                                <span>Sent</span>
                                                <Image src="/icon_sent.svg" alt="icon" width={10} height={10} className="ml-2" />
                                            </div>
                                        </>
                                    ) : (
                                        "Submit"
                                    )}
                                </button>

                            </div>
                            <div className="z-40 text-center mb-[35px]">
                                {isSubmitted && (
                                    <>
                                        {/* General error message */}
                                        {(isNameEmpty || !isValidEmail || isMessageEmpty || !isChecked) && (
                                            <p className="text-red-500 text-xs mt-2 text-center">
                                                Error
                                            </p>
                                        )}
                                    </>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </>
    )
}
