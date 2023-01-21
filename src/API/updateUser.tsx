import axios from "axios";
import { User } from "../Model/User";

export function updateUser(user: User) {
    return axios.patch<User>(`https://user-api-ebutler.onrender.com/users/${user.id}`, user)
}
