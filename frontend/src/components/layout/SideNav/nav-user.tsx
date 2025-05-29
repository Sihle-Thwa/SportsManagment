import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import {
  BellIcon,
  CreditCardIcon,
  LogOutIcon,
  MoreVerticalIcon,
  UserCircleIcon,
} from "lucide-react";
import { useState } from "react";

export function NavUser() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer transition-colors hover:bg-muted/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <Avatar className="size-8 rounded-lg grayscale">
            <AvatarImage alt="User Name" src="/path/to/default-image.jpg" />
            <AvatarFallback className="rounded-md">UN</AvatarFallback>
          </Avatar>
          <div className="flex flex-col flex-1 min-w-0 text-left text-sm leading-tight">
            <span className="truncate font-medium">User Name</span>
            <span className="truncate text-xs text-muted-foreground">
              user@example.com
            </span>
          </div>
          <MoreVerticalIcon className="ml-auto size-5" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="min-w-56 rounded-md"
        align="start"
        sideOffset={8}
      >
        <DropdownMenuLabel className="p-0 font-normal">
          <div className="flex items-center gap-2 px-1 py-1 text-left text-sm">
            <Avatar className="size-8 rounded-md">
              <AvatarImage alt="User Name" />
              <AvatarFallback className="rounded-md">UN</AvatarFallback>
            </Avatar>
            <div className="flex flex-col flex-1 min-w-0 text-left text-sm leading-tight">
              <span className="truncate font-medium">User Name</span>
              <span className="truncate text-xs text-muted-foreground">
                user@example.com
              </span>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <UserCircleIcon className="mr-2 size-4" />
            Account
          </DropdownMenuItem>
          <DropdownMenuItem>
            <CreditCardIcon className="mr-2 size-4" />
            Billing
          </DropdownMenuItem>
          <DropdownMenuItem>
            <BellIcon className="mr-2 size-4" />
            Notifications
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogOutIcon className="mr-2 size-4" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default NavUser;