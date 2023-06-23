"use client"
import Image from "next/image";
import { useState, ChangeEvent, FormEvent } from 'react';

type CustomCheckboxProps = {
    isChecked: boolean;
    onChange: () => void;
};



export default function PriceOffer() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [isChecked, setIsChecked] = useState(false);
    const [isValidEmail, setIsValidEmail] = useState(true);
    const [isNameEmpty, setisNameEmpty] = useState(true);
    const [isMessageEmpty, setIsMessageEmpty] = useState(true);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSent, setIsSent] = useState(false);
    const [pickUpDate, setPickUpDate] = useState("");
    const [pickOffDate, setPickOffDate] = useState("");
    const [occasion, setOccasion] = useState("");





    // Client-side code
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
                    <div className={`w-10 h-10 sm:w-8 sm:h-8 border  rounded-lg flex-shrink-0 ${!isChecked && isSubmitted ? 'border border-red-500 ' : ''}`}>
                        {isChecked && (
                            <Image
                                src="/checked.svg"
                                alt={"icon"}
                                width={100}
                                height={0}
                                className="p-2"
                                priority
                            />
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

    const handlePickUpDateChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPickUpDate(e.target.value);
        setIsSubmitted(false); // Reset the isSubmitted state when pickUpDate is changed
        setIsSent(false); // Set isSent to false when any field is changed
    };

    const handlePickOffDateChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPickOffDate(e.target.value);
        setIsSubmitted(false); // Reset the isSubmitted state when pickOffDate is changed
        setIsSent(false); // Set isSent to false when any field is changed
    };

    const handleOccasionChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setOccasion(e.target.value);
        setIsSubmitted(false); // Reset the isSubmitted state when occasion is changed
        setIsSent(false); // Set isSent to false when any field is changed
    };
    const isOccasionValid = occasion !== "";

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

        if (!isChecked || !isValidEmail || isMessageEmpty || isNameEmpty || pickUpDate === "" || pickOffDate === "") {
            // Handle validation errors, e.g., set border color to red
            return;
        }

        const formValues = [name, email, message, isChecked, pickUpDate, pickOffDate, occasion];

        // Perform form submission logic here
        sendData();
        console.log("Form submitted successfully!");
        console.log("Form values:", formValues);
        setIsSent(true);
    };
    return (
        <>
            <div className="w-full flex justify-center items-center ">
                <div className="relative w-full h-full">
                    <div className="absolute top-[-150px] transform mx-auto right-0 left-0 w-[367px] min-h-[781px] bg-priceoffercard backdrop-blur-[5px] rounded-[12px]">
                        <div className="pt-[22px] pl-[30px] pr-[30px]">
                            <h1 className="text-[30px] font-sohogothicpro font-bold leading-[45px] tracking-[-0.05em] text-[#313131]">Price Offer</h1>
                            <div className="mt-[19px]">
                                <form onSubmit={handleSubmit}>
                                    <p className="text-[12px] leading-[15px] tracking-[-0.05em] text-[#707070]">Name and surname</p>
                                    <input
                                        type="text"
                                        id="name"
                                        className={`z-40 mt-[10px] ring-[1px] ring-[#C5C5C5]  text-black placeholder-[#D6D6D6] text-[16px] leading-[16px] tracking-[-0.05] rounded-[8px] block w-full p-[15px] focus:outline-none focus:border-[#756C63] focus:ring-1 focus:ring-[#756C63]  ${isNameEmpty && isSubmitted ? 'border border-red-500 ' : ''
                                            }`}
                                        placeholder="John Doe"
                                        value={name}
                                        onChange={handleNameChange}

                                    />

                                    <p className="text-[12px] leading-[15px] tracking-[-0.05em] mt-[15px] text-[#707070]">Email</p>
                                    <input
                                        type="text"
                                        id="email"
                                        className={`z-40 mt-[10px] ring-[1px] ring-[#C5C5C5]  bg-customInput text-black placeholder-[#D6D6D6]  text-[16px] leading-[16px] tracking-[-0.05]  rounded-[8px] block w-full p-[15px] focus:outline-none  focus:border-[#756C63] focus:ring-1 focus:ring-[#756C63] ${!isValidEmail && isSubmitted ? 'border border-red-500 ' : ''
                                            }`}
                                        placeholder="@"
                                        value={email}
                                        onChange={handleEmailChange}

                                    />
                                    <p className="text-[12px] leading-[15px] tracking-[-0.05em] mt-[15px] text-[#707070]">Date of pick up and pick off</p>
                                    <div className="flex mt-[10px]  rounded-[8px] border-[#C5C5C5] border-[1px] space-x-[1px] bg-white">
                                        <input
                                            type="date"
                                            id="pick_up_date"
                                            placeholder="10/10/2001"
                                            className={`z-40 rounded-l-[8px]   bg-customInput  placeholder-[#D6D6D6] text-[#BABABA]  text-[16px] leading-[16px] tracking-[-0.05]  block p-[15px] w-1/2 focus:outline-none  focus:border-[#756C63] focus:ring-1 focus:ring-[#756C63]  ${!isValidEmail && isSubmitted ? 'border border-red-500 ' : ''}`}
                                            value={pickUpDate}
                                            onChange={handlePickUpDateChange}
                                        />
                                        <input
                                            type="date"
                                            id="pick_off_date"
                                            className={`z-40 rounded-r-[8px]  bg-customInput  placeholder-[#D6D6D6] text-[#BABABA]  text-[16px] leading-[16px] tracking-[-0.05]  block p-[15px] w-1/2 focus:outline-none  focus:border-[#756C63] focus:ring-1 focus:ring-[#756C63]  ${!isValidEmail && isSubmitted ? 'border border-red-500 ' : ''}`}
                                            value={pickOffDate}
                                            onChange={handlePickOffDateChange}

                                        />
                                    </div>

                                    <p className="text-[12px]  mb-[10px] leading-[15px] tracking-[-0.05em] mt-[15px] text-[#707070]">What kind of occasion?</p>
                                    <select
                                        id="occasion"
                                        className={`z-40 rounded-[8px] border-[1px] bg-customInput placeholder-[#D6D6D6] text-[#BABABA] text-[16px] leading-[16px] tracking-[-0.05] block p-[15px] w-full focus:outline-none focus:border-[#756C63] focus:ring-1 focus:ring-[#756C63] ${!isOccasionValid && isSubmitted ? "border border-red-500" : "border-[#C5C5C5] "}`}
                                        value={occasion}
                                        onChange={handleOccasionChange}
                                    >
                                        <option value="" hidden>Choose Occasion</option>
                                        <option value="wedding">Wedding</option>
                                        <option value="birthday">Birthday</option>
                                        <option value="anniversary">Anniversary</option>
                                    </select>



                                    <p className="text-[12px] leading-[15px] tracking-[-0.05em] mt-[15px] text-[#707070]">Message</p>
                                    <textarea
                                        id="text"
                                        rows={4}
                                        className={`z-40 mt-[10px] ring-[1px] ring-[#C5C5C5]   h-[127px] w-[307px]  break-after-auto whitespace-pre-wrap break-words  bg-[#fbfbfbc9] placeholder-[#D6D6D6]   text-black text-[16px] leading-[16px] tracking-[-0.05]  rounded-[8px] block p-[15px]  pb-20  focus:outline-none focus:border-[#756C63] focus:ring-1 focus:ring-[#756C63] ${isMessageEmpty && isSubmitted ? 'border border-red-500 ' : ''}`}
                                        placeholder="Any other special requirements?"
                                        value={message}
                                        onChange={handleMessageChange} // Pass the event object correctly
                                    >
                                    </textarea>

                                    <div className="z-40 flex items-center mt-[25px] ">
                                        <CustomCheckbox isChecked={isChecked} onChange={handleCheckboxChange} />
                                        <label className="z-40 ml-4 max-w-[349px] sm:max-w-[307px] text-[10px] leading-[16px] tracking-[0.5%] not-italic text-[#727AB0]">
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
                </div>
            </div>
        </>
    )
}