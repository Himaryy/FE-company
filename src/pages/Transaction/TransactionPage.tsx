import { ChartAreaInteractive } from "@/components/chart-area-interactive";
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
  const { transactions, getTransactionData } = UseAppContext();

  const [transactionsData, setTransactionsData] = useState<Transaction[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  const itemsPerPage = 10;

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePagination = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  useEffect(() => {
    (async () => {
      const data = await getTransactionData({
        page: currentPage,
        perPage: itemsPerPage,
        sortBy: "created_at",
        sortDirection: "desc",
        startDate: "2023-01-01",
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

      <TransactionCard transactions={transactionsData} />

      <div className="px-4 lg:px-6">
        <ChartAreaInteractive />
      </div>

      <div className="px-4 lg:px-6">
        <TableTransaction
          transactions={transactions}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
        />

        <PaginationBar
          page={currentPage}
          total={totalPages}
          onPageChange={handlePagination}
        />
      </div>
    </>
  );
};

export default TransactionPage;
