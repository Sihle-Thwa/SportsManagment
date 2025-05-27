import { ModeToggle } from "@/components/mode-toggle";
import { SearchInput } from "../../common/Input/search-input";
import Header from "../Header/app-header";

const AppTopBar = () => {
	return (
		<div className="flex flex-row h-[72px] px-6 bg-transparent items-center justify-between">
			<div className="flex items-start">
				{/* Left side - Page Name */}
				<Header />
			</div>

			<div className="flex items-center justify-center w-full">
				{/* Center - Search */}
				<SearchInput />
			</div>
			<div className="flex items-center justify-end w-full">
				{/* Right - Theme-toggle */}
				<ModeToggle />
			</div>
		</div>
	);
};

export default AppTopBar;
