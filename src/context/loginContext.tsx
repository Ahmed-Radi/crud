import React, { createContext, useState } from 'react';
import { User } from "../Model/User";
import { useNavigate } from 'react-router-dom';

interface userInterface {
    loginUser: User;
    setLoginUser: (selectedUser: User) => void;
}

const menuDefaultValue = {
    loginUser: {
        id: 0,
        email: '',
        name: '',
        password: '',
    },
    setLoginUser: (selectedUser: User) => {}
}

export const userLoginContext = createContext<userInterface>(menuDefaultValue)

const LoginUserContextProvider = ({ children }: { children: React.ReactNode }) => {

    const navigate = useNavigate();

    const [loginUser, setLoginUser] = useState<User>(menuDefaultValue.loginUser)

    React.useEffect(() => {
        // get user data from local storage
        const user = localStorage.getItem("user");
        if (user) {
            // if user exist add user data into state to use it
            setLoginUser(JSON.parse(user))
        } else {
            navigate('/')
        }
    }, [navigate])

    const value = { loginUser, setLoginUser }

    return (
        <userLoginContext.Provider value={value}>
            {children}
        </userLoginContext.Provider>
    )
}

export default LoginUserContextProvider;