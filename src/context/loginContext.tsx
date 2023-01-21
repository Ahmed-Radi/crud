import React, { createContext, useState } from 'react';
import { User } from "../Model/User";

interface userInterface {
    loginUser: User;
    setLoginUser: (selectedUser: User) => void;
}
const user = localStorage.getItem("user");

const menuDefaultValue = {
    loginUser: user ? JSON.parse(user) : {
        id: 0,
        email: '',
        name: '',
        password: '',
    },
    setLoginUser: (selectedUser: User) => { },
}

export const userLoginContext = createContext<userInterface>(menuDefaultValue)

const LoginUserContextProvider = ({ children }: { children: React.ReactNode }) => {

    const [loginUser, setLoginUser] = useState<User>(menuDefaultValue.loginUser)

    React.useEffect(() => {
        // get user data from local storage
        if (user) {
            // if user exist add user data into state to use it
            setLoginUser(JSON.parse(user))
        }
    }, [])

    const value = { loginUser, setLoginUser }

    return (
        <userLoginContext.Provider value={value}>
            {children}
        </userLoginContext.Provider>
    )
}

export default LoginUserContextProvider;