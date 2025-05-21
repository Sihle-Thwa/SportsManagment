import { SearchInput } from "@/components/common/Input/search-input";
import Header from "../Header/app-header";

const AppTopBar = () => {
	return (
		<div className="flex flex-row h-[72px] border-b border-gray-200 bg-white px-6">
			<div className="flex items-start">
				{/* Left side - Page Name */}
				<Header />
			</div>

			<div className="flex items-center justify-center w-full">
				{/* Center - Search */}
				<SearchInput />
			</div>
		</div>
	);
};

export default AppTopBar;
