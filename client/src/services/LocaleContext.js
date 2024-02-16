import React, { useContext } from "react";
import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";
import en from "./locales/en.json"

const LocaleContext = React.createContext()

export function useLocaleContext() {
    return useContext(LocaleContext);
}

const config = {
    resources: {en}, // contains dictionary for translations
    lng: "en",
    fallbackLng: "en",
    interpolation: {
        escapeValue: false // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    }
}

i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init(config);

/**
    LocaleContext

    This React components provides useful locale and translation functions for the rest of the app's components.
    It contains the react-i18next library configuration and specialized translation functions.

    @returns {React.Context} Locale context
 **/

export function LocaleContextProvider({ children }) {
    /**
     * The { t } translation function is provided by the react-i18next library as a React hook.
     * The function takes a string value corresponding to a key-value pair in the locales and returns the
     * translation. It is imported here into the Locale context to allow using the t function anywhere in the app
     * provided the context is being used.
     *
     * @const t
     */
    const { t } = useTranslation();

    /**
     * This function takes a component's control ID and returns its title as specified in the locales.
     *
     * @param controlId
     * @returns string
     */
    const compTitle = (controlId) => {
        return t('components.titles.' + controlId);
    }

    return (
        <LocaleContext.Provider
            value={{
                t,
                compTitle
            }}>
            {children}
        </LocaleContext.Provider>
    )
}
