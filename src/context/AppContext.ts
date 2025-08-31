/* eslint-disable @typescript-eslint/no-explicit-any */
import type {
  Customer,
  DailyTransactionsProps,
  DetailsCustomer,
  DetailsTransactionProps,
  FormDataLogin,
  MonthlyTransactionProps,
  TopCustomerItems,
  TopCustomerProps,
  Transaction,
  TransactionResponse,
  User,
  YearlyTransactionProps,
} from "@/lib/interfaces";
import type { CustomerFormValues } from "@/lib/zodSchemas";
import { createContext } from "react";

export interface AppContextType {
  signIn: ({ phone, password }: FormDataLogin) => Promise<void>;
  signOut: () => Promise<void>;
  user: User | null;
  customers: Customer[];
  navigate: (path: string) => void;
  fetchCustomerByCode: (code: string) => Promise<void>;
  customerByCode: Customer | null;
  addDataCustomer: (values: CustomerFormValues) => Promise<void>;
  editDataCustomer: (values: CustomerFormValues, code: string) => Promise<void>;
  getDetailsDataCustomer: (code: string) => Promise<void>;
  detailCustomer: DetailsCustomer | null;
  resetDetailCustomer: () => void;
  transactions: Transaction[];
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
  topCustomerData: TopCustomerItems[];
  getTopCustomer: (
    params?: Record<string, any>
  ) => Promise<TopCustomerProps | undefined>;
}

export const AppContext = createContext<AppContextType | null>(null);
