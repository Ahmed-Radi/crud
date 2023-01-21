import axios from "axios"
import { User } from "../Model/User"

export const addUser = (user: User) => {
    return axios.post('https://user-api-ebutler.onrender.com/users', user)
}