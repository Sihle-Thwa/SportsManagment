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
		<header className="flex h-16 flex-row items-center gap-1 ">
			<SidebarTrigger className="size-fit" />
			<Separator orientation="vertical" className="mr-2 " />
			<Breadcrumb>
				<BreadcrumbList>
					{pathSegments.length > 0 && (
						<BreadcrumbItem className="hidden md:block ">
							<BreadcrumbPage className="h-6">
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
