/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import { AppContext } from "./AppContext";
import { useState, type ReactNode } from "react";
import {
  changePasswordUser,
  getUser,
  registerUser,
  SignIn,
  signOutUser,
} from "@/lib/api/authService";
import { useNavigate } from "react-router-dom";
import {
  addCustomer,
  editCustomer,
  getAllCustomer,
  getCustomer,
  getDetailsCustomer,
} from "@/lib/api/customerService";
import type {
  ChangePasswordFormValues,
  CustomerFormValues,
  RegisterFormValues,
} from "@/lib/zodSchemas";
import {
  type Transaction,
  type DetailsCustomer,
  type FormDataLogin,
  type TransactionResponse,
  type DetailsTransactionProps,
  type DailyTransactionsProps,
  type MonthlyTransactionProps,
  type YearlyTransactionProps,
  type TopCustomerItems,
  type CustomerItems,
  type CustomerByCode,
  type ListProvinceItems,
  type ListCitiesItems,
  type ListSalesItems,
  type CustomerParams,
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
import { getAllProvinceList } from "@/lib/api/provinceService";
import { getAlCityList } from "@/lib/api/cityService";
import { getAllSales } from "@/lib/api/salesService";

interface Props {
  children: ReactNode;
}

export const AppContextProvider = ({ children }: Props) => {
  const [user, setUser] = useState(null);

  const [provinceList, setProvinceList] = useState<ListProvinceItems[]>([]);
  const [cityList, setCityList] = useState<ListCitiesItems[]>([]);
  const [salesList, setSalesList] = useState<ListSalesItems[]>([]);

  const [customers, setCustomers] = useState<CustomerItems[]>([]);
  const [detailCustomer, setDetailCustomer] = useState<DetailsCustomer | null>(
    null
  );
  const [customerByCode, setCustomerByCode] = useState<
    CustomerByCode | undefined
  >(undefined);

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [totalTransactions, setTotalTransactions] = useState(0);
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

  // Register
  const register = async (params: RegisterFormValues) => {
    try {
      const data = await registerUser(params);

      return data;
    } catch (error) {
      console.error("Failed to Register User:", error);
      throw error;
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
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // Change Password
  const changePassword = async (params: ChangePasswordFormValues) => {
    try {
      const accToken = localStorage.getItem("accessToken");
      if (!accToken) {
        throw new Error("Token not found");
      }

      const data = await changePasswordUser(accToken, params);

      return data;
    } catch (error) {
      console.error("Failed to Change Password:", error);
      throw error;
    }
  };

  // Get Province List
  const getProvinceList = async () => {
    try {
      const accToken = localStorage.getItem("accessToken");
      if (!accToken) {
        throw new Error("Token not found");
      }

      const data = await getAllProvinceList(accToken);
      setProvinceList(data?.items ?? []);
      return data;
    } catch (error) {
      console.error("Failed to get list provinces:", error);
    }
  };

  // Get City List
  const getCityList = async () => {
    try {
      const accToken = localStorage.getItem("accessToken");
      if (!accToken) {
        throw new Error("Token not found");
      }

      const data = await getAlCityList(accToken);
      setCityList(data?.items ?? []);
      return data;
    } catch (error) {
      console.error("Failed to get list provinces:", error);
    }
  };

  // Get sales list
  const getSalesList = async () => {
    try {
      const accToken = localStorage.getItem("accessToken");
      if (!accToken) {
        throw new Error("Token not found");
      }

      const data = await getAllSales(accToken);
      setSalesList(data?.items ?? []);

      return data;
    } catch (error) {
      console.error("Failed to get list sales:", error);
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

      if (data.responseCode === "20000") {
        await fetchAllCustomer({
          page: 1,
          perPage: 10,
          sortBy: "created_at",
          sortDirection: "desc",
          startDate: "2023-01-01",
          endDate: "2026-12-30",
        });
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
      if (data.responseCode === "20000") {
        await fetchAllCustomer({
          page: 1,
          perPage: 10,
          sortBy: "created_at",
          sortDirection: "desc",
          startDate: "2023-01-01",
          endDate: "2026-12-30",
        });
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
  const fetchAllCustomer = async (params?: CustomerParams) => {
    try {
      const accToken = localStorage.getItem("accessToken");
      if (!accToken) {
        throw new Error("Token not found");
      }

      const data = await getAllCustomer(accToken, params);

      setCustomers(data?.items ?? []);
      return data;
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
      return data;
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
      setTotalTransactions(data?.total ?? 0);
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

  // useEffect(() => {
  //   const accToken = localStorage.getItem("accessToken");
  //   if (accToken) {
  //     fetchAllCustomer();
  //   }
  // }, []);

  const value = {
    navigate,
    user,
    changePassword,
    signIn,
    signOut,
    register,
    provinceList,
    getProvinceList,
    cityList,
    getCityList,
    salesList,
    getSalesList,
    customers,
    fetchAllCustomer,
    fetchCustomerByCode,
    detailCustomer,
    addDataCustomer,
    editDataCustomer,
    getDetailsDataCustomer,
    customerByCode,
    resetDetailCustomer,
    transactions,
    totalTransactions,
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
