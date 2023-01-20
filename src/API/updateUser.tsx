import axios from "axios";
import { User } from "../Model/User";

export function updateUser(user: User) {
    return axios.patch<User>(`http://localhost:4000/users/${user.id}`, user)
}
