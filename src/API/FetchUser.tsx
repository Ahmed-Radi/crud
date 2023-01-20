import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export async function fetchUsers() {
    const { data } = await axios('http://localhost:4000/users')
    return data
}

export const useGetUser = () => useQuery({ queryKey: ['user'], queryFn: fetchUsers })