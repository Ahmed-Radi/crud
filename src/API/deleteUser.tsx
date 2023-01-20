import axios from "axios";
import { User } from "../Model/User";

export function deleteUser(id: number) {
    return axios.delete<User>(`http://localhost:4000/users/${id}`)
}
