import axiosInstance from "@/src/lib/axios";
export interface User {
  id: number;
  name: string;
  email: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  token: string;
}

export interface RegisterCredential {
  name: string;
  email: string;
  password: string;
}

export const authService = {
  // Login
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    const response = await axiosInstance.post<LoginResponse>(
      "/auth/login",
      credentials,
    );

    // Store token in localStorage
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
    }

    return response.data;
  },

  logout: async (): Promise<void> => {
    try {
      await axiosInstance.post("/auth/logout");
    } finally {
      localStorage.removeItem("token");
    }
  },

  register: async (credentials: RegisterCredential): Promise<LoginResponse> => {
    const response = await axiosInstance.post<LoginResponse>(
      "/auth/register",
      credentials,
    );

    // Store token in localStorage
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
    }

    return response.data;
  },

  getCurrentUser: async (): Promise<User> => {
    const response = await axiosInstance.get<User>("/auth/me");

    return response.data;
  },

  // Check if user is authenticated
  isAuthenticated: (): boolean => {
    return !!localStorage.getItem("token");
  },
};
