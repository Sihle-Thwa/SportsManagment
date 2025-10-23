// src/components/layout/SideNav/nav-user.tsx
"use client";

import * as React from "react";
import { ChevronDown, LogOut, Settings } from "lucide-react";
import { cn } from "../../../lib/utils";
import "./nav-user.css";

export interface NavUserProps {
	collapsed?: boolean;
	name?: string;
	email?: string;
	avatarUrl?: string;
	onSignOut?: () => void;
	onOpenSettings?: () => void;
}

export default function NavUser({
	collapsed = false,
	name = "Siphesihle M.",
	email = "siphesihle@example.com",
	avatarUrl,
	onSignOut,
	onOpenSettings,
}: NavUserProps) {
	const [open, setOpen] = React.useState(false);
	const triggerRef = React.useRef<HTMLButtonElement | null>(null);
	const menuRef = React.useRef<HTMLDivElement | null>(null);

	React.useEffect(() => {
		function onDocClick(e: MouseEvent) {
			if (!menuRef.current || !triggerRef.current) return;
			if (
				!menuRef.current.contains(e.target as Node) &&
				!triggerRef.current.contains(e.target as Node)
			) {
				setOpen(false);
			}
		}
		function onKey(e: KeyboardEvent) {
			if (e.key === "Escape") {
				setOpen(false);
				triggerRef.current?.focus();
			}
		}
		document.addEventListener("mousedown", onDocClick, { passive: true });
		document.addEventListener("keydown", onKey, { passive: false });
		return () => {
			document.removeEventListener("mousedown", onDocClick);
			document.removeEventListener("keydown", onKey);
		};
	}, []);

	return (
		<div className={cn("nav-user", collapsed && "is-collapsed")}>
			<button
				ref={triggerRef}
				type="button"
				className={cn(
					"nav-user__trigger nav-user-trigger",
					collapsed && "nav-user-trigger-collapsed",
				)}
				aria-haspopup="menu"
				aria-expanded={open}
				onClick={() => setOpen((s) => !s)}
			>
				<span
					className={cn(
						"nav-user__avatar nav-user-avatar",
						collapsed && "nav-user-avatar-collapsed",
					)}
					aria-hidden
				>
					{avatarUrl ? (
						<img src={avatarUrl} alt="" className="nav-user__avatar-img" />
					) : (
						<span className="nav-user__avatar-fallback nav-user-avatar-fallback">
							{String(name)
								.split(" ")
								.map((n) => n[0])
								.slice(0, 2)
								.join("")
								.toUpperCase()}
						</span>
					)}
				</span>

				{!collapsed && (
					<>
						<span className="nav-user__info nav-user-info">
							<span className="nav-user__name nav-user-name">{name}</span>
							<span className="nav-user__email nav-user-email">{email}</span>
						</span>
						<ChevronDown className="nav-user__chevron nav-user-menu-icon" />
					</>
				)}
			</button>

			{open && (
				<div
					ref={menuRef}
					className="nav-user__dropdown nav-user-dropdown"
					role="menu"
					aria-label="User menu"
				>
					<div className="nav-user-dropdown-header">
						<div className="nav-user-dropdown-info">
							<div
								className="nav-user-dropdown-avatar nav-user-dropdown-avatar-fallback"
								aria-hidden
							>
								{avatarUrl ? (
									<img
										src={avatarUrl}
										alt=""
										className="nav-user-dropdown-avatar-img"
									/>
								) : (
									<div className="nav-user-dropdown-avatar-fallback">
										{String(name)
											.split(" ")
											.map((n) => n[0])
											.slice(0, 2)
											.join("")
											.toUpperCase()}
									</div>
								)}
							</div>
							<div className="nav-user-dropdown-text">
								<div className="nav-user-dropdown-name">{name}</div>
								<div className="nav-user-dropdown-email">{email}</div>
							</div>
						</div>
					</div>

					<div className="nav-user-dropdown-list">
						<button
							type="button"
							className="nav-user-dropdown-item"
							role="menuitem"
							onClick={() => {
								setOpen(false);
								onOpenSettings?.();
							}}
						>
							<Settings className="nav-user-dropdown-item-icon" />
							<span>Settings</span>
						</button>

						<button
							type="button"
							className="nav-user-dropdown-item nav-user-dropdown-logout"
							role="menuitem"
							onClick={() => {
								setOpen(false);
								onSignOut?.();
							}}
						>
							<LogOut className="nav-user-dropdown-item-icon" />
							<span>Sign out</span>
						</button>
					</div>
				</div>
			)}
		</div>
	);
}
