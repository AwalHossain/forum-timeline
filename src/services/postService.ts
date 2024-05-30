import { PostType } from '@/types/post.types';
import { apiService } from './apiService';


export const MAX_POST_LIMIT = 10;


export const fetchPosts = async ({pageParam}:{pageParam:number}) => {


  try {
    const response = await apiService.get<PostType[]>(`/posts?_page=${pageParam}&_limit=${MAX_POST_LIMIT}`);
    return response;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
};



