import { fetchComments } from "@/services/commentService";
import { CommentType } from "@/types/post.types";
import { useEffect, useState } from "react";


const useFetchComments = (postId: number,isExpanded:boolean) => {
    const [comments, setComments] = useState<CommentType[]>([]);
    const [error, setError] = useState(false);
    const [isLoadingComments, setIsLoadingComments] = useState(true);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const commentsData = await fetchComments(postId);
          setComments(commentsData);
          setIsLoadingComments(false);
        } catch (error) {
          setIsLoadingComments(false);
          setError(true);
          console.error('Error fetching comments:', error);
        }
      };
  
      if (isExpanded) {
        fetchData();
        }
    }, [postId,isExpanded]);
  
    return { comments, error, isLoadingComments };
  };

export default useFetchComments;