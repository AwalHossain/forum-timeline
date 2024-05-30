import useInfiniteScroll from "@/hooks/useInfinityScroll";
import { MAX_POST_LIMIT, fetchPosts } from "@/services/postService";
import { fetchUsers } from "@/services/userService";
import Loading from "@/utils/Loading";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import Post from "../Elements/Post";


export default function TimelineScreen() {
    const {
        data: postData,
        error: postError,
        fetchNextPage: fetchNextPostPage,
        hasNextPage: hasPostNextPage,
        isFetching: isFetchingPosts,
        isLoading: isPostsLoading,
    } = useInfiniteQuery({
        queryKey: ['posts'],
        queryFn: ({ pageParam = 1 }) => fetchPosts({ pageParam }),
        initialPageParam: 1,
        getNextPageParam: (lastPage, allPages) => {
            return lastPage.length === MAX_POST_LIMIT ? allPages.length + 1 : undefined;
        },
        refetchOnWindowFocus: false,
    });

    const {
        data: userData,
        error: userError,
        fetchNextPage: fetchNextUserPage,
        hasNextPage: hasUserNextPage,
        isFetching: isFetchingUsers,
        isLoading: isUsersLoading,
    } = useInfiniteQuery({
        queryKey: ['users'],
        queryFn: ({ pageParam = 1 }) => fetchUsers({ pageParam }),
        initialPageParam: 1,
        getNextPageParam: (lastPage, allPages) => {
            return lastPage.length === MAX_POST_LIMIT ? allPages.length + 1 : undefined;
        },
        refetchOnWindowFocus: false,
    });

    const lastPostElementRef = useInfiniteScroll({
        isLoading: isPostsLoading,
        fetchNextPage: fetchNextPostPage,
        hasNextPage: hasPostNextPage,
        isFetching: isFetchingPosts,
    });

    const lastUserElementRef = useInfiniteScroll({
        isLoading: isUsersLoading,
        fetchNextPage: fetchNextUserPage,
        hasNextPage: hasUserNextPage,
        isFetching: isFetchingUsers,
    });

    const posts = useMemo(() => {
        return postData?.pages.reduce((acc, page) => {
            return [...acc, ...page];
        }, []);
    }, [postData]) || [];

    const users = useMemo(() => {
        return userData?.pages.reduce((acc, page) => {
            return [...acc, ...page];
        }, []);
    }, [userData]) || [];

    let content;
    if (isPostsLoading || isUsersLoading || isFetchingPosts || isFetchingUsers) {
        content = <Loading />;
    } else if (postError || userError) {
        content = <span className="flex justify-center items-center">Error fetching data</span>;
    } else if (posts?.length > 0 && users.length > 0) {
        content = posts?.map((post, index) => {
            const user = users.find((user) => user.id === post.userId);
            const isLastPostElement = index === posts.length - 1;
            const isLastUserElement = index === users.length - 1;

            return (
                <div key={index} className="bg-gray-50 ">
                    <div ref={isLastPostElement ? lastPostElementRef : null} >
                        <Post
                            title={post.title}
                            userName={user?.username || "Anonymous"}
                            body={post.body}
                            postId={post.id}
                        />
                    </div>
                    {isLastUserElement && <div ref={lastUserElementRef} />}
                </div>
            );
        });
    } else {
        content = <span className="flex justify-center items-center">No data found</span>;
    }

    return (
        <div className=" min-h-screen ">
            <div className="max-w-3xl mx-auto py-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                    Timeline
                </h1>
                <div className=" p-2">
                    {content}
                </div>
            </div>
        </div>
    );
}