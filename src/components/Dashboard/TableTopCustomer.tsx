import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import type { TopCustomerItems } from "@/lib/interfaces";
import { formatCurrency } from "@/lib/formatValue";

interface TableTopCustomerProps {
  topCustomers: TopCustomerItems[];
}

const TableTopCustomer = ({ topCustomers }: TableTopCustomerProps) => {
  return (
    <div className="overflow-hidden border rounded-lg">
      <Table className="w-full">
        <TableHeader>
          <TableRow className="bg-muted hover:bg-muted">
            <TableHead className="w-12 text-center">#</TableHead>
            <TableHead className="w-16 px-3 text-left">Code</TableHead>
            <TableHead className="w-32 px-3 text-left">Customer Name</TableHead>
            <TableHead className="w-24 px-3 text-left">Company</TableHead>
            <TableHead className="w-32 px-3 py-2 text-left">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {topCustomers.map((customers, index) => (
            <TableRow
              key={customers.customer.code}
              className="hover:bg-muted/20"
            >
              <TableCell className="text-center px-3 py-4">
                {index + 1}
              </TableCell>
              <TableCell>
                <div
                  className="truncate font-mono text-sm"
                  title={customers.customer.code}
                >
                  {customers.customer.code}
                </div>
              </TableCell>
              <TableCell className="text-foreground py-4 text-left truncate block justify-start">
                {customers.customer.name}
              </TableCell>
              <TableCell className="px-3 text-left">
                <span className="text-xs bg-muted px-2 py-1 rounded">
                  {customers.customer.companyType}
                </span>
              </TableCell>
              <TableCell>{formatCurrency(customers.amount)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TableTopCustomer;
