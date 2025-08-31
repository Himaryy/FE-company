import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { SectionCards } from "@/components/Dashboard/section-cards";
import { UseAppContext } from "@/context/UseAppContext";
import { useEffect, useState } from "react";
import {
  type MonthlyTransactionProps,
  type DailyTransactionsProps,
  type YearlyTransactionProps,
  type TopCustomerItems,
} from "@/lib/interfaces";
import TableTopCustomer from "@/components/Dashboard/TableTopCustomer";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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
  } = UseAppContext();
  const [dailyData, setDailyData] = useState<DailyTransactionsProps | null>(
    null
  );
  const [monthlyData, setMonthlyData] =
    useState<MonthlyTransactionProps | null>(null);
  const [yearlyData, setYearlyData] = useState<YearlyTransactionProps | null>(
    null
  );
  const [topCustomer, setTopCustomer] = useState<TopCustomerItems[]>([]);

  // Daily transaction
  useEffect(() => {
    (async () => {
      const data = await getDailyTransactions({
        startDate: "2024-01-09",
        endDate: "2024-12-01",
      });

      if (data) {
        setDailyData(data);
      }
    })();
  }, []);

  // Monthly transaction
  useEffect(() => {
    (async () => {
      const data = await getMonthlyTransactions({
        startMonth: "2025-01",
        endMonth: "2025-12",
      });

      if (data) {
        setMonthlyData(data);
      }
    })();
  }, []);

  // yearly
  useEffect(() => {
    (async () => {
      const data = await getYearlyTransactions({
        year: "2025",
      });

      if (data) {
        setYearlyData(data);
      }
    })();
  }, []);

  // top customer
  useEffect(() => {
    (async () => {
      const data = await getTopCustomer({
        startDate: "2024-01-09",
        endDate: "2024-12-01",
        limit: 5,
      });

      if (data?.items) {
        setTopCustomer(data.items);
      }
    })();
  }, []);

  return (
    <>
      <h1 className="text-3xl font-bold tracking-tight">Summary</h1>
      <p className="text-muted-foreground">
        Overview of daily, monthly, and yearly transactions to help you track
        performance at a glance.
      </p>
      <SectionCards
        daily={dailyTransactionsData}
        monthly={monthlyTransactionsData}
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
  );
};

export default Dashboard;
