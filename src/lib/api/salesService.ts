import axios from "axios";
import type { ListSalesResponse } from "../interfaces";

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

export const getAllSales = async (
  token: string
): Promise<ListSalesResponse | undefined> => {
  const response = await api.get("/sales/list", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
