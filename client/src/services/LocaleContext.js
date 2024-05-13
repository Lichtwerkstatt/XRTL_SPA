import React, { useState, useEffect, useContext } from "react";
import i18n from "i18next";
import {initReactI18next} from "react-i18next";
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import {EN} from "./constants";

const LocaleContext = React.createContext();

export function useLocaleContext() {
    return useContext(LocaleContext);
}

/**
    LocaleContext

    This React components provides useful locale and translation functions for the rest of the app's components.
    It contains the react-i18next library configuration and specialized translation functions.

    @returns {React.Context} Locale context
 **/

export function LocaleContextProvider({ children }) {
    const [initialized, setInitialized] = useState(false)
    const [lng, setLng] = useState(EN);

    useEffect(() => {
        i18nInit();
    }, [])

    const i18nInit = () => {
        const options = {
            debug: true,
            lng: lng,
            fallbackLng: EN,
            ns: ['common'],
            defaultNS: 'common',
            backend: {
                loadPath: '/locales/{{lng}}/{{ns}}.json'
            },
            interpolation: {
                escapeValue: false // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
            },
            react: {
                useSuspense: false
            },
        }

        i18n
            .use(Backend)
            .use(LanguageDetector)
            .use(initReactI18next) // passes i18n down to react-i18next
            .init(options)
            .then(() => {
                setInitialized(true)
        })
    }

    const changeLanguage = (language) => {
        i18n.changeLanguage(language);
        setLng(language)
    };

    const resolvedLanguage = () => i18n.resolvedLanguage

    return (
        <LocaleContext.Provider
            value={{
                changeLanguage,
                resolvedLanguage,
            }}>
            {initialized ? children : <div>Loading...</div>}
        </LocaleContext.Provider>
    )
}
