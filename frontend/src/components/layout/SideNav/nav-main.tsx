import { SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';
import { NavLink } from 'react-router-dom';
import { routes } from '@/routes';


interface NavMainProps {
  activeRoute: string;
  setActiveRoute: (path: string) => void;
}

export function NavMain({ activeRoute, setActiveRoute }: NavMainProps) {
  return (
    <>
      {routes.map((route) => (
        <SidebarMenuItem key={route.id}>
          <SidebarMenuButton asChild>
            <NavLink
              to={route.path}
              className={({ isActive }) => 
                `flex items-center gap-3 px-4 py-2 rounded-lg ${isActive || activeRoute === route.path ? 'bg-primary text-white' : 'text-muted-foreground hover:bg-gray-100'}`}
              onClick={() => setActiveRoute(route.path)}
            >
              {route.icon}
              <span>{route.title}</span>
            </NavLink>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </>
  );
}