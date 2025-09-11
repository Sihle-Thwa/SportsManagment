// app-header.tsx
import { useLocation } from "react-router-dom";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbList,
	BreadcrumbPage,
} from "../../ui/breadcrumb";
import { Separator } from "../../ui/separator";
import { SidebarTrigger } from "../../ui/sidebar";
import { useSidebar } from "../../ui/sidebar-context";

const Header = () => {
	const location = useLocation();
	const pathSegments = location.pathname.split("/").filter(Boolean);
	const sidebar = useSidebar(); // get the sidebar context

	return (
		<header className="flex items-center gap-2">
			<SidebarTrigger
				className="navigation-trigger"
				aria-controls="app-sidebar"
				aria-expanded={sidebar?.open !== undefined ? sidebar.open : undefined}
				aria-label="Toggle sidebar"
			/>
			<Separator orientation="vertical" className="mx-2 h-6 bg-border" />
			<Breadcrumb className="navigation-content">
				<BreadcrumbList className="navigation-list">
					{pathSegments.length > 0 && (
						<BreadcrumbItem className="navigation-item">
							<BreadcrumbPage className="h-full flex items-start justify-start">
								{pathSegments[pathSegments.length - 1]
									.replace(/-/g, " ")
									.replace(/\b\w/g, (c) => c.toUpperCase())}
							</BreadcrumbPage>
						</BreadcrumbItem>
					)}
				</BreadcrumbList>
			</Breadcrumb>
		</header>
	);
};

export default Header;
