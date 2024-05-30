import useFetchUsers from "@/hooks/useFetchUsers";
import useInfiniteScroll from "@/hooks/useInfinityScroll";
import { MAX_POST_LIMIT, fetchPosts } from "@/services/postService";
import Loading from "@/utils/Loading";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import Post from "../Post/Post";



export default function TimelineScreen() {
    // const { posts, error: errorPosts, isLoadingPosts } = useFetchPosts();
    const { users, error: errorUsers, isLoadingUsers } = useFetchUsers();

    const { data, error, fetchNextPage, hasNextPage, isFetching, isLoading } = useInfiniteQuery({
        queryKey: ['posts'],
        queryFn: ({ pageParam = 1 }) => fetchPosts({ pageParam }),
        initialPageParam: 1,
        getNextPageParam: (lastPage, allPages) => {
            return lastPage.length === MAX_POST_LIMIT ? allPages.length + 1 : undefined;
        },
    });
    const lastElementRef = useInfiniteScroll({ isLoading, fetchNextPage, hasNextPage, isFetching })
    const posts = useMemo(() => {
        return data?.pages.reduce((acc, page) => {
            return [...acc, ...page];
        }, []);
    }, [data]) || [];

    let content;
    if (isLoading || isLoadingUsers || isFetching) {
        content = <Loading />
    } else if (error || errorUsers) {
        content = <span className='flex justify-center items-center'>Error fetching posts</span>
    } else if (!isLoading && !isLoadingUsers && posts.length > 0 && users.length > 0) {
        content = posts &&
            posts?.map((post, index) => {
                const user = users.find((user) => user.id === post.userId);
                const isLastElement = index === posts.length - 1;

                return (
                    <div ref={isLastElement ? lastElementRef : null} key={index}>
                        <Post
                            title={post.title}
                            userName={user?.username || "Anynomous"}
                            body={post.body}
                            postId={post.id}
                        />
                    </div>
                );
            })
    } else {
        content = <span className='flex justify-center items-center'>No posts found</span>
    }


    return (
        <div className={` bg-gray-100 p-4`}>
            <h1 className="text-2xl font-bold mb-4">Timeline</h1>
            {/* Render posts here */}
            <div>
                {content}
            </div>
        </div>
    );
}
