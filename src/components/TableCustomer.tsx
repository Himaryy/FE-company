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
import CustomerDetail from "./CustomerDetail";
import { Drawer, DrawerTrigger } from "./ui/drawer";
import { Button } from "./ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { UseAppContext } from "@/context/UseAppContext";

const TableCustomer = ({ paginatedData, currentPage, itemsPerPage }) => {
  const { resetDetailCustomer, getDetailsDataCustomer } = UseAppContext();

  const [isOpen, setIsOpen] = useState(false);

  const isMobile = useIsMobile();

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
                <Drawer direction={isMobile ? "bottom" : "right"}>
                  <DrawerTrigger asChild>
                    <Button
                      variant="link"
                      className="text-foreground w-fit px-0 text-left cursor-pointer"
                      onClick={async () => {
                        resetDetailCustomer();
                        await getDetailsDataCustomer(customer?.code);
                        setIsOpen(true);
                      }}
                    >
                      {customer?.name}
                    </Button>
                  </DrawerTrigger>
                  <CustomerDetail code={customer?.code} />
                </Drawer>
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
                <RowActions customerCode={customer?.code} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TableCustomer;
