/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import type {
  DailyTransactionsProps,
  MonthlyTransactionProps,
  TopCustomerProps,
  YearlyTransactionProps,
} from "../interfaces";

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

export const dailyTransactions = async (
  token: string,
  params?: Record<string, any>
): Promise<DailyTransactionsProps | undefined> => {
  const response = await api.get("/summaries/daily-transactions", {
    params,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const monthlyTransactions = async (
  token: string,
  params?: Record<string, any>
): Promise<MonthlyTransactionProps | undefined> => {
  const response = await api.get("/summaries/monthly-transactions", {
    params,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const yearlyTransactions = async (
  token: string,
  params?: Record<string, any>
): Promise<YearlyTransactionProps | undefined> => {
  const response = await api.get("/summaries/yearly-transactions", {
    params,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const topCustomer = async (
  token: string,
  params?: Record<string, any>
): Promise<TopCustomerProps | undefined> => {
  const response = await api.get("/summaries/top-customers", {
    params,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
