/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import type {
  DetailsTransactionProps,
  TransactionResponse,
} from "../interfaces";

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

export const getAllTransaction = async (
  token: string,
  params?: Record<string, any>
): Promise<TransactionResponse | undefined> => {
  const response = await api.get("/transactions", {
    params,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const detailsTransaction = async (
  token: string,
  no: string
): Promise<DetailsTransactionProps | undefined> => {
  const response = await api.get(`/transactions/${no}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
