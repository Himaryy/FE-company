import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

export const getAllCustomer = async (token: string) => {
  const response = await api.get("/customers/list", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data.items;
};
