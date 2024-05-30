import { UserType } from "@/types/post.types";
import { apiService } from "./apiService";



export const fetchUsers = async ({pageParam}:{pageParam:number}) => {

  
    try {
      const response = await apiService.get<UserType[]>(`/users?_page=${pageParam}&_limit=10`);

      return response;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  };
