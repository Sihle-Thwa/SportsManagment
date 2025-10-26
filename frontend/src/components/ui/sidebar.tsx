"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { VariantProps, cva } from "class-variance-authority";
import { PanelLeftIcon } from "lucide-react";
import { cn } from "../../lib/utils";

import { Button } from "../../components/common/Button/Button";
import { Input } from "../../components/ui/input";
import { Separator } from "../../components/ui/separator";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
} from "../../components/ui/sheet";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "../../components/ui/tooltip";

import { useSidebar } from "./sidebar-context";

const SIDEBAR_WIDTH = "16rem";
const SIDEBAR_WIDTH_MOBILE = "18rem";
const SIDEBAR_WIDTH_ICON = "6rem";

/* Sidebar root */
export function Sidebar({
	side = "left",
	variant = "sidebar",
	collapsible = "offcanvas",
	className,
	children,
	...props
}: React.ComponentProps<"div"> & {
	side?: "left" | "right";
	variant?: "sidebar" | "floating" | "inset";
	collapsible?: "offcanvas" | "icon" | "none";
}) {
	const { isMobile, state, openMobile, setOpenMobile } = useSidebar();

	if (collapsible === "none") {
		return (
			<div
				data-slot="sidebar"
				className={cn(
					"bg-sidebar text-sidebar-foreground flex h-full w-[var(--sidebar-width)] flex-col",
					className,
				)}
				style={{ ["--sidebar-width" as never]: SIDEBAR_WIDTH }}
				{...props}
			>
				{children}
			</div>
		);
	}

	if (isMobile) {
		return (
			<Sheet open={openMobile} onOpenChange={setOpenMobile} {...props}>
				<SheetContent
					data-sidebar="sidebar"
					data-slot="sidebar"
					data-mobile="true"
					className="bg-sidebar text-sidebar-foreground w-[var(--sidebar-width)] p-0 [&>button]:hidden"
					style={{ ["--sidebar-width" as never]: SIDEBAR_WIDTH_MOBILE }}
					side={side}
				>
					<SheetHeader className="sr-only">
						<SheetTitle>Sidebar</SheetTitle>
						<SheetDescription>Displays the mobile sidebar.</SheetDescription>
					</SheetHeader>
					<div className="flex h-full w-full flex-col">{children}</div>
				</SheetContent>
			</Sheet>
		);
	}

	return (
		<div
			className="group peer text-sidebar-foreground hidden md:block"
			data-state={state}
			data-collapsible={state === "collapsed" ? collapsible : ""}
			data-variant={variant}
			data-side={side}
			data-slot="sidebar"
		>
			{/* gap spacer */}
			<div
				data-slot="sidebar-gap"
				className={cn(
					"relative w-[var(--sidebar-width)] bg-transparent transition-[width] duration-200 ease-linear",
					"group-data-[collapsible=offcanvas]:w-0",
					"group-data-[side=right]:rotate-180",
					variant === "floating" || variant === "inset"
						? "group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+0.5rem)]"
						: "group-data-[collapsible=icon]:w-[var(--sidebar-width-icon)]",
				)}
				style={{
					["--sidebar-width" as never]: SIDEBAR_WIDTH,
					["--sidebar-width-icon" as never]: SIDEBAR_WIDTH_ICON,
				}}
			/>
			<div
				data-slot="sidebar-container"
				className={cn(
					"fixed inset-y-0 z-10 hidden h-svh w-[var(--sidebar-width)] transition-[left,right,width] duration-200 ease-linear md:flex",
					side === "left"
						? "left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]"
						: "right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]",
					variant === "floating" || variant === "inset"
						? "p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+0.5rem+2px)]"
						: "group-data-[collapsible=icon]:w-[var(--sidebar-width-icon)] group-data-[side=left]:border-r group-data-[side=right]:border-l",
					className,
				)}
				style={{
					["--sidebar-width" as never]: SIDEBAR_WIDTH,
					["--sidebar-width-icon" as never]: SIDEBAR_WIDTH_ICON,
				}}
				{...props}
			>
				<div
					data-sidebar="sidebar"
					data-slot="sidebar-inner"
					className="bg-sidebar group-data-[variant=floating]:border-sidebar-border flex h-full w-full flex-col group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:shadow-sm"
				>
					{children}
				</div>
			</div>
		</div>
	);
}

