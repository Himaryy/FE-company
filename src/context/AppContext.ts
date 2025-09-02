/* eslint-disable @typescript-eslint/no-explicit-any */
import type {
  ChangePasswordResponse,
  CustomerAddResponse,
  CustomerByCode,
  CustomerEditResponse,
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
  LogoutResponse,
  MonthlyTransactionProps,
  RegisterResponse,
  SignInResponse,
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
  signIn: ({ phone, password }: FormDataLogin) => Promise<SignInResponse>;
  signOut: () => Promise<LogoutResponse>;
  register: (params: RegisterFormValues) => Promise<RegisterResponse>;
  user: User | null;
  loadingUserData: boolean;
  // fetchUserData: () => Promise<User | null>;
  changePassword: (
    params: ChangePasswordFormValues
  ) => Promise<ChangePasswordResponse>;
  navigate: (path: string) => void;
  token: string | null;

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

  addDataCustomer: (values: CustomerFormValues) => Promise<CustomerAddResponse>;
  editDataCustomer: (
    values: CustomerFormValues,
    code: string
  ) => Promise<CustomerEditResponse>;
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
