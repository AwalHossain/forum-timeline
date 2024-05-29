


import { fetchUsers } from "@/services/userService";
import { UserType } from "@/types/post.types";
import { useEffect, useState } from "react";


const useFetchUsers = () => {
    const [users, setUser] = useState<UserType[]>([]);
    const [error, setError] = useState(false);
    const [isLoadingUsers, setIsLoadingUsers] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const postUser = await fetchUsers();
                setUser(postUser);
                setIsLoadingUsers(false);
            } catch (error) {
                console.error('Error fetching posts:', error);
                setError(true);
                setIsLoadingUsers(false);
            }
        }
        fetchData();
        },[]);

        return { users, error, isLoadingUsers };
}

export default useFetchUsers;