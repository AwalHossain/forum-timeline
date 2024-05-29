import axios from 'axios';

const BASE_URL = 'https://jsonplaceholder.typicode.com';


export const fetchPosts = async () => {


  try {
    const response = await axios.get(`${BASE_URL}/posts`);
    return response.data;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
};


export const fetchUsers = async () => {

  
    try {
      const response = await axios.get(`${BASE_URL}/users`);

      return response.data;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  };


export const fetchUserComments = async (postId: number) => {
    try {
      const response = await axios.get(`${BASE_URL}/comments?postId=${postId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching comments:', error);
      throw error;
    }
  };