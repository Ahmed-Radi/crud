import React, { useContext, useEffect } from 'react'
import UserContextProvider from '../../context/userContext';
import Table from '../../Components/Table/Table';
import Form from '../../Components/Form/Form';
import { userLoginContext } from '../../context/loginContext';
import { useNavigate } from 'react-router-dom';

function Home() {
    const { loginUser } = useContext(userLoginContext)

    const navigate = useNavigate()

    useEffect(() => {
        // check in mount phase is there a login user or not
        if (!loginUser || loginUser.id === 0) {
            navigate('/')
        }
    }, [loginUser, navigate])

    return (
        <div>
            <UserContextProvider>
                <Table />
                <hr />
                <Form />
            </UserContextProvider>
        </div>
    )
}

export default Home