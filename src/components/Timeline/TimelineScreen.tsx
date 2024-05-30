import useFetchUsers from "@/hooks/useFetchUsers";
import { fetchPosts } from "@/services/postService";
import Loading from "@/utils/Loading";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useCallback, useMemo, useRef } from "react";
import Post from "../Post/Post";

const POSTS_PER_PAGE = 10;

export default function TimelineScreen() {
    // const { posts, error: errorPosts, isLoadingPosts } = useFetchPosts();
    const { users, error: errorUsers, isLoadingUsers } = useFetchUsers();
    const observer = useRef<IntersectionObserver>();

    const { data, error, fetchNextPage, hasNextPage, isFetching, isLoading } = useInfiniteQuery({
        queryKey: ['posts'],
        queryFn: ({ pageParam = 1 }) => fetchPosts({ pageParam }),
        initialPageParam: 1,
        getNextPageParam: (lastPage, allPages) => {
            return lastPage.length === POSTS_PER_PAGE ? allPages.length + 1 : undefined;
        },
    });
    const lastElementRef = useCallback(
        (node: HTMLDivElement) => {
            if (isLoading) return;
            if (observer.current) observer.current.disconnect();

            observer.current = new IntersectionObserver(
                (entries) => {
                    if (entries[0].isIntersecting && hasNextPage && !isFetching) {
                        console.log('visible checking');
                        fetchNextPage();
                    }
                },
                {
                    root: null, // Use the viewport as the root
                    rootMargin: '0px', // Margin around the root
                    threshold: 1, // Trigger when 100% of the target is visible
                }
            );

            if (node) observer.current.observe(node);
        },
        [fetchNextPage, hasNextPage, isFetching, isLoading]
    );
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
