import axios from "axios";
import type { ListCitiesResponse } from "../interfaces";

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

export const getAlCityList = async (
  token: string
): Promise<ListCitiesResponse | undefined> => {
  const response = await api.get("/cities/list", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
