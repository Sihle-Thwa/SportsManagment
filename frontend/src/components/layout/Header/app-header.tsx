import { useLocation } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@radix-ui/react-separator";

const Header = () => {
  const location = useLocation();
  const pathSegments = location.pathname.split("/").filter(Boolean);

  return (
    <div className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />

        {/* Breadcrumb */}
        <Breadcrumb>
          <BreadcrumbList>
            {pathSegments.length > 0 && (
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbPage>
                  {pathSegments[pathSegments.length - 1]
                    .charAt(0)
                    .toUpperCase() +
                    pathSegments[pathSegments.length - 1].slice(1)}
                </BreadcrumbPage>
              </BreadcrumbItem>
            )}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </div>
  );
};

export default Header;
