import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

// Add customer
export const addCustomer = async (token: string, params) => {
  const response = await api.post("/customers", params, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const editCustomer = async (token: string, code: string, params) => {
  const response = await api.put(`/customers/${code}`, params, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

// Get all customer
export const getAllCustomer = async (token: string) => {
  const response = await api.get("/customers/list", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data.items;
};

// By Code
export const getCustomer = async (token: string, code: string) => {
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
