/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import type { FormDataLogin } from "../interfaces";
import type {
  ChangePasswordFormValues,
  RegisterFormValues,
} from "../zodSchemas";

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

export const registerUser = async (params: RegisterFormValues) => {
  const response = await api.post("/auth/register", params);

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

export const changePasswordUser = async (
  token: string,
  params: ChangePasswordFormValues
) => {
  const response = await api.put("/auth/password", params, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
