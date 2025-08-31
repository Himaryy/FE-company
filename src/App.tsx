import { Route, Routes } from "react-router-dom";
import AuthLayout from "./pages/Auth/AuthLayout";
import SignUpForm from "./components/AuthForm/SignUpForm";
import SignInForm from "./components/AuthForm/SignInForm";
import { ThemeProvider } from "./components/theme-provider";
import Layout from "./pages/Dashboard/Layout";
import Dashboard from "./pages/Dashboard/Dashboard";
import CustomerPage from "./pages/Customer/CustomerPage";
import AddCustomer from "./pages/Customer/ActionPage/AddCustomer";
import EditCustomer from "./pages/Customer/ActionPage/EditCustomer";
import TransactionPage from "./pages/Transaction/TransactionPage";
import DetailsTransactionPage from "./pages/Transaction/DetailsTransactionPage";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="min-h-screen">
        <Routes>
          <Route element={<AuthLayout />}>
            <Route path="/sign-up" element={<SignUpForm />} />
            <Route path="/sign-in" element={<SignInForm />} />
          </Route>

          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Dashboard />} />

            <Route path="/customer" element={<CustomerPage />} />
            <Route path="/customer/add-customer" element={<AddCustomer />} />
            <Route
              path="/customer/edit-customer/:code"
              element={<EditCustomer />}
            />

            <Route path="/transaction" element={<TransactionPage />} />
            <Route
              path="/transaction/details-transaction/:no"
              element={<DetailsTransactionPage />}
            />
          </Route>
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
