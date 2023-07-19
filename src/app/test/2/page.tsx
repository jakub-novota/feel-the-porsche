"use client"
import React, { useState, useEffect } from 'react';
import { setCookie, getCookie } from 'cookies-next';
import { useTranslation } from 'react-i18next';
import i18nInstance from '@/app/i18n'; // Rename the imported object

const MyComponent: React.FC = () => {
    const [clickedLanguage, setClickedLanguage] = useState<string | null>(null);
    const { t, i18n } = useTranslation();

    const handleClick = (language: string) => {
        setCookie('language', language);
        i18nInstance.changeLanguage(language); // Use i18nInstance instead of i18n
    };
    const storedLanguage = getCookie('language');

    useEffect(() => {
        if (typeof storedLanguage === 'string') {
            if (storedLanguage == "sk") {
                i18nInstance.changeLanguage("sk");
            } else {
                i18nInstance.changeLanguage("en");
            }
        }
    }, []);


    return (
        <div className='relative'>
            <p>{t('home.test')}</p>
            <div
                className={`border w-[50px] rounded-[8px] px-[14px] py-[10px] ${clickedLanguage === 'en' ? 'text-white bg-[#33B888]' : 'text-[#33B888] border-[#33B888]'
                    }`}
                onMouseEnter={() => setClickedLanguage('en')}
                onMouseLeave={() => setClickedLanguage(null)}
                onClick={() => handleClick('en')} // use 'en' instead of 'EN'
            >
                <a>EN</a>
            </div>
            {clickedLanguage && (
                <div className='bg-red-400'
                    onMouseEnter={() => setClickedLanguage('sk')}
                    onMouseLeave={() => setClickedLanguage(null)}
                >
                    <div className='pt-[20px] '>
                        <div
                            className={`border w-[50px] rounded-[8px] px-[14px] py-[10px] ${clickedLanguage === 'sk' ? 'text-white bg-[#33B888]' : 'text-[#33B888] border-[#33B888]'}`}

                            onClick={() => handleClick('sk')} // use 'sk' instead of 'SK'
                        >
                            <a>SK</a>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyComponent;
