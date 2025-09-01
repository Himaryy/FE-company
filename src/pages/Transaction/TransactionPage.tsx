import PaginationBar from "@/components/PaginationBar";
import TableTransaction from "@/components/Transaction/TableTransaction";
import { TransactionCard } from "@/components/Transaction/TransactionCard";
import { buttonVariants } from "@/components/ui/button";
import { UseAppContext } from "@/context/UseAppContext";
import type { Transaction } from "@/lib/interfaces";
import { cn } from "@/lib/utils";
import { PlusIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const TransactionPage = () => {
  const {
    transactions,
    getTransactionData,
    totalTransactions,
    dailyTransactionsData,
    yearlyTransactionsData,
  } = UseAppContext();

  const [transactionsData, setTransactionsData] = useState<Transaction[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const itemsPerPage = 10;

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePagination = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const data = await getTransactionData({
        page: currentPage,
        perPage: itemsPerPage,
        sortBy: "created_at",
        sortDirection: "desc",
        startDate: "2025-01-01",
        endDate: "2026-12-30",
      });
      // Fix ntr

      if (data) {
        setTotalItems(data.total ?? 0);

        if (currentPage === 1) {
          setTransactionsData(data.items);
        } else {
          setTransactionsData((prev) => [...prev, ...data.items]);
        }
      }

      setIsLoading(false);
    })();
  }, [currentPage, itemsPerPage]);

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Transactions</h1>
        <Link
          to="#"
          className={cn(
            buttonVariants({
              size: "sm",
            }),
            "flex items-center gap-2 shadow-sm"
          )}
        >
          <PlusIcon className="size-4" />
          New Transaction
        </Link>
      </div>

      <p className="text-muted-foreground">
        Monitor sales, and payment history in real time.
      </p>

      <TransactionCard
        total={totalTransactions}
        daily={dailyTransactionsData}
        yearly={yearlyTransactionsData}
      />

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
          <span>Transacations List</span>
        </div>
        <TableTransaction
          isLoading={isLoading}
          transactions={transactions}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
        />
      </div>
      <PaginationBar
        page={currentPage}
        total={totalPages}
        onPageChange={handlePagination}
      />
    </>
  );
};

export default TransactionPage;
