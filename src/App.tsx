import { Outlet } from 'react-router-dom';

import Navbar from './Components/Navbar/Navbar';

import MenuContextProvider from './context/menuContext';
import LoginUserContextProvider from './context/loginContext';

function App() {
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
