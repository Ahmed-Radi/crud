import { Outlet } from 'react-router-dom';

import Navbar from './Components/Navbar/Navbar';

import MenuContextProvider from './context/menuContext';
import LoginUserContextProvider from './context/loginContext';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

function App() {
  const { i18n: { language } } = useTranslation()

  useEffect(() => {
    // Update the lang attribute of the body based on the language
    document.body.setAttribute('lang', language);
  }, [language]);

    return (
        <div className="App">
            <LoginUserContextProvider>
                <MenuContextProvider>
                    <Navbar />
                </MenuContextProvider>
                <Outlet />
            </LoginUserContextProvider>
        </div>
    );
}

export default App;
