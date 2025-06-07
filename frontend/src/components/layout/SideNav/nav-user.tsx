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
import { cn } from "../../../lib/utils";

interface NavUserProps {
  collapsed?: boolean;
}

export function NavUser({ collapsed = false }: NavUserProps) {
  const [isOpen, setIsOpen] = useState(false);

  const userInfo = {
    name: "User Name",
    email: "user@example.com",
    initials: "UN",
    avatar: "/path/to/default-image.jpg"
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className={cn(
            "btn-base btn-tertiary nav-user-trigger",
            collapsed && "nav-user-trigger-collapsed"
          )}
          aria-label={collapsed ? `User menu for ${userInfo.name}` : undefined}
        >
          <Avatar className="nav-user-avatar">
            <AvatarImage
              alt={`${userInfo.name}'s profile picture`}
              src={userInfo.avatar}
            />
            <AvatarFallback className="nav-user-avatar-fallback">
              {userInfo.initials}
            </AvatarFallback>
          </Avatar>

          {!collapsed && (
            <>
              <div className="nav-user-info">
                <span className="nav-user-name">{userInfo.name}</span>
                <span className="nav-user-email">{userInfo.email}</span>
              </div>
              <MoreVerticalIcon
                className="nav-user-menu-icon"
                aria-hidden="true"
              />
            </>
          )}
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="nav-user-dropdown"
        align={collapsed ? "center" : "start"}
        sideOffset={8}
      >
        <DropdownMenuLabel className="nav-user-dropdown-header">
          <div className="nav-user-dropdown-info">
            <Avatar className="nav-user-dropdown-avatar">
              <AvatarImage
                alt={`${userInfo.name}'s profile picture`}
                src={userInfo.avatar}
              />
              <AvatarFallback className="nav-user-dropdown-avatar-fallback">
                {userInfo.initials}
              </AvatarFallback>
            </Avatar>
            <div className="nav-user-dropdown-text">
              <span className="nav-user-dropdown-name">{userInfo.name}</span>
              <span className="nav-user-dropdown-email">{userInfo.email}</span>
            </div>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem className="nav-user-dropdown-item">
            <UserCircleIcon className="nav-user-dropdown-item-icon" aria-hidden="true" />
            Account
          </DropdownMenuItem>
          <DropdownMenuItem className="nav-user-dropdown-item">
            <CreditCardIcon className="nav-user-dropdown-item-icon" aria-hidden="true" />
            Billing
          </DropdownMenuItem>
          <DropdownMenuItem className="nav-user-dropdown-item">
            <BellIcon className="nav-user-dropdown-item-icon" aria-hidden="true" />
            Notifications
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem className="nav-user-dropdown-item nav-user-dropdown-logout">
          <LogOutIcon className="nav-user-dropdown-item-icon" aria-hidden="true" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default NavUser;