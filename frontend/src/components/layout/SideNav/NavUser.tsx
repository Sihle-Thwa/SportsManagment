"use client";
import React from "react";
import { ChevronDown, LogOut, Settings } from "lucide-react";
import "./navuser.css";

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
		document.addEventListener("keydown", onKey);
		return () => {
			document.removeEventListener("mousedown", onDocClick);
			document.removeEventListener("keydown", onKey);
		};
	}, []);

	return (
		<div className="navUserRoot">
			<button
				ref={triggerRef}
				type="button"
				className="navUserTrigger"
				aria-haspopup="menu"
				aria-expanded={open}
				onClick={() => setOpen((s) => !s)}
			>
				<span
					className={`navUserAvatar ${collapsed && "navUserAvatarCollapsed"}`}
					aria-hidden
				>
					{avatarUrl ? (
						<img src={avatarUrl} alt="" className="navUserAvatarImg" />
					) : (
						<span className="navUserAvatarFallback">
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
						<span className="navUserInfo">
							<span className="navUserName">{name}</span>
							<span className="navUserEmail">{email}</span>
						</span>
						<ChevronDown className="navUserChevron" />
					</>
				)}
			</button>

			{open && (
				<div
					ref={menuRef}
					className="navUserMenu"
					role="menu"
					aria-label="User menu"
				>
					<div className="navUserMenuHeader">
						<div className="navUserMenuUser">
							<div className="navUserMenuAvatar" aria-hidden>
								{avatarUrl ? (
									<img
										src={avatarUrl}
										alt=""
										className="navUserMenuAvatarImg"
									/>
								) : (
									<div className="navUserMenuAvatarFallback">
										{String(name)
											.split(" ")
											.map((n) => n[0])
											.slice(0, 2)
											.join("")
											.toUpperCase()}
									</div>
								)}
							</div>
							<div className="navUserMenuText">
								<div className="navUserMenuName">{name}</div>
								<div className="navUserMenuEmail">{email}</div>
							</div>
						</div>
					</div>

					<div className="navUserMenuList">
						<button
							type="button"
							className="navUserMenuItem"
							role="menuitem"
							onClick={() => {
								setOpen(false);
								onOpenSettings?.();
							}}
						>
							<Settings className="navUserMenuIcon" />
							<span>Settings</span>
						</button>

						<button
							type="button"
							className={`navUserMenuItem navUserLogout`}
							role="menuitem"
							onClick={() => {
								setOpen(false);
								onSignOut?.();
							}}
						>
							<LogOut className="navUserMenuIcon" />
							<span>Sign Out</span>
						</button>
					</div>
				</div>
			)}
		</div>
	);
}
