import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../../ui/dropdown-menu";
import { BellIcon, CreditCardIcon, LogOutIcon, MoreVerticalIcon, UserCircleIcon } from "lucide-react";

import { useState } from "react";

export function NavUser() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <DropdownMenu onOpenChange={(open) => setIsOpen(open)}>
      <DropdownMenuTrigger asChild>
        <div className="flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer">
          <Avatar className="h-8 w-8 rounded-lg grayscale">
            <AvatarImage alt="User Name" src="/path/to/default-image.jpg" />
            <AvatarFallback className="rounded-md">UN</AvatarFallback>
          </Avatar>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-medium">User Name</span>
            <span className="truncate text-xs text-muted-foreground">user@example.com</span>
          </div>
          <MoreVerticalIcon className="ml-auto" style={{ fontSize: '1.25rem' }} />
        </div>
      </DropdownMenuTrigger>
      {isOpen && (
        <DropdownMenuContent className="min-w-56 rounded-md" align="start" sideOffset={8}>
          <DropdownMenuLabel className="p-0 font-normal">
            <div className="flex items-center gap-2 px-1 py-1 text-left text-sm">
              <Avatar className="h-8 w-8 rounded-md">
                <AvatarImage alt="User Name" />
                <AvatarFallback className="rounded-md">UN</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">User Name</span>
                <span className="truncate text-xs text-muted-foreground">user@example.com</span>
              </div>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <UserCircleIcon />
              Account
            </DropdownMenuItem>
            <DropdownMenuItem>
              <CreditCardIcon />
              Billing
            </DropdownMenuItem>
            <DropdownMenuItem>
              <BellIcon />
              Notifications
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <LogOutIcon />
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      )}
    </DropdownMenu>
  );
}
;
export default NavUser;