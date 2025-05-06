import { useLocation } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
} from "@/components/ui/breadcrumb";



const Header = () => {
  const location = useLocation();
  const pathSegments = location.pathname.split("/").filter(Boolean);

  return (
    <div className="bg-white border-b border-gray-200  py-4 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <Breadcrumb className="mb-2">
        {pathSegments.length > 0 && (
          <BreadcrumbItem>
            {pathSegments[pathSegments.length - 1]
              .charAt(0)
              .toUpperCase() + pathSegments[pathSegments.length - 1].slice(1)}
          </BreadcrumbItem>
        )}
      </Breadcrumb>
    </div>
  );
};

export default Header;
