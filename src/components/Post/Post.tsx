import { useState } from 'react';

import usePostComments from '@/hooks/useFetchComments';
import Comment from '../Comment/Comment';


interface PostProps {
    title: string;
    body: string;
    userName: string;
    postId: number;
}

export default function Post({ title, body, userName, postId }: PostProps) {
    const [isExpanded, setIsExpanded] = useState(false);


    const { comments, error, isLoadingComments } = usePostComments(postId, isExpanded);

    const toggleExpand = async () => {
        setIsExpanded(!isExpanded);

    };


    let content;
    if (!isLoadingComments && comments.length > 0) {
        content = comments.map((comment) => (
            <Comment
                key={comment.id}
                name={comment.name}
                email={comment.email}
                body={comment.body}
            />
        ))
    } else if (isLoadingComments) {
        content = <span className='flex justify-center items-center'>Loading....</span>
    } else if (error) {
        content = <span className='flex justify-center items-center'>Error fetching comments</span>
    } else {
        content = <span className='flex justify-center items-center'>No comments found</span>
    }


    return (
        <div className={` bg-white p-4 rounded-lg shadow-md mb-4`}>
            <div className="flex justify-between items-center mb-2">
                <h2 className="text-lg font-bold">{title}</h2>
                <button
                    className="text-blue-500 hover:text-blue-700 focus:outline-none"
                    onClick={toggleExpand}
                >
                    {isExpanded ? 'Collapse' : 'Expand'}
                </button>
            </div>
            <div className="text-gray-600 mb-2 flex items-center">
                <div className="bg-gray-400 rounded-full w-10 h-10 flex items-center justify-center text-white font-bold mr-2">
                    {userName.charAt(0).toUpperCase()}
                </div>
                <span className='inline-block font-bold'>
                    {userName}
                </span>
            </div>
            <p>{body}</p>
            {isExpanded && (
                <>
                    <h3 className="text-lg font-bold my-2">Comments</h3>
                    <div className="mt-4 px-8">
                        {
                            content
                        }
                    </div>
                </>
            )}
        </div>
    );
}

