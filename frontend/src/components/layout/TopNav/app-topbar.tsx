// app-topbar.tsx
import { ModeToggle } from "../../mode-toggle";
import { SearchInput } from "../../common/Input/search-input";
import Header from "../Header/app-header";
import "../../../styles/global.css";

const MainAppTopBar = () => {
	return (
		<div className="app-topbar-inner navigation p-4 flex items-center justify-between">
			<div className="flex justify-start">
				<Header />
			</div>
			<div className="flex justify-center">
				<SearchInput />
			</div>
			<div className="flex justify-end">
				<ModeToggle />
			</div>
		</div>
	);
};

export default MainAppTopBar;
