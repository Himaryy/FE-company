import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { SectionCards } from "@/components/Dashboard/section-cards";
import { UseAppContext } from "@/context/UseAppContext";
import { useEffect, useState } from "react";
import {} from "@/lib/interfaces";
import TableTopCustomer from "@/components/Dashboard/TableTopCustomer";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

const Dashboard = () => {
  const {
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
      await getDailyTransactions({
        startDate: "2024-01-09",
        endDate: "2024-12-01",
      });
    })();
  }, []);

  // Monthly transaction
  useEffect(() => {
    (async () => {
      await getMonthlyTransactions({
        startMonth: "2025-01",
        endMonth: "2025-12",
      });
    })();
  }, []);

  // yearly
  useEffect(() => {
    (async () => {
      await getYearlyTransactions({
        year: "2025",
      });
    })();
  }, []);

  // sales
  useEffect(() => {
    (async () => {
      await getSalesList();
    })();
  }, []);

  // top customer
  useEffect(() => {
    (async () => {
      await getTopCustomer({
        startDate: "2024-01-09",
        endDate: "2024-12-01",
        limit: 5,
      });
    })();
  }, []);

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
        <div className="flex items-center justify-center h-[60vh] gap-2">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <span className="text-xl text-muted-foreground">Loading...</span>
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
