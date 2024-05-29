import { UserType } from "@/types/post.types";
import { apiService } from "./apiService";



export const fetchUsers = async () => {

  
    try {
      const response = await apiService.get<UserType[]>(`/users`);

      return response;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  };
