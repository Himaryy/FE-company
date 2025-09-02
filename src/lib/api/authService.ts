/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import type {
  ChangePasswordResponse,
  FormDataLogin,
  LogoutResponse,
  RegisterResponse,
  SignInResponse,
  User,
} from "../interfaces";
import type {
  ChangePasswordFormValues,
  RegisterFormValues,
} from "../zodSchemas";

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

export const SignIn = async ({
  phone,
  password,
}: FormDataLogin): Promise<SignInResponse> => {
  const response = await api.post("/auth/login", { phone, password });

  return response.data;
};

export const getUser = async (token: string): Promise<User | null> => {
  const response = await api.get("/auth/profile", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const registerUser = async (
  params: RegisterFormValues
): Promise<RegisterResponse> => {
  const response = await api.post("/auth/register", params);

  return response.data;
};

export const signOutUser = async (token: string): Promise<LogoutResponse> => {
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
): Promise<ChangePasswordResponse> => {
  const response = await api.put("/auth/password", params, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
