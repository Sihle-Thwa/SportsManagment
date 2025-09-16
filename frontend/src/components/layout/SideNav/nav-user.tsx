import { ChevronDown } from "lucide-react";
import { cn } from "../../../lib/utils";
import "./nav-user.css";

export interface NavUserProps {
	collapsed?: boolean;
	name?: string;
	email?: string;
	avatarUrl?: string;
}

export default function NavUser({
	collapsed = false,
	name = "Siphesihle M.",
	email = "siphesihle@example.com",
	avatarUrl,
}: NavUserProps) {
	return (
		<div className={cn("nav-user", collapsed && "is-collapsed")}>
			<button
				type="button"
				className={cn(
					"nav-user__trigger nav-user-trigger",
					collapsed && "nav-user-trigger-collapsed",
				)}
				aria-haspopup="menu"
				aria-expanded="false"
			>
				<span className="nav-user__avatar nav-user-avatar" aria-hidden>
					{avatarUrl ? (
						<img src={avatarUrl} alt="" className="nav-user__avatar-img" />
					) : (
						<span className="nav-user__avatar-fallback nav-user-avatar-fallback">
							SM
						</span>
					)}
				</span>
				{!collapsed && (
					<span className="nav-user__info nav-user-info">
						<span className="nav-user__name nav-user-name">{name}</span>
						<span className="nav-user__email nav-user-email">{email}</span>
					</span>
				)}
				{!collapsed && (
					<ChevronDown className="nav-user__chevron nav-user-menu-icon" />
				)}
			</button>
			{/* Mount your dropdown component here; classes provided in base sidebar.css */}
		</div>
	);
}
