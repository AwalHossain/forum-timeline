import { CommentType } from '@/types/post.types';
import { apiService } from './apiService';


export const fetchComments = async (postId: number) => {
  try {
    const response = await apiService.get<CommentType[]>(`/comments?postId=${postId}`);
    return response;
  } catch (error) {
    console.error('Error fetching comments:', error);
    throw error;
  }
};