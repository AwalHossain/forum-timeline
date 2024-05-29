import { fetchPosts } from "@/services/postService";
import { fetchUsers } from "@/services/userService";
import { PostType, UserType } from "@/types/post.types";
import Loading from "@/utils/Loading";
import { useEffect, useState } from "react";
import Post from "../Post/Post";

export default function TimelineScreen() {
    const [posts, setPosts] = useState<PostType[]>([]);
    const [users, setUsers] = useState<UserType[]>([]);
    const [error, setError] = useState(false);
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
                setError(true);
                setIsLoadingPosts(false);
            }

            try {
                const usersData = await fetchUsers();
                setUsers(usersData);
                setIsLoadingUsers(false);
            } catch (error) {
                console.error('Error fetching users:', error);
                setError(true);
                setIsLoadingUsers(false);
            }
        };

        fetchData();

    }, []);

    let content;
    if (isLoadingPosts || isLoadingUsers) {
        content = <Loading />
    } else if (error) {
        content = <span className='flex justify-center items-center'>Error fetching posts</span>
    } else if (!isLoadingPosts && !isLoadingUsers && posts.length > 0 && users.length > 0) {
        content = posts.map((post, index) => {
            const user = users.find((user) => user.id === post.userId);
            return (<Post key={index} title={post.title} userName={user?.username || "Anynomous"} body={post.body} postId={post.id} />)
        })
    } else {
        content = <span className='flex justify-center items-center'>No posts found</span>
    }


    return (
        <div className={` bg-gray-100 p-4`}>
            <h1 className="text-2xl font-bold mb-4">Timeline</h1>
            {/* Render posts here */}
            {
                content
            }
        </div>
    )
}
