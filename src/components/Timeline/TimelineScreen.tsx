import Post from "../Post/Post";

export default function TimelineScreen() {
    const posts = [
        {
            id: 1,
            title: 'Sample Post 1',
            body: 'This is the body of the first sample post.',
            userName: 'John Doe',
        },
        {
            id: 2,
            title: 'Sample Post 2',
            body: 'This is the body of the second sample post.',
            userName: 'Jane Smith',
        },
        // Add more sample posts as needed
    ];
    return (
        <div className={` bg-gray-100 p-4`}>
            <h1 className="text-2xl font-bold mb-4">Timeline</h1>
            {/* Render posts here */}
            {
                posts.map((post, index) => (
                    <Post key={index} title={post.title} userName={post.userName} body={post.body} postId={post.id} />
                ))
            }
        </div>
    )
}
