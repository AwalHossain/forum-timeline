import useFetchPosts from "@/hooks/useFetchPosts";
import useFetchUsers from "@/hooks/useFetchUsers";
import Loading from "@/utils/Loading";
import Post from "../Post/Post";

export default function TimelineScreen() {
    const { posts, error: errorPosts, isLoadingPosts } = useFetchPosts();
    const { users, error: errorUsers, isLoadingUsers } = useFetchUsers();

    let content;
    if (isLoadingPosts || isLoadingUsers) {
        content = <Loading />
    } else if (errorPosts || errorUsers) {
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
