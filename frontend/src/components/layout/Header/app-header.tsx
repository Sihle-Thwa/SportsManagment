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
		<header className="flex h-16 items-center gap-2 border-b bg-background px-4">
			<SidebarTrigger className="ml-0" />
			<Separator orientation="vertical" className="h-6 mx-2" />
			<Breadcrumb>
				<BreadcrumbList>
					{pathSegments.length > 0 && (
						<BreadcrumbItem className="hidden md:block">
							<BreadcrumbPage>
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
