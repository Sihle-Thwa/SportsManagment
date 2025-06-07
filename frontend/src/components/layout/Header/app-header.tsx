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
		<header className=" flex">
			<SidebarTrigger className="navigation-trigger" />
			<Separator orientation="vertical" className="color-primary" />
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
