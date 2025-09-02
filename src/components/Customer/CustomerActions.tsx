import { IconDotsVertical } from "@tabler/icons-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { UseAppContext } from "@/context/UseAppContext";
import { Drawer } from "../ui/drawer";
import { useIsMobile } from "@/hooks/use-mobile";
import CustomerDetail from "./CustomerDetail";
import { useState } from "react";

// Dropdown edit delete
export const RowActions = ({ customerCode }: { customerCode: string }) => {
  const { navigate, resetDetailCustomer, getDetailsDataCustomer } =
    UseAppContext();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const isMobile = useIsMobile();

  const handleEdit = () => {
    navigate(`/customer/edit-customer/${customerCode}`);
  };

  const openDrawer = async () => {
    setIsDrawerOpen(true);
    setIsDropdownOpen(false);
    resetDetailCustomer();
    await getDetailsDataCustomer(customerCode);
  };

  return (
    <>
      <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="data-[state=open]:bg-primary data-[state=open]:text-primary-foreground text-muted-foreground flex size-8 hover:!bg-primary "
            size="icon"
          >
            <IconDotsVertical />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-32">
          <DropdownMenuItem
            onSelect={(e) => {
              e.preventDefault();
              openDrawer();
            }}
            className="hover:underline hover:!bg-transparent"
          >
            Details
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={handleEdit}
            className="hover:underline hover:!bg-transparent"
          >
            Edit
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="bg-red-600 text-primary-foreground hover:!bg-red-700">
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Drawer
        direction={isMobile ? "bottom" : "right"}
        open={isDrawerOpen}
        onOpenChange={setIsDrawerOpen}
      >
        <CustomerDetail />
      </Drawer>
    </>
  );
};
