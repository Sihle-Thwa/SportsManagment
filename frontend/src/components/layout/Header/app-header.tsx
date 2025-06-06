import { useLocation } from "react-router-dom";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbList,
	BreadcrumbPage,
} from "../../ui/breadcrumb";
import { Separator } from "../../ui/separator";
import { SidebarTrigger } from "../../ui/sidebar";

const Header = () => {
	const location = useLocation();
	const pathSegments = location.pathname.split("/").filter(Boolean);

	return (
		<header className="sidebar-header">
			<SidebarTrigger className="btn-base btn-accent" />
			<Separator orientation="vertical" className="icon-base icon-accent" />
			<Breadcrumb>
				<BreadcrumbList>
					{pathSegments.length > 0 && (
						<BreadcrumbItem className="flex items-center gap-2">
							<BreadcrumbPage className="h-full flex items-start gap-2">
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
