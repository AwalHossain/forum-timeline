import { useState } from 'react';

import { fetchUserComments } from '@/services/services';
import { CommentType } from '../../types/post.types';
import Comment from '../Comment/Comment';


interface PostProps {
    title: string;
    body: string;
    userName: string;
    postId: number;
}

export default function Post({ title, body, userName, postId }: PostProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [comments, setComments] = useState<CommentType[]>([]);
    const fetchComments = async () => {
        try {
            const commentsData = await fetchUserComments(postId);
            setComments(commentsData);
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    };

    const toggleExpand = async () => {
        setIsExpanded(!isExpanded);
        if (!isExpanded && comments.length === 0) {
            await fetchComments();
        }
    };

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
            <p className="text-gray-600 mb-2">By {userName}</p>
            <p>{body}</p>
            {isExpanded && (
                <div className="mt-4">
                    <h3 className="text-lg font-bold mb-2">Comments</h3>
                    {comments.map((comment) => (
                        <Comment
                            key={comment.id}
                            name={comment.name}
                            email={comment.email}
                            body={comment.body}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

