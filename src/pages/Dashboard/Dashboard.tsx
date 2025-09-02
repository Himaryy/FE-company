import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { SectionCards } from "@/components/Dashboard/section-cards";
import { UseAppContext } from "@/context/UseAppContext";
import { useEffect, useState } from "react";
import {} from "@/lib/interfaces";
import TableTopCustomer from "@/components/Dashboard/TableTopCustomer";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Dashboard = () => {
  const {
    token,
    dailyTransactionsData,
    getDailyTransactions,
    monthlyTransactionsData,
    getMonthlyTransactions,
    yearlyTransactionsData,
    getYearlyTransactions,
    topCustomerData,
    getTopCustomer,
    salesList,
    getSalesList,
  } = UseAppContext();

  const [isLoading, setIsLoading] = useState(false);

  // Daily transaction
  useEffect(() => {
    (async () => {
      if (!token) return;
      await getDailyTransactions({
        startDate: "2024-01-09",
        endDate: "2024-12-01",
      });
    })();
  }, [token]);

  // Monthly transaction
  useEffect(() => {
    (async () => {
      if (!token) return;

      await getMonthlyTransactions({
        startMonth: "2025-01",
        endMonth: "2025-12",
      });
    })();
  }, [token]);

  // yearly
  useEffect(() => {
    (async () => {
      if (!token) return;

      await getYearlyTransactions({
        year: "2025",
      });
    })();
  }, [token]);

  // sales
  useEffect(() => {
    (async () => {
      if (!token) return;

      await getSalesList();
    })();
  }, [token]);

  // top customer
  useEffect(() => {
    (async () => {
      if (!token) return;

      await getTopCustomer({
        startDate: "2024-01-09",
        endDate: "2024-12-01",
        limit: 5,
      });
    })();
  }, [token]);

  // Loading
  useEffect(() => {
    if (
      !dailyTransactionsData ||
      !monthlyTransactionsData ||
      !yearlyTransactionsData ||
      !salesList ||
      !topCustomerData
    ) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [
    dailyTransactionsData,
    monthlyTransactionsData,
    yearlyTransactionsData,
    salesList,
    topCustomerData,
  ]);

  return (
    <>
      <h1 className="text-3xl font-bold tracking-tight">Summary</h1>
      <p className="text-muted-foreground">
        Overview of daily, monthly, and yearly transactions to help you track
        performance at a glance.
      </p>
      {isLoading ? (
        <div className="flex items-center justify-center h-[60vh] gap-4">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary"></div>
          Loading ...
        </div>
      ) : (
        <>
          <SectionCards
            daily={dailyTransactionsData}
            sales={salesList}
            yearly={yearlyTransactionsData}
          />

          <div className="px-4 lg:px-6">
            <ChartAreaInteractive monthly={monthlyTransactionsData} />
          </div>

          <div className="px-4 lg:px-6">
            <div
              className={cn(
                buttonVariants({
                  variant: "outline",
                  size: "sm",
                }),
                "cursor-default mb-6 bg-accent hover:bg-accent hover:text-foreground dark:bg-input/30 dark:hover:bg-input/30 dark:hover:text-foreground"
              )}
            >
              <span>Top Customers</span>
            </div>
            <TableTopCustomer topCustomers={topCustomerData} />
          </div>
        </>
      )}
    </>
  );
};

export default Dashboard;
