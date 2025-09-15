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
		name: "John Doe",
		email: "john.doe@example.com",
		initials: "JD",
		avatar: "", // Empty to test fallback
	};

	const handleLogout = () => {
		// Add logout logic here
		console.log("User logged out");
		setIsOpen(false);
	};

	const handleMenuItemClick = (action: string) => {
		// Add menu item logic here
		console.log(`${action} clicked`);
		setIsOpen(false);
	};

	return (
		<DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
			<DropdownMenuTrigger asChild>
				<button
					className={cn(
						"nav-user-trigger",
						collapsed && "nav-user-trigger-collapsed",
						collapsed ? "nav-user-trigger-sm" : "nav-user-trigger-default",
					)}
					aria-label={collapsed ? `User menu for ${userInfo.name}` : undefined}
				>
					<Avatar
						className={cn("nav-user-avatar", collapsed ? "h-8 w-8" : "h-9 w-9")}
					>
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
								size={16}
							/>
						</>
					)}
				</button>
			</DropdownMenuTrigger>

			<DropdownMenuContent
				className="nav-user-dropdown"
				align={collapsed ? "center" : "start"}
				side={collapsed ? "right" : "bottom"}
				sideOffset={8}
				alignOffset={collapsed ? 0 : -8}
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
					<DropdownMenuItem
						className="nav-user-dropdown-item"
						onClick={() => handleMenuItemClick("account")}
					>
						<UserCircleIcon
							className="nav-user-dropdown-item-icon"
							aria-hidden="true"
							size={16}
						/>
						Account
					</DropdownMenuItem>
					<DropdownMenuItem
						className="nav-user-dropdown-item"
						onClick={() => handleMenuItemClick("billing")}
					>
						<CreditCardIcon
							className="nav-user-dropdown-item-icon"
							aria-hidden="true"
							size={16}
						/>
						Billing
					</DropdownMenuItem>
					<DropdownMenuItem
						className="nav-user-dropdown-item"
						onClick={() => handleMenuItemClick("notifications")}
					>
						<BellIcon
							className="nav-user-dropdown-item-icon"
							aria-hidden="true"
							size={16}
						/>
						Notifications
					</DropdownMenuItem>
				</DropdownMenuGroup>

				<DropdownMenuSeparator />

				<DropdownMenuItem
					className="nav-user-dropdown-item nav-user-dropdown-logout"
					onClick={handleLogout}
				>
					<LogOutIcon
						className="nav-user-dropdown-item-icon"
						aria-hidden="true"
						size={16}
					/>
					Log out
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

export default NavUser;
