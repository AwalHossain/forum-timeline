import { PostType } from '@/types/post.types';
import { apiService } from './apiService';



export const fetchPosts = async () => {


  try {
    const response = await apiService.get<PostType[]>(`/posts`);
    return response;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
};



