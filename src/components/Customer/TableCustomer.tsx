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
              <TableHead className="w-12 text-center">#</TableHead>
              <TableHead className="w-28 px-3 text-left">Code</TableHead>
              <TableHead className="min-w-[200px] px-3 text-left">
                Customer Name
              </TableHead>
              <TableHead className="w-24 px-3 text-center">Area</TableHead>
              <TableHead className="min-w-[120px] px-3 text-left">
                Province
              </TableHead>
              <TableHead className="min-w-[120px] px-3 text-left">
                City
              </TableHead>
              <TableHead className="min-w-[200px] px-3 text-left">
                Address
              </TableHead>
              <TableHead className="w-20 text-center px-3">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {paginatedData.map((customer, index) => (
              <TableRow key={customer.code} className="hover:bg-muted/20">
                <TableCell className="text-center px-3">
                  {(currentPage - 1) * itemsPerPage + (index + 1)}
                </TableCell>

                <TableCell className="px-3 font-mono text-sm">
                  {customer?.code}
                </TableCell>

                <TableCell className="px-3 text-left">
                  <Drawer direction={isMobile ? "bottom" : "right"}>
                    <DrawerTrigger asChild>
                      <Button
                        variant="link"
                        className="text-foreground hover:text-primary px-0 text-left cursor-pointer truncate block justify-start"
                      >
                        {customer?.name}
                      </Button>
                    </DrawerTrigger>
                    <CustomerDetail />
                  </Drawer>
                </TableCell>

                <TableCell className="px-3 text-center">
                  <span className="text-xs bg-muted px-2 py-1 rounded">
                    {customer?.area ?? "-"}
                  </span>
                </TableCell>

                <TableCell className="px-3 text-left">
                  <div
                    className="max-w-[120px] truncate"
                    title={customer?.province}
                  >
                    {customer?.province}
                  </div>
                </TableCell>

                <TableCell className="px-3 text-left">
                  <div
                    className="max-w-[120px] truncate"
                    title={customer?.city}
                  >
                    {customer?.city}
                  </div>
                </TableCell>

                <TableCell className="px-3 text-left">
                  <div
                    className="max-w-[200px] truncate"
                    title={customer?.address}
                  >
                    {customer?.address}
                  </div>
                </TableCell>

                <TableCell className="px-3">
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
