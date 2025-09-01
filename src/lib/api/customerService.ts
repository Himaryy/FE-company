/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import type {
  CustomerByCode,
  CustomerParams,
  CustomerResponse,
} from "../interfaces";

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

// Add customer
export const addCustomer = async (
  token: string,
  params?: Record<string, any>
) => {
  const response = await api.post("/customers", params, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const editCustomer = async (
  token: string,
  code: string,
  params?: Record<string, any>
) => {
  const response = await api.put(`/customers/${code}`, params, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

// Get all customer
export const getAllCustomer = async (
  token: string,
  params?: CustomerParams
): Promise<CustomerResponse | undefined> => {
  const response = await api.get("/customers", {
    params,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

// By Code
export const getCustomer = async (
  token: string,
  code: string
): Promise<CustomerByCode | undefined> => {
  const response = await api.get(`/customers/${code}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  // return response.data[0];
  return response.data;
};

export const getDetailsCustomer = async (token: string, code: string) => {
  const response = await api.get(`/customers/${code}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
