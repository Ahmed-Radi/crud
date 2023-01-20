import React, { createContext, useState } from 'react';
import { User } from "../Model/User";
import { useGetUser } from '../API/FetchUser';

interface userInterface {
    selectedUser: User;
    handleSelectUser: (id: number) => void;
    setSelectedUser: (selectedUser: User) => void;
}

const menuDefaultValue = {
    selectedUser: {
        id: 0,
        email: '',
        name: '',
        password: '',
    },
    handleSelectUser: (id: number) => {},
    setSelectedUser: (selectedUser: User) => {}
}

export const userContext = createContext<userInterface>(menuDefaultValue)

const MenuContextProvider = ({ children }: { children: React.ReactNode }) => {

    const [selectedUser, setSelectedUser] = useState<User>(menuDefaultValue.selectedUser)

    // fetch user data
    const { data } = useGetUser()

    // select user dependant on id
    const handleSelectUser =  (id: number) => {
        data.filter((user: User) => user.id === id)
        console.log('id', id)
        setSelectedUser(prev => prev = data.filter((user: User) => user.id === id))
    };

    const value = { selectedUser, handleSelectUser, setSelectedUser }

    return (
        <userContext.Provider value={value}>
            {children}
        </userContext.Provider>
    )
}

export default MenuContextProvider;