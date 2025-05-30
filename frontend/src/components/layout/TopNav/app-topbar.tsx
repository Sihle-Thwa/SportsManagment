import { ModeToggle } from "../../mode-toggle";
import { SearchInput } from "../../common/Input/search-input";
import Header from "../Header/app-header";
import "../../../styles/global.css"; // Import your custom global styles

const MainAppTopBar = () => {
	return (
		<header className="flex flex-row h-18 px-6 items-center justify-between border-b  backdrop-blur supports-[backdrop-filter]:bg-primary-0">
			{/* Left side - Page Name */}
			<div className="flex items-center">
				<Header />
			</div>

			{/* Center - Search */}
			<div className="flex-1 flex justify-center">
				<SearchInput />
			</div>

			{/* Right - Theme-toggle */}
			<div className="flex items-center gap-2">
				<ModeToggle />
			</div>
		</header>
	);
};

export default MainAppTopBar;
