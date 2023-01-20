import language, { t } from 'i18next';
import React, { createContext, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface Menu {
    isOpen: boolean;
    menuToggler: () => void

    handleTrans: (code: any) => void
    t: any
    language: any
}

const menuDefaultValue = {
    isOpen: false,
    menuToggler: () => {},

    handleTrans: (code: any) => {},
    t: t,
    language: language
}

export const menuContext = createContext<Menu>(menuDefaultValue)

const MenuContextProvider = ({ children }: { children: React.ReactNode }) => {

    const [isOpen, setIsOpen] = useState<boolean>(menuDefaultValue.isOpen)
    const menuToggler =  () => setIsOpen((p) => !p);

    // language switch logic
    const {
        t,
        i18n: { changeLanguage, language },
    } = useTranslation();

    // function to change language
    const handleTrans = (code: any) => {
        return changeLanguage(code);
    }

    const value = { isOpen, menuToggler, handleTrans, t, language }

    return (
        <menuContext.Provider value={value}>
            {children}
        </menuContext.Provider>
    )
}

export default MenuContextProvider;