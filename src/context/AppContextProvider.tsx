import React, { useEffect } from "react";
import { AppContext } from "./AppContext";
import { useState, type ReactNode } from "react";
import { getUser, SignIn, signOutUser } from "@/lib/authService";
import { useNavigate } from "react-router-dom";
import {
  addCustomer,
  editCustomer,
  getAllCustomer,
  getCustomer,
  getDetailsCustomer,
} from "@/lib/customerService";
import type { CustomerFormValues } from "@/lib/zodSchemas";

interface Props {
  children: ReactNode;
}

interface FormDataLogin {
  phone: string;
  password: string;
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

export const AppContextProvider = ({ children }: Props) => {
  const [user, setUser] = useState(null);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [detailCustomer, setDetailCustomer] = useState<Customer | null>(null);
  const [customerByCode, setCustomerByCode] = useState<Customer | null>(null);

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
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
