import axios from "axios";
import { User } from "../Model/User";

export function deleteUser(id: number) {
    return axios.delete<User>(`https://user-api-ebutler.onrender.com/users/${id}`)
}
