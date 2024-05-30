import { fetchPosts } from "@/services/postService";
import { PostType } from "@/types/post.types";
import { useEffect, useState } from "react";


const useFetchPosts = () => {
    const [posts, setPosts] = useState<PostType[]>([]);
    const [error, setError] = useState(false);
    const [isLoadingPosts, setIsLoadingPosts] = useState(true);

        

    useEffect(() => {
        const fetchData = async () => {
            try {
                const postsData = await fetchPosts({pageParam:1});
                setPosts(postsData);
                setIsLoadingPosts(false);
            } catch (error) {
                console.error('Error fetching posts:', error);
                setError(true);
                setIsLoadingPosts(false);
            }
        }
        fetchData();
        },[]);

        return { posts, error, isLoadingPosts };
}

export default useFetchPosts;