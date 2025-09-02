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
      {isLoading ? (
        <div className="flex items-center gap-4 justify-center py-10">
          <div className="animate-spin rounded-full size-10 border-b-2 border-primary"></div>
          Loading...
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow className="bg-muted hover:bg-muted">
              <TableHead className="min-w-[48px] text-center"></TableHead>
              <TableHead className="min-w-[128px]">Code</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Area</TableHead>
              <TableHead>Province</TableHead>
              <TableHead>City</TableHead>
              <TableHead>Address</TableHead>
              <TableHead>Actions</TableHead>
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
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default TableCustomer;
