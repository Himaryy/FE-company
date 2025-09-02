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
import { EyeIcon } from "lucide-react";

const TableTransaction = ({
  transactions,
  currentPage,
  itemsPerPage,
  isLoading,
}) => {
  const isMobile = useIsMobile();
  return (
    <div className="overflow-hidden border rounded-2xl">
      {isLoading ? (
        <div className="flex items-center gap-4 justify-center py-10">
          <div className="animate-spin rounded-full size-10 border-b-2 border-primary"></div>
          Loading...
        </div>
      ) : (
        <Table className="w-full">
          <TableHeader>
            <TableRow className="bg-muted hover:bg-muted">
              <TableHead className="w-12 text-center px-3 py-2">#</TableHead>
              <TableHead className="w-28 px-3 py-2 text-left">
                Invoice
              </TableHead>
              <TableHead className="w-60 px-3 py-2 text-left">
                Customer Name
              </TableHead>
              {/* <TableHead className="w-60 px-3 py-2 text-left">
                Sales Name
              </TableHead> */}
              {/* <TableHead className="w-32 px-3 py-2 text-left">
                Amount Due
              </TableHead> */}
              <TableHead className="w-32 px-3 py-2 text-left">
                Amount Total
              </TableHead>
              {/* <TableHead className="w-32 px-3 py-2 text-left">
                Date Order
              </TableHead> */}
              <TableHead className="w-32 px-3 py-2 text-left">
                Paid At
              </TableHead>
              <TableHead className="w-16 text-center px-3 py-2">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {transactions.map((trx, index) => (
              <TableRow key={trx.referenceNo} className="hover:bg-muted/20">
                <TableCell className="text-center px-3">
                  {(currentPage - 1) * itemsPerPage + (index + 1)}
                </TableCell>

                <TableCell className="px-3">
                  <div
                    className="truncate font-mono text-sm"
                    title={trx?.referenceNo}
                  >
                    {trx?.referenceNo}
                  </div>
                </TableCell>

                <TableCell className="px-3">
                  <Link
                    className={cn(
                      buttonVariants({ variant: "link" }),
                      "text-foreground hover:text-primary px-0 text-left cursor-pointer truncate block justify-start"
                    )}
                    to={`/transaction/details-transaction/${trx?.referenceNo}`}
                    title={trx?.customer?.name}
                  >
                    {trx?.customer?.name}
                  </Link>
                </TableCell>

                {/* <TableCell className="px-3 py-3">
                  <div className="truncate" title={trx?.sales}>
                    {trx?.sales}
                  </div>
                </TableCell> */}

                {/* <TableCell className="px-3 py-3">
                  <div
                    className="truncate text-right font-medium"
                    title={formatCurrency(trx?.amountDue)}
                  >
                    {formatCurrency(trx?.amountDue)}
                  </div>
                </TableCell> */}

                <TableCell className="px-3">
                  <div
                    className="truncate text-left font-medium"
                    title={formatCurrency(trx?.amountTotal)}
                  >
                    {formatCurrency(trx?.amountTotal)}
                  </div>
                </TableCell>

                {/* <TableCell className="px-3 py-3">
                  <div className="truncate" title={trx?.dateOrder}>
                    {trx?.dateOrder}
                  </div>
                </TableCell> */}

                <TableCell className="px-3">
                  <div className="truncate" title={trx?.paidAt}>
                    {trx?.paidAt}
                  </div>
                </TableCell>

                <TableCell className="text-center px-3">
                  <Link
                    to={`/transaction/details-transaction/${trx?.referenceNo}`}
                    className={cn(
                      buttonVariants({ variant: "outline", size: "icon" }),
                      "hover:!bg-primary hover:!text-primary-foreground"
                    )}
                  >
                    <EyeIcon size={16} />
                    <span className="sr-only">Details</span>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default TableTransaction;
