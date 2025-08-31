/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import { AppContext } from "./AppContext";
import { useState, type ReactNode } from "react";
import { getUser, SignIn, signOutUser } from "@/lib/api/authService";
import { useNavigate } from "react-router-dom";
import {
  addCustomer,
  editCustomer,
  getAllCustomer,
  getCustomer,
  getDetailsCustomer,
} from "@/lib/api/customerService";
import type { CustomerFormValues } from "@/lib/zodSchemas";
import {
  type Transaction,
  type Customer,
  type DetailsCustomer,
  type FormDataLogin,
  type TransactionResponse,
  type DetailsTransactionProps,
  type DailyTransactionsProps,
  type MonthlyTransactionProps,
  type YearlyTransactionProps,
  type TopCustomerProps,
  type TopCustomerItems,
} from "@/lib/interfaces";
import {
  detailsTransaction,
  getAllTransaction,
} from "@/lib/api/transactionService";
import {
  dailyTransactions,
  monthlyTransactions,
  topCustomer,
  yearlyTransactions,
} from "@/lib/api/summaryService";

interface Props {
  children: ReactNode;
}

export const AppContextProvider = ({ children }: Props) => {
  const [user, setUser] = useState(null);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [detailCustomer, setDetailCustomer] = useState<DetailsCustomer | null>(
    null
  );
  const [customerByCode, setCustomerByCode] = useState<Customer | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [detailsTransactionData, setDetailsTransactionData] =
    useState<DetailsTransactionProps | null>(null);
  const [dailyTransactionsData, setDailyTransactionsData] =
    useState<DailyTransactionsProps | null>(null);
  const [monthlyTransactionsData, setMonthlyTransactionsData] =
    useState<MonthlyTransactionProps | null>(null);
  const [yearlyTransactionsData, setYearlyTransactionsData] =
    useState<YearlyTransactionProps | null>(null);
  const [topCustomerData, setTopCustomerData] = useState<TopCustomerItems[]>(
    []
  );

  const [token, setToken] = useState<string | null>(
    localStorage.getItem("accessToken")
  );

  const navigate = useNavigate();
  const resetDetailCustomer = () => setDetailCustomer(null);

  // Login
  const signIn = async ({ phone, password }: FormDataLogin) => {
    try {
      const data = await SignIn({ phone, password });

      localStorage.setItem("accessToken", data.accessToken);

      navigate("/");

      await fetchUserData();
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  // Logout
  const signOut = async () => {
    try {
      const accToken = localStorage.getItem("accessToken");
      if (!accToken) {
        throw new Error("Token not found");
      }

      await signOutUser(accToken);
      localStorage.removeItem("user");
      localStorage.removeItem("accessToken");

      setUser(null);
      setToken(null);
      navigate("/sign-in");

      console.log("Logout Success");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // Get Data User
  const fetchUserData = async () => {
    try {
      const accToken = localStorage.getItem("accessToken");
      if (!accToken) {
        throw new Error("Token not found");
      }

      const data = await getUser(accToken);
      setUser(data);
      setToken(accToken);

      localStorage.setItem("user", JSON.stringify(data));
      // navigate("/");
    } catch (error) {
      console.error("Failed to get user:", error);
    }
  };

  // Add Customer
  const addDataCustomer = async (values: CustomerFormValues) => {
    try {
      const accToken = localStorage.getItem("accessToken");
      if (!accToken) {
        throw new Error("Token not found");
      }

      const data = await addCustomer(accToken, values);

      if (data.success) {
        await fetchAllCustomer();
      }

      return data;
    } catch (error) {
      console.error("Failed to add customer:", error);
      throw error;
    }
  };

  // Edit Customer
  const editDataCustomer = async (values: CustomerFormValues, code: string) => {
    try {
      const accToken = localStorage.getItem("accessToken");
      if (!accToken) {
        throw new Error("Token not found");
      }

      const data = await editCustomer(accToken, code, values);

      // refetch
      if (data.success) {
        await fetchAllCustomer();
        navigate("/customers");
      }

      return data;
    } catch (error) {
      console.error("Failed to edit customer:", error);
      throw error;
    }
  };

  // Get Details customer
  const getDetailsDataCustomer = async (code: string) => {
    try {
      const accToken = localStorage.getItem("accessToken");
      if (!accToken) {
        throw new Error("Token not found");
      }
      const data = await getDetailsCustomer(accToken, code);

      setDetailCustomer(data);
      return data;
    } catch (error) {
      console.error("Failed to get customer detail:", error);
    }
  };

  // Get All Customer
  const fetchAllCustomer = async () => {
    try {
      const accToken = localStorage.getItem("accessToken");
      if (!accToken) {
        throw new Error("Token not found");
      }

      const data = await getAllCustomer(accToken);

      setCustomers(data);
    } catch (error) {
      console.error("Failed to get all customer:", error);
    }
  };

  // Get Customer by Code
  const fetchCustomerByCode = async (code: string) => {
    try {
      const accToken = localStorage.getItem("accessToken");
      if (!accToken) {
        throw new Error("Token not found");
      }
      const data = await getCustomer(accToken, code);

      setCustomerByCode(data);
    } catch (error) {
      console.error("Failed to get customer detail:", error);
    }
  };

  // Transaction
  const getTransactionData = async (
    params?: Record<string, any>
  ): Promise<TransactionResponse | undefined> => {
    try {
      const accToken = localStorage.getItem("accessToken");
      if (!accToken) {
        throw new Error("Token not found");
      }

      const data = await getAllTransaction(accToken, params);

      setTransactions(data?.items ?? []);
      return data;
    } catch (error) {
      console.error("Failed to fetch transactions:", error);
    }
  };

  const getDetailsTransaction = async (no: string) => {
    try {
      const accToken = localStorage.getItem("accessToken");
      if (!accToken) {
        throw new Error("Token not found");
      }

      const data = await detailsTransaction(accToken, no);

      setDetailsTransactionData(data ?? null);
      return data;
    } catch (error) {
      console.error("Failed to fetch transactions:", error);
    }
  };

  // Daily Transaction
  const getDailyTransactions = async (params?: Record<string, any>) => {
    try {
      const accToken = localStorage.getItem("accessToken");
      if (!accToken) {
        throw new Error("Token not found");
      }

      const data = await dailyTransactions(accToken, params);
      setDailyTransactionsData(data ?? null);

      return data;
    } catch (error) {
      console.error("Failed to fetch daily transactions:", error);
    }
  };

  // Monthly Transaction
  const getMonthlyTransactions = async (params?: Record<string, any>) => {
    try {
      const accToken = localStorage.getItem("accessToken");
      if (!accToken) {
        throw new Error("Token not found");
      }

      const data = await monthlyTransactions(accToken, params);
      setMonthlyTransactionsData(data ?? null);

      return data;
    } catch (error) {
      console.error("Failed to fetch daily transactions:", error);
    }
  };

  // yearly
  const getYearlyTransactions = async (params?: Record<string, any>) => {
    try {
      const accToken = localStorage.getItem("accessToken");
      if (!accToken) {
        throw new Error("Token not found");
      }

      const data = await yearlyTransactions(accToken, params);
      setYearlyTransactionsData(data ?? null);

      return data;
    } catch (error) {
      console.error("Failed to fetch daily transactions:", error);
    }
  };

  // top customer
  const getTopCustomer = async (params?: Record<string, any>) => {
    try {
      const accToken = localStorage.getItem("accessToken");
      if (!accToken) {
        throw new Error("Token not found");
      }

      const data = await topCustomer(accToken, params);
      setTopCustomerData(data?.items ?? []);

      return data;
    } catch (error) {
      console.error("Failed to fetch daily transactions:", error);
    }
  };

  useEffect(() => {
    const accToken = localStorage.getItem("accessToken");
    if (accToken && !user) {
      fetchUserData();
    }
  }, [user]);

  useEffect(() => {
    const accToken = localStorage.getItem("accessToken");
    if (accToken) {
      fetchAllCustomer();
    }
  }, []);

  const value = {
    navigate,
    user,
    signIn,
    signOut,
    customers,
    fetchCustomerByCode,
    detailCustomer,
    addDataCustomer,
    editDataCustomer,
    getDetailsDataCustomer,
    customerByCode,
    resetDetailCustomer,
    transactions,
    getTransactionData,
    getDetailsTransaction,
    detailsTransactionData,
    getDailyTransactions,
    dailyTransactionsData,
    getMonthlyTransactions,
    monthlyTransactionsData,
    getYearlyTransactions,
    yearlyTransactionsData,
    getTopCustomer,
    topCustomerData,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
