import axiosInstance from "@/src/lib/axios";

export interface User {
  id: number;
  name: string;
  email: string;
}

export const userService = {
  // Get all users
  getAll: async () => {
    const repsonse = await axiosInstance.get<User[]>("/users");
    return repsonse.data;
  },

  // Get user by id
  getByID: async (id: number) => {
    const response = await axiosInstance.get<User>(`/users/${id}`);

    return response.data;
  },

  // Create user
  create: async (data: Omit<User, "id">) => {
    const repsonse = await axiosInstance.post<User>("/users", data);

    return repsonse.data;
  },

  // Update user
  update: async (id: number, data: Partial<User>) => {
    const repsonse = await axiosInstance.put<User>(`/users/${id}`, data);

    return repsonse.data;
  },

  // Delete user
  delete: async (id: number) => {
    const repsonse = await axiosInstance.delete(`/users/${id}`);

    return repsonse.data;
  },
};
