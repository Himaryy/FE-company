/* eslint-disable @typescript-eslint/no-explicit-any */
import type {
  CustomerByCode,
  CustomerItems,
  CustomerParams,
  CustomerResponse,
  DailyTransactionsProps,
  DetailsCustomer,
  DetailsTransactionProps,
  FormDataLogin,
  ListCitiesItems,
  ListProvinceItems,
  ListProvinceResponse,
  ListSalesItems,
  ListSalesResponse,
  MonthlyTransactionProps,
  TopCustomerItems,
  TopCustomerProps,
  Transaction,
  TransactionResponse,
  User,
  YearlyTransactionProps,
} from "@/lib/interfaces";
import type {
  ChangePasswordFormValues,
  CustomerFormValues,
  RegisterFormValues,
} from "@/lib/zodSchemas";
import { createContext } from "react";

export interface AppContextType {
  signIn: ({ phone, password }: FormDataLogin) => Promise<void>;
  signOut: () => Promise<void>;
  register: (params: RegisterFormValues) => Promise<void>;
  user: User | null;
  changePassword: (params: ChangePasswordFormValues) => Promise<void>;
  navigate: (path: string) => void;

  // province
  provinceList: ListProvinceItems[];
  getProvinceList: () => Promise<ListProvinceResponse | undefined>;

  // city
  cityList: ListCitiesItems[];
  getCityList: () => Promise<ListProvinceResponse | undefined>;

  // sales
  salesList: ListSalesItems[];
  getSalesList: () => Promise<ListSalesResponse | undefined>;

  // Customer
  customers: CustomerItems[];
  fetchAllCustomer: (
    params?: CustomerParams
  ) => Promise<CustomerResponse | undefined>;

  fetchCustomerByCode: (code: string) => Promise<CustomerByCode | undefined>;
  customerByCode: CustomerByCode | undefined;

  addDataCustomer: (values: CustomerFormValues) => Promise<void>;
  editDataCustomer: (values: CustomerFormValues, code: string) => Promise<void>;
  getDetailsDataCustomer: (code: string) => Promise<void>;
  detailCustomer: DetailsCustomer | null;
  resetDetailCustomer: () => void;

  // Transactions
  transactions: Transaction[];
  totalTransactions: number;
  getTransactionData: (
    params?: Record<string, any>
  ) => Promise<TransactionResponse | undefined>;
  detailsTransactionData: DetailsTransactionProps | null;
  getDetailsTransaction: (
    no: string
  ) => Promise<DetailsTransactionProps | undefined>;

  dailyTransactionsData: DailyTransactionsProps | null;
  getDailyTransactions: (
    params?: Record<string, any>
  ) => Promise<DailyTransactionsProps | undefined>;
  monthlyTransactionsData: MonthlyTransactionProps | null;
  getMonthlyTransactions: (
    params?: Record<string, any>
  ) => Promise<MonthlyTransactionProps | undefined>;
  yearlyTransactionsData: YearlyTransactionProps | null;
  getYearlyTransactions: (
    params?: Record<string, any>
  ) => Promise<YearlyTransactionProps | undefined>;

  // Top Customer
  topCustomerData: TopCustomerItems[];
  getTopCustomer: (
    params?: Record<string, any>
  ) => Promise<TopCustomerProps | undefined>;
}

export const AppContext = createContext<AppContextType | null>(null);
