// app-header.tsx
import { useLocation } from "react-router-dom";
import { SidebarTrigger } from "../../ui/sidebar";
import { useSidebar } from "../../ui/sidebar-context";
import "./appheader.css";

export default function Header() {
	const location = useLocation();
	const sidebar = useSidebar();

	return (
		<div className="app-header" role="banner" aria-label="Page title">
			<SidebarTrigger
				className="app-header__trigger"
				aria-controls="app-sidebar"
				aria-expanded={sidebar ? !!sidebar.open : undefined}
				aria-label="Toggle sidebar"
			/>
			<div aria-label="Breadcrumb" className="app-breadcrumb-item">
				{location.pathname
					.split("/")
					.filter(Boolean)
					.map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))}
			</div>
		</div>
	);
}