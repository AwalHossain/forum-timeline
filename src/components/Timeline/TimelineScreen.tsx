import { fetchPosts, fetchUsers } from "@/services/services";
import { PostType, UserType } from "@/types/post.types";
import { useEffect, useState } from "react";
import Post from "../Post/Post";

export default function TimelineScreen() {
    const [posts, setPosts] = useState<PostType[]>([]);
    const [users, setUsers] = useState<UserType[]>([]);
    const [isLoadingPosts, setIsLoadingPosts] = useState(true);
    const [isLoadingUsers, setIsLoadingUsers] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const postsData = await fetchPosts();
                setPosts(postsData);
                setIsLoadingPosts(false);
            } catch (error) {
                console.error('Error fetching posts:', error);
                setIsLoadingPosts(false);
            }

            try {
                const usersData = await fetchUsers();
                setUsers(usersData);
                setIsLoadingUsers(false);
            } catch (error) {
                console.error('Error fetching users:', error);
                setIsLoadingUsers(false);
            }
        };

        fetchData();

    }, []);

    return (
        <div className={` bg-gray-100 p-4`}>
            <h1 className="text-2xl font-bold mb-4">Timeline</h1>
            {/* Render posts here */}
            {isLoadingPosts || isLoadingUsers ? (
                <p className="w-screen h-screen flex items-center justify-center">
                    {/* loading svg */}
                    <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                </p>
            ) : (
                posts.map((post, index) => {
                    const user = users.find((user) => user.id === post.userId);
                    return (<Post key={index} title={post.title} userName={user?.username || "Anynomous"} body={post.body} postId={post.id} />)
                })
            )}
        </div>
    )
}
