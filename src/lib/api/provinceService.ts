import axios from "axios";
import type { ListProvinceResponse } from "../interfaces";

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

export const getAllProvinceList = async (
  token: string
): Promise<ListProvinceResponse | undefined> => {
  const response = await api.get("/provinces/list", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
