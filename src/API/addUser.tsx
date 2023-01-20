import axios from "axios"
import { User } from "../Model/User"

export const addUser = (user: User) => {
    return axios.post('http://localhost:4000/users', user)
}