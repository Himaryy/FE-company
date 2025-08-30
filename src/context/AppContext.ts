import type { CustomerFormValues } from "@/lib/zodSchemas";
import { createContext } from "react";

interface FormDataLogin {
  phone: string;
  password: string;
}

interface User {
  accessToken: string;
  code: string;
  email: string;
  name: string;
  phone: string;
  profileImage: string;
  roleCode: string;
  roleName: string;
}
interface DetailsCustomer {
  code: string;
  name: string;
  type: string;
  companyType: string;
  identityNo: string;
  npwp: string;
  email: string;
  phone: string;
  mobilePhone: string;
  area: string;
  province: {
    code: string;
    name: string;
  };
  city: {
    code: string;
    name: string;
  };
  address: string;
  group: {
    code: string;
    name: string;
  };
  status: string;
  target: string;
  achievement: string;
  percentage: string;
}
interface Customer {
  code: string;
  name: string;
  type: string;
  companyType: string;
  areaCode: string;
  province: {
    code: string;
    name: string;
  };
  city: {
    code: string;
    name: string;
  };
  subdistrict: string;
  address: string;
}

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
}

export const AppContext = createContext<AppContextType | null>(null);