/* Trigger */
export function SidebarTrigger({
	className,
	onClick,
	...props
}: React.ComponentProps<typeof Button>) {
	const { toggleSidebar } = useSidebar();
	return (
		<button
			data-sidebar="trigger"
			data-slot="sidebar-trigger"
			variant="ghost"
			className={cn("size-7", className)}
			onClick={(e) => {
				onClick?.(e);
				toggleSidebar();
			}}
			{...props}
		>
			<PanelLeftIcon />
			<span className="sr-only">Toggle Sidebar</span>
		</button>
	);
}

/* The rest (in the same module for convenience) */
export function SidebarRail(props: React.ComponentProps<"button">) {
	const { toggleSidebar } = useSidebar();
	return (
		<button
			data-sidebar="rail"
			data-slot="sidebar-rail"
			aria-label="Toggle Sidebar"
			tabIndex={-1}
			onClick={toggleSidebar}
			{...props}
			className={cn(
				"absolute inset-y-0 z-20 hidden w-4 -translate-x-1/2 sm:flex",
				"[data-side=left] &:-right-4 [data-side=right] &:-left-2",
			)}
			title="Toggle Sidebar"
		/>
	);
}

export function SidebarInset({
	className,
	...props
}: React.ComponentProps<"main">) {
	return (
		<main
			data-slot="sidebar-inset"
			className={cn(
				"bg-background relative flex w-full flex-1 flex-col",
				className,
			)}
			{...props}
		/>
	);
}

export function SidebarInput({
	className,
	...props
}: React.ComponentProps<typeof Input>) {
	return (
		<Input
			data-slot="sidebar-input"
			data-sidebar="input"
			className={cn("bg-background h-8 w-full shadow-none", className)}
			{...props}
		/>
	);
}

export function SidebarHeader({
	className,
	...props
}: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="sidebar-header"
			data-sidebar="header"
			className={cn("flex flex-col gap-2 p-2", className)}
			{...props}
		/>
	);
}

export function SidebarFooter({
	className,
	...props
}: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="sidebar-footer"
			data-sidebar="footer"
			className={cn("flex flex-col gap-2 p-2", className)}
			{...props}
		/>
	);
}

export function SidebarSeparator({
	className,
	...props
}: React.ComponentProps<typeof Separator>) {
	return (
		<Separator
			data-slot="sidebar-separator"
			data-sidebar="separator"
			className={cn("bg-sidebar-border mx-2 w-auto", className)}
			{...props}
		/>
	);
}

export function SidebarContent({
	className,
	...props
}: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="sidebar-content"
			data-sidebar="content"
			className={cn(
				"flex min-h-0 flex-1 flex-col gap-2 overflow-auto",
				className,
			)}
			{...props}
		/>
	);
}

export function SidebarGroup({
	className,
	...props
}: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="sidebar-group"
			data-sidebar="group"
			className={cn("relative flex w-full min-w-0 flex-col p-2", className)}
			{...props}
		/>
	);
}

export function SidebarGroupLabel({
	className,
	asChild = false,
	...props
}: React.ComponentProps<"div"> & { asChild?: boolean }) {
	const Comp = asChild ? Slot : "div";
	return (
		<Comp
			data-slot="sidebar-group-label"
			data-sidebar="group-label"
			className={cn(
				"flex h-8 shrink-0 items-center px-2 text-xs font-medium text-sidebar-foreground/70",
				className,
			)}
			{...props}
		/>
	);
}

export function SidebarGroupAction({
	className,
	asChild = false,
	...props
}: React.ComponentProps<"button"> & { asChild?: boolean }) {
	const Comp = asChild ? Slot : "button";
	return (
		<Comp
			data-slot="sidebar-group-action"
			data-sidebar="group-action"
			className={cn(
				"absolute right-3 top-3.5 flex aspect-square w-5 items-center justify-center rounded-md p-0",
				className,
			)}
			{...props}
		/>
	);
}

