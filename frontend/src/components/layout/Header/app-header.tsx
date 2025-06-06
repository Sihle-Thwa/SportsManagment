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
		<header className="navigation-content">
			<SidebarTrigger className="navigation-trigger" />
			<Separator orientation="vertical" className="icon-base icon-accent" />
			<Breadcrumb className="navigation-content">
				<BreadcrumbList className="navigation-list">
					{pathSegments.length > 0 && (
						<BreadcrumbItem className="navigation-item">
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
