import React, { useEffect } from "react";
import { AppContext } from "./AppContext";
import { useState, type ReactNode } from "react";
import { getUser, SignIn, signOutUser } from "@/lib/authService";
import { useNavigate } from "react-router-dom";
import { getAllCustomer } from "@/lib/customerService";

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

export const AppContextProvider = ({ children }: Props) => {
  const [user, setUser] = useState(null);
  const [customers, setCustomers] = useState<Customer[]>([]);

  const [token, setToken] = useState<string | null>(
    localStorage.getItem("accessToken")
  );

  const navigate = useNavigate();

  // Login
  const signIn = async ({ phone, password }: FormDataLogin) => {
    try {
      const data = await SignIn({ phone, password });

      localStorage.setItem("accessToken", data.accessToken);

      await fetchUserData();
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  // Logout
  const signOut = async () => {
    try {
      const accToken = localStorage.getItem("accessToken");

      if (!accToken) throw new Error("Token not found");

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

      if (!accToken) throw new Error("Token not found");

      const data = await getUser(accToken);
      setUser(data);
      setToken(accToken);

      localStorage.setItem("user", JSON.stringify(data));
      // navigate("/");
    } catch (error) {
      console.error("Failed to get user:", error);
    }
  };

  // Get All Customer
  const fetchAllCustomer = async () => {
    try {
      const accToken = localStorage.getItem("accessToken");

      if (!accToken) throw new Error("Token not found");

      const data = await getAllCustomer(accToken);

      setCustomers(data);
    } catch (error) {
      console.error("Failed to get all customer:", error);
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
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
