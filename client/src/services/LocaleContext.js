import React, {useContext} from "react";

const LocaleContext = React.createContext()

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
    return (
        <LocaleContext.Provider
            value={{}}>
            {children}
        </LocaleContext.Provider>
    )
}
