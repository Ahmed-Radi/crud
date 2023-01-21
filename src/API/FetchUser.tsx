import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export async function fetchUsers() {
    const { data } = await axios('https://user-api-ebutler.onrender.com/users')
    return data
}

export const useGetUser = () => useQuery({ queryKey: ['user'], queryFn: fetchUsers })