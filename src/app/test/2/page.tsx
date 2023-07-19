"use client"
import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher: React.FC = () => {
    const { i18n } = useTranslation()

    const changeLanguage = (lng: string): void => {
        i18n.changeLanguage(lng);
    };

    return (
        <div>
            <p>Current language: {i18n.language}</p>
        </div>
    );
}

export default LanguageSwitcher;
