import { useIsMobile } from "@/hooks/use-mobile";
import { UseAppContext } from "@/context/UseAppContext";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Drawer, DrawerTrigger } from "../ui/drawer";
import { Button } from "../ui/button";
import CustomerDetail from "./CustomerDetail";
import { RowActions } from "./CustomerActions";
import { Loader2 } from "lucide-react";

const TableCustomer = ({
  paginatedData,
  currentPage,
  itemsPerPage,
  isLoading,
}) => {
  const { resetDetailCustomer, getDetailsDataCustomer } = UseAppContext();

  const isMobile = useIsMobile();

  return (
    <div className="overflow-hidden border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted hover:bg-muted">
            <TableHead className="min-w-[48px] text-center"></TableHead>
            <TableHead className="min-w-[128px]">Code</TableHead>
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
            paginatedData.map((customer, index) => (
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
                        }}
                      >
                        {customer?.name}
                      </Button>
                    </DrawerTrigger>
                    <CustomerDetail />
                  </Drawer>
                </TableCell>
                <TableCell>{customer?.area ?? "-"}</TableCell>
                <TableCell>{customer?.province}</TableCell>
                <TableCell>{customer?.city}</TableCell>
                <TableCell className="max-w-[256px] truncate">
                  {customer?.address}
                </TableCell>
                <TableCell>
                  <RowActions customerCode={customer?.code} />
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default TableCustomer;
