import { useIsMobile } from "@/hooks/use-mobile";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { buttonVariants } from "../ui/button";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { formatCurrency } from "@/lib/formatValue";
import { useState } from "react";
import { Loader2 } from "lucide-react";

const TableTransaction = ({
  transactions,
  currentPage,
  itemsPerPage,
  isLoading,
}) => {
  const isMobile = useIsMobile();
  return (
    <div className="overflow-hidden border rounded-2xl">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted hover:bg-muted">
            <TableHead className="min-w-[48px] text-center"></TableHead>
            <TableHead className="min-w-[128px]">Invoice</TableHead>
            <TableHead>Customer Name</TableHead>
            <TableHead>Sales Name</TableHead>
            <TableHead>Amount Due</TableHead>
            <TableHead>Amount Total</TableHead>
            <TableHead>Date Order</TableHead>
            <TableHead>Paid At</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={8}>
                <div className="flex items-center justify-center h-[20vh]">
                  <Loader2 className="w-8 h-8 animate-spin text-primary mr-2" />
                  <span className="text-xl text-muted-foreground">
                    Loading...
                  </span>
                </div>
              </TableCell>
            </TableRow>
          ) : (
            transactions.map((trx, index) => (
              <TableRow key={index + 1}>
                <TableCell className="text-center">
                  {(currentPage - 1) * itemsPerPage + (index + 1)}
                </TableCell>
                <TableCell>{trx?.referenceNo}</TableCell>
                <TableCell>
                  <Link
                    className={cn(
                      buttonVariants({ variant: "link" }),
                      "text-foreground w-fit px-0 text-left cursor-pointer"
                    )}
                    to={`/transaction/details-transaction/${trx?.referenceNo}`}
                  >
                    {trx?.customer?.name}
                  </Link>
                </TableCell>
                <TableCell>{trx?.sales}</TableCell>
                <TableCell>{formatCurrency(trx?.amountDue)}</TableCell>
                <TableCell>{formatCurrency(trx?.amountDue)}</TableCell>
                <TableCell>{trx?.dateOrder}</TableCell>
                <TableCell>{trx?.paidAt}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default TableTransaction;
