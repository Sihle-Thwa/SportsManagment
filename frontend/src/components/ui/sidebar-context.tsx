"use client";

import * as React from "react";
import { TooltipProvider } from "../../components/ui/tooltip";
import { cn } from "../../lib/utils";

// cookie + widths
const SIDEBAR_COOKIE_NAME = "sidebar_state";
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;

export type SidebarContextValue = {
	state: "expanded" | "collapsed";
	open: boolean;
	setOpen: (open: boolean | ((v: boolean) => boolean)) => void;
	openMobile: boolean;
	setOpenMobile: (open: boolean) => void;
	isMobile: boolean;
	toggleSidebar: () => void;
	isCollapsed: boolean;
};

// eslint-disable-next-line react-refresh/only-export-components
export const SidebarContext = React.createContext<SidebarContextValue | null>(
	null,
);

// eslint-disable-next-line react-refresh/only-export-components
export function useSidebar() {
	const ctx = React.useContext(SidebarContext);
	if (!ctx)
		throw new Error("useSidebar must be used within a SidebarProvider.");
	return ctx;
}

function readCookieInitial(): boolean | null {
	if (typeof document === "undefined") return null;
	const match = document.cookie.match(
		new RegExp(`(?:^|; )${SIDEBAR_COOKIE_NAME}=([^;]*)`),
	);
	if (!match) return null;
	try {
		return match[1] === "true";
	} catch {
		return null;
	}
}

export function SidebarProvider({
	defaultOpen = true,
	open: openProp,
	onOpenChange: setOpenProp,
	className,
	style,
	children,
	...props
}: React.ComponentProps<"div"> & {
	defaultOpen?: boolean;
	open?: boolean;
	onOpenChange?: (open: boolean) => void;
}) {
	const [isMobile, setIsMobile] = React.useState(false);
	const [openMobile, setOpenMobile] = React.useState(false);

	React.useEffect(() => {
		const mql = window.matchMedia("(max-width: 768px)");
		const onChange = () => setIsMobile(mql.matches);
		onChange();
		mql.addEventListener("change", onChange);
		return () => mql.removeEventListener("change", onChange);
	}, []);

	const cookieInitial = React.useMemo(readCookieInitial, []);
	const [_open, _setOpen] = React.useState<boolean>(
		cookieInitial ?? defaultOpen,
	);
	const open = openProp ?? _open;

	const setOpen = React.useCallback(
		(value: boolean | ((v: boolean) => boolean)) => {
			const next =
				typeof value === "function"
					? (value as (v: boolean) => boolean)(open)
					: value;
			if (setOpenProp) setOpenProp(next);
			else _setOpen(next);
			document.cookie = `${SIDEBAR_COOKIE_NAME}=${String(
				next,
			)}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
		},
		[open, setOpenProp],
	);

	const toggleSidebar = React.useCallback(
		() => (isMobile ? setOpenMobile((v) => !v) : setOpen((v) => !v)),
		[isMobile, setOpen],
	);

	const state: "expanded" | "collapsed" = open ? "expanded" : "collapsed";

	const value = React.useMemo<SidebarContextValue>(
		() => ({
			state,
			open,
			setOpen,
			isMobile,
			openMobile,
			setOpenMobile,
			toggleSidebar,
			isCollapsed: state === "collapsed",
		}),
		[state, open, setOpen, isMobile, openMobile, toggleSidebar],
	);

	return (
		<SidebarContext.Provider value={value}>
			<TooltipProvider delayDuration={0}>
				<div
					data-slot="sidebar-wrapper"
					style={style}
					className={cn(
						"group/sidebar-wrapper flex min-h-svh w-full",
						className,
					)}
					{...props}
				>
					{children}
				</div>
			</TooltipProvider>
		</SidebarContext.Provider>
	);
}
