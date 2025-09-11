// app-topbar.tsx
import { ModeToggle } from "../../mode-toggle";
import { SearchInput } from "../../common/Input/search-input";
import Header from "../Header/app-header";
import "./apptopbar.css";
const MainAppTopBar = () => {
	return (
		<div className="app-topbar-inner">
			{/* Left section - Navigation controls and breadcrumbs */}
			<div className="topbar-section topbar-left">
				<Header />
			</div>

			{/* Center section - Search */}
			<div className="topbar-section topbar-center">
				<SearchInput />
			</div>

			{/* Right section - User controls */}
			<div className="topbar-section topbar-right">
				<ModeToggle />
			</div>
		</div>
	);
};

export default MainAppTopBar;
