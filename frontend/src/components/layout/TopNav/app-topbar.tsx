import { ModeToggle } from "../../mode-toggle";
import { SearchInput } from "../../common/Input/search-input";
import Header from "../Header/app-header";
import "../../../styles/global.css"; // Import your custom global styles

const MainAppTopBar = () => {
	return (
		<header className="navigation p-4 flex items-center justify-between">
			{/* Left side - Page Name */}
			<div className="flex justify-start ">
				<Header />
			</div>

			{/* Center - Search */}
			<div className="flex justify-center">
				<SearchInput />
			</div>

			{/* Right - Theme-toggle */}
			<div className="flex justify-end">
				<ModeToggle />
			</div>
		</header>
	);
};

export default MainAppTopBar;
