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

interface Customer {
  code: string;
  name: string;
  type: string;
  companyType: string;
  area: string;
  province: string;
  city: string;
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

export interface AppContextType {
  signIn: ({ phone, password }: FormDataLogin) => Promise<void>;
  signOut: () => Promise<void>;
  user: User | null;
  customers: Customer[];
  navigate: (path: string) => void;
}

export const AppContext = createContext<AppContextType | null>(null);
