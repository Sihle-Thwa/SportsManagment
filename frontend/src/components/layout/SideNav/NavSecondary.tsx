// NavSecondary.tsx
"use client";

import React from "react";
import { NavLink } from "react-router-dom";
import { SidebarMenu, SidebarMenuItem } from "../../ui/sidebar";
import { HelpCircle, Settings } from "lucide-react";
import "./navsecondary.css";

export interface SecondaryItem {
	id: string;
	title: string;
	path: string;
	icon: React.ElementType | null;
}

const ITEMS: SecondaryItem[] = [
	{ id: "settings", title: "Settings", path: "/settings", icon: Settings },
	{ id: "help", title: "Help", path: "/help", icon: HelpCircle },
];

export default function NavSecondary({
	collapsed = false,
}: {
	collapsed?: boolean;
}) {
	return (
		<nav className="navSecondaryRoot" aria-label="Secondary">
			<SidebarMenu className="navSecondaryMenu">
				{ITEMS.map((i) => {
					const Icon = i.icon;
					return (
						<SidebarMenuItem key={i.id} className="navSecondaryItem">
							<NavLink
								to={i.path}
								className="navSecondaryLink"
								title={collapsed ? i.title : undefined}
								aria-label={i.title}
							>
								<div className="navSecondaryIcon" aria-hidden>
									{Icon ? <Icon /> : <span />}
								</div>
								{!collapsed && <div className="navSecondaryLabel">{i.title}</div>}
							</NavLink>
						</SidebarMenuItem>
					);
				})}
			</SidebarMenu>
		</nav>
	);
}
