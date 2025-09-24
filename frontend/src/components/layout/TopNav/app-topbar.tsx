// app-topbar.tsx
import { ModeToggle } from "../../mode-toggle";
import { SearchInput } from "../../common/Input/search-input";
import Header from "../Header/app-header";
import "./apptopbar.css";
import { useSidebar } from "../../ui/sidebar-context";
import { Menu } from "lucide-react";
import "./apptopbar.css";

const AppTopBar: React.FC = () => {
	const { toggleSidebar, isMobile } = useSidebar();

	return (
		<div className="app-topbar-inner" role="region" aria-label="Top navigation">
			{/* Left: navigation trigger (mobile) + breadcrumbs/header */}
			<div className="topbar-left">
				{/* Mobile: show a compact menu trigger that toggles the sidebar sheet */}
				<button
					type="button"
					aria-label="Toggle sidebar"
					className="topbar-mobile-toggle"
					onClick={() => toggleSidebar()}
					title="Toggle sidebar"
				>
					<Menu />
				</button>

				{/* Breadcrumbs / page title (kept in Header component) */}
				<div className="topbar-breadcrumbs">
					<Header />
				</div>
			</div>

			{/* Center: search (hidden on small screens) */}
			<div className="topbar-center" aria-hidden={isMobile}>
				<SearchInput />
			</div>

			{/* Right: utilities (theme toggle, other actions) */}
			<div className="topbar-right">
				<ModeToggle />
			</div>
		</div>
	);
};

export default AppTopBar;