export function SidebarGroupContent({
	className,
	...props
}: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="sidebar-group-content"
			data-sidebar="group-content"
			className={cn("w-full text-sm", className)}
			{...props}
		/>
	);
}

export function SidebarMenu({
	className,
	...props
}: React.ComponentProps<"ul">) {
	return (
		<ul
			data-slot="sidebar-menu"
			data-sidebar="menu"
			className={cn("flex w/full min-w-0 flex-col gap-1", className)}
			{...props}
		/>
	);
}

export function SidebarMenuItem({
	className,
	...props
}: React.ComponentProps<"li">) {
	return (
		<li
			data-slot="sidebar-menu-item"
			data-sidebar="menu-item"
			className={cn("group/menu-item relative", className)}
			{...props}
		/>
	);
}

const sidebarMenuButtonVariants = cva(
	"peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-hidden transition hover:bg-sidebar-accent hover:text-sidebar-accent-foreground [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0",
	{
		variants: {
			variant: {
				default: "",
				outline: "bg-background shadow-[0_0_0_1px_hsl(var(--sidebar-border))]",
			},
			size: { default: "h-8 text-sm", sm: "h-7 text-xs", lg: "h-12 text-sm" },
		},
		defaultVariants: { variant: "default", size: "default" },
	},
);

export function SidebarMenuButton({
	asChild = false,
	isActive = false,
	variant = "default",
	size = "default",
	tooltip,
	className,
	...props
}: React.ComponentProps<"button"> & {
	asChild?: boolean;
	isActive?: boolean;
	tooltip?: string | React.ComponentProps<typeof TooltipContent>;
} & VariantProps<typeof sidebarMenuButtonVariants>) {
	const Comp = asChild ? Slot : "button";
	const { isMobile, state } = useSidebar();

	const button = (
		<Comp
			data-slot="sidebar-menu-button"
			data-sidebar="menu-button"
			data-size={size}
			data-active={isActive}
			className={cn(sidebarMenuButtonVariants({ variant, size }), className)}
			{...props}
		/>
	);

	if (!tooltip) return button;

	const tooltipProps =
		typeof tooltip === "string"
			? ({ children: tooltip } as React.ComponentProps<typeof TooltipContent>)
			: tooltip;
	return (
		<Tooltip>
			<TooltipTrigger asChild>{button}</TooltipTrigger>
			<TooltipContent
				side="right"
				align="center"
				hidden={state !== "collapsed" || isMobile}
				{...tooltipProps}
			/>
		</Tooltip>
	);
}

/* badges, actions, subs (same signatures as before) */
export function SidebarMenuAction(props: React.ComponentProps<"button">) {
	return (
		<button
			data-slot="sidebar-menu-action"
			data-sidebar="menu-action"
			{...props}
		/>
	);
}
export function SidebarMenuBadge(props: React.ComponentProps<"div">) {
	return (
		<div data-slot="sidebar-menu-badge" data-sidebar="menu-badge" {...props} />
	);
}
export function SidebarMenuSub(props: React.ComponentProps<"ul">) {
	return (
		<ul
			data-slot="sidebar-menu-sub"
			data-sidebar="menu-sub"
			className="mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 border-l px-2.5 py-0.5"
			{...props}
		/>
	);
}
export function SidebarMenuSubItem(props: React.ComponentProps<"li">) {
	return (
		<li
			data-slot="sidebar-menu-sub-item"
			data-sidebar="menu-sub-item"
			className="group/menu-sub-item relative"
			{...props}
		/>
	);
}
export function SidebarMenuSubButton({
	asChild = false,
	size = "md",
	isActive = false,
	className,
	...props
}: React.ComponentProps<"a"> & {
	asChild?: boolean;
	size?: "sm" | "md";
	isActive?: boolean;
}) {
	const Comp = asChild ? Slot : "a";
	return (
		<Comp
			data-slot="sidebar-menu-sub-button"
			data-sidebar="menu-sub-button"
			data-size={size}
			data-active={isActive}
			className={cn(
				"flex h-7 min-w-0 -translate-x-px items-center gap-2 overflow-hidden rounded-md px-2 text-sm",
				"hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
				className,
			)}
			{...props}
		/>
	);
}
