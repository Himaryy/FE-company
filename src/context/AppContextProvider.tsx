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
  type SignInResponse,
  type LogoutResponse,
  type RegisterResponse,
  type CustomerAddResponse,
  type CustomerEditResponse,
  type ChangePasswordResponse,
  type User,
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
  const [user, setUser] = useState<User | null>(null);

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
  const [loadingUserData, setLoadingUserData] = useState(true);

  const navigate = useNavigate();
  const resetDetailCustomer = () => setDetailCustomer(null);

  // Login
  const signIn = async ({
    phone,
    password,
  }: FormDataLogin): Promise<SignInResponse> => {
    try {
      const data = await SignIn({ phone, password });

      localStorage.setItem("accessToken", data.accessToken);
      await fetchUserData(data.accessToken);

      navigate("/");

      return data;
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  // Register
  const register = async (
    params: RegisterFormValues
  ): Promise<RegisterResponse> => {
    try {
      const data = await registerUser(params);

      return data;
    } catch (error) {
      console.error("Failed to Register User:", error);
      throw error;
    }
  };

  // Logout
  const signOut = async (): Promise<LogoutResponse> => {
    try {
      if (!token) throw new Error("Token not found");

      const data = await signOutUser(token);
      localStorage.removeItem("user");
      localStorage.removeItem("accessToken");

      setUser(null);
      setToken(null);
      navigate("/sign-in");

      return data;
    } catch (error) {
      console.error("Logout failed:", error);
      throw error;
    }
  };

  // Change Password
  const changePassword = async (
    params: ChangePasswordFormValues
  ): Promise<ChangePasswordResponse> => {
    try {
      if (!token) throw new Error("Token not found");

      const data = await changePasswordUser(token, params);

      return data;
    } catch (error) {
      console.error("Failed to Change Password:", error);
      throw error;
    }
  };

  // Get Province List
  const getProvinceList = async () => {
    try {
      if (!token) throw new Error("Token not found");

      const data = await getAllProvinceList(token);
      setProvinceList(data?.items ?? []);
      return data;
    } catch (error) {
      console.error("Failed to get list provinces:", error);
    }
  };

  // Get City List
  const getCityList = async () => {
    try {
      if (!token) {
        throw new Error("Token not found");
      }

      const data = await getAlCityList(token);
      setCityList(data?.items ?? []);
      return data;
    } catch (error) {
      console.error("Failed to get list provinces:", error);
    }
  };

  // Get sales list
  const getSalesList = async () => {
    try {
      if (!token) {
        throw new Error("Token not found");
      }

      const data = await getAllSales(token);
      setSalesList(data?.items ?? []);

      return data;
    } catch (error) {
      console.error("Failed to get list sales:", error);
    }
  };

  // Get Data User
  const fetchUserData = async (tokenParams?: string) => {
    const currentToken = tokenParams ?? token;
    if (!currentToken) {
      setLoadingUserData(false);
      return;
    }

    try {
      setLoadingUserData(true);
      const data = await getUser(currentToken);
      setUser(data ?? null);
      setToken(currentToken);

      localStorage.setItem("user", JSON.stringify(data));
      // navigate("/");
      return data;
    } catch (error) {
      console.error("Failed to get user:", error);
      return null;
    } finally {
      setLoadingUserData(false);
    }
  };

  // Add Customer
  const addDataCustomer = async (
    values: CustomerFormValues
  ): Promise<CustomerAddResponse> => {
    try {
      if (!token) {
        throw new Error("Token not found");
      }

      const data = await addCustomer(token, values);

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
  const editDataCustomer = async (
    values: CustomerFormValues,
    code: string
  ): Promise<CustomerEditResponse> => {
    try {
      if (!token) {
        throw new Error("Token not found");
      }

      const data = await editCustomer(token, code, values);

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
      if (!token) {
        throw new Error("Token not found");
      }
      const data = await getDetailsCustomer(token, code);

      setDetailCustomer(data);
      return data;
    } catch (error) {
      console.error("Failed to get customer detail:", error);
    }
  };

  // Get All Customer
  const fetchAllCustomer = async (params?: CustomerParams) => {
    try {
      if (!token) {
        throw new Error("Token not found");
      }

      const data = await getAllCustomer(token, params);

      setCustomers(data?.items ?? []);
      return data;
    } catch (error) {
      console.error("Failed to get all customer:", error);
    }
  };

  // Get Customer by Code
  const fetchCustomerByCode = async (code: string) => {
    try {
      if (!token) {
        throw new Error("Token not found");
      }
      const data = await getCustomer(token, code);

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
      if (!token) {
        throw new Error("Token not found");
      }

      const data = await getAllTransaction(token, params);

      setTransactions(data?.items ?? []);
      setTotalTransactions(data?.total ?? 0);
      return data;
    } catch (error) {
      console.error("Failed to fetch transactions:", error);
    }
  };

  const getDetailsTransaction = async (no: string) => {
    try {
      if (!token) {
        throw new Error("Token not found");
      }

      const data = await detailsTransaction(token, no);

      setDetailsTransactionData(data ?? null);
      return data;
    } catch (error) {
      console.error("Failed to fetch transactions:", error);
    }
  };

  // Daily Transaction
  const getDailyTransactions = async (params?: Record<string, any>) => {
    try {
      if (!token) {
        throw new Error("Token not found");
      }

      const data = await dailyTransactions(token, params);
      setDailyTransactionsData(data ?? null);

      return data;
    } catch (error) {
      console.error("Failed to fetch daily transactions:", error);
    }
  };

  // Monthly Transaction
  const getMonthlyTransactions = async (params?: Record<string, any>) => {
    try {
      if (!token) {
        throw new Error("Token not found");
      }

      const data = await monthlyTransactions(token, params);
      setMonthlyTransactionsData(data ?? null);

      return data;
    } catch (error) {
      console.error("Failed to fetch daily transactions:", error);
    }
  };

  // yearly
  const getYearlyTransactions = async (params?: Record<string, any>) => {
    try {
      if (!token) {
        throw new Error("Token not found");
      }

      const data = await yearlyTransactions(token, params);
      setYearlyTransactionsData(data ?? null);

      return data;
    } catch (error) {
      console.error("Failed to fetch daily transactions:", error);
    }
  };

  // top customer
  const getTopCustomer = async (params?: Record<string, any>) => {
    try {
      if (!token) {
        throw new Error("Token not found");
      }

      const data = await topCustomer(token, params);
      setTopCustomerData(data?.items ?? []);

      return data;
    } catch (error) {
      console.error("Failed to fetch daily transactions:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  // useEffect(() => {
  //   const accToken = localStorage.getItem("accessToken");
  //   if (accToken) {
  //     fetchAllCustomer();
  //   }
  // }, []);

  const value = {
    navigate,
    user,
    loadingUserData,
    token,
    fetchUserData,
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
