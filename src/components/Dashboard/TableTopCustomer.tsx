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
      <Table>
        <TableHeader>
          <TableRow className="bg-muted hover:bg-muted">
            <TableHead className=""></TableHead>
            <TableHead>Code</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Company</TableHead>
            <TableHead>Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {topCustomers.map((customers, index) => (
            <TableRow key={customers.customer.code}>
              <TableCell className="text-center">{index + 1}</TableCell>
              <TableCell>{customers.customer.code}</TableCell>
              <TableCell>{customers.customer.name}</TableCell>
              <TableCell>{customers.customer.companyType}</TableCell>
              <TableCell>{formatCurrency(customers.amount)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TableTopCustomer;
