import {
  IconCreditCard,
  IconDotsVertical,
  IconLogout,
  IconNotification,
  IconUserCircle,
} from "@tabler/icons-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { UseAppContext } from "@/context/UseAppContext";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useState } from "react";

export function NavUser() {
  const { isMobile } = useSidebar();
  const { user, signOut, navigate } = UseAppContext();
  const [isLoading, setIsLoading] = useState(false);

  const handleSignOut = async function () {
    setIsLoading(true);
    try {
      const res = await signOut();

      if (res?.responseCode === "20000") {
        toast.success("Logout Berhasil", {
          richColors: true,
          position: "top-right",
        });
      }
    } catch {
      toast.error("Logout Gagal", {
        description: "Unexpected error occured",
        richColors: true,
        position: "top-right",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-primary data-[state=open]:text-foreground hover:bg-primary hover:text-foreground"
            >
              <Avatar className="h-8 w-8 rounded-full">
                <AvatarImage src={user?.profileImage} alt={user?.name} />
                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user?.name}</span>
                <span className="text-white/60 truncate text-xs">
                  {user?.email}
                </span>
              </div>
              <IconDotsVertical className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-full">
                  <AvatarImage src={user?.profileImage} alt={user?.name} />
                  <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{user?.name}</span>
                  <span className="text-muted-foreground truncate text-xs">
                    {user?.email}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem
                className="group focus:bg-primary focus:text-foreground"
                onClick={() => navigate("/profile")}
              >
                <IconUserCircle className="text-muted-foreground group-hover:text-foreground group-focus:text-foreground" />
                Account
              </DropdownMenuItem>
              <DropdownMenuItem className="group focus:bg-primary focus:text-foreground">
                <IconCreditCard className="text-muted-foreground group-hover:text-foreground group-focus:text-foreground" />
                Billing
              </DropdownMenuItem>
              <DropdownMenuItem className="group focus:bg-primary focus:text-foreground">
                <IconNotification className="text-muted-foreground group-hover:text-foreground group-focus:text-foreground" />
                Notifications
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={handleSignOut}
              className="group focus:bg-destructive focus:text-destructive-foreground"
              disabled={isLoading}
            >
              <IconLogout className="text-muted-foreground group-hover:text-foreground group-focus:text-foreground" />
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <Loader2 className="size-4 animate-spin" />
                  <span>Loading...</span>
                </div>
              ) : (
                <p>Logout</p>
              )}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
