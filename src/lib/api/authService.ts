import axios from "axios";
import type { FormDataLogin } from "../interfaces";

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

export const SignIn = async ({ phone, password }: FormDataLogin) => {
  const response = await api.post("/auth/login", { phone, password });

  return response.data;
};

export const getUser = async (token: string) => {
  const response = await api.get("/auth/profile", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const signOutUser = async (token: string) => {
  const response = await api.post(
    "/auth/logout",
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};
