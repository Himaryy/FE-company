import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { RowActions } from "./CustomerActions";

const TableCustomer = ({ paginatedData, currentPage, itemsPerPage }) => {
  return (
    <div className="overflow-hidden border rounded-2xl">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted hover:bg-muted">
            <TableHead className="min-w-[48px] text-center"></TableHead>
            <TableHead className="min-w-[128px">Code</TableHead>
            <TableHead>Name</TableHead>
            {/* <TableHead>Company Type</TableHead>
                  <TableHead>Type</TableHead> */}
            <TableHead>Area Code</TableHead>
            <TableHead>Province</TableHead>
            <TableHead>City</TableHead>
            {/* <TableHead>Subdistrict</TableHead> */}
            <TableHead>Address</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {paginatedData.map((customer, index) => (
            <TableRow key={index + 1}>
              <TableCell className="text-center">
                {(currentPage - 1) * itemsPerPage + (index + 1)}
              </TableCell>
              <TableCell>{customer?.code}</TableCell>
              <TableCell className="max-w-[256px] truncate">
                {customer?.name}
              </TableCell>
              {/* <TableCell>{customer?.companyType}</TableCell>
                    <TableCell>{customer?.type}</TableCell> */}
              <TableCell className="">{customer?.areaCode ?? "-"}</TableCell>
              <TableCell>{customer?.province?.name}</TableCell>
              <TableCell>{customer?.city?.name}</TableCell>
              <TableCell className="max-w-[256px] truncate">
                {customer?.address}
              </TableCell>
              <TableCell>
                <RowActions />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TableCustomer;
