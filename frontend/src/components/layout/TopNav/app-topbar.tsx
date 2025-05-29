import { ModeToggle } from "../../mode-toggle";
import { SearchInput } from "../../common/Input/search-input";
import Header from "../Header/app-header";
import "../../../styles/global.css"; // Import your custom global styles

const MainAppTopBar = () => {
	return (
		<header className="flex h-18 px-6 items-center justify-between border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
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
