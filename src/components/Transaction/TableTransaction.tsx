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
        <Table className="table-fixed w-full">
          <TableHeader>
            <TableRow className="bg-muted hover:bg-muted">
              <TableHead className="w-12 text-center"></TableHead>
              <TableHead className="w-44">Invoice</TableHead>
              <TableHead className="w-60">Customer Name</TableHead>
              <TableHead className="w-60">Sales Name</TableHead>
              <TableHead className="w-35 text-left">Amount Due</TableHead>
              <TableHead className="w-35 text-left">Amount Total</TableHead>
              <TableHead className="w-32">Date Order</TableHead>
              <TableHead className="w-32">Paid At</TableHead>
              <TableHead className="w-16 text-center">Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {transactions.map((trx, index) => (
              <TableRow key={index + 1} className="align-top">
                <TableCell className="text-center">
                  {(currentPage - 1) * itemsPerPage + (index + 1)}
                </TableCell>

                <TableCell>
                  <div className="truncate" title={trx?.referenceNo}>
                    {trx?.referenceNo}
                  </div>
                </TableCell>

                <TableCell>
                  <Link
                    className={cn(
                      buttonVariants({ variant: "link" }),
                      "text-foreground px-0 text-left cursor-pointer truncate block"
                    )}
                    to={`/transaction/details-transaction/${trx?.referenceNo}`}
                    title={trx?.customer?.name}
                  >
                    {trx?.customer?.name}
                  </Link>
                </TableCell>

                <TableCell>
                  <div className="truncate" title={trx?.sales}>
                    {trx?.sales}
                  </div>
                </TableCell>

                <TableCell className="text-left">
                  <div
                    className="truncate"
                    title={formatCurrency(trx?.amountDue)}
                  >
                    {formatCurrency(trx?.amountDue)}
                  </div>
                </TableCell>

                <TableCell className="text-left">
                  <div
                    className="truncate"
                    title={formatCurrency(trx?.amountTotal)}
                  >
                    {formatCurrency(trx?.amountTotal)}
                  </div>
                </TableCell>

                <TableCell>
                  <div className="truncate" title={trx?.dateOrder}>
                    {trx?.dateOrder}
                  </div>
                </TableCell>

                <TableCell>
                  <div className="truncate" title={trx?.paidAt}>
                    {trx?.paidAt}
                  </div>
                </TableCell>

                <TableCell className="text-center">
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
