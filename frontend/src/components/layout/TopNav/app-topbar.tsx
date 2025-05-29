import { ModeToggle } from "../../mode-toggle";
import { SearchInput } from "../../common/Input/search-input";
import Header from "../Header/app-header";

const MainAppTopBar = () => {
	return (
		<div
			className={`
				flex 
				{/* Component responsible for displaying the page header */}
				<Header />
				h-[72px] 
				px-6 
				items-center 
				justify-between
			`}
		>
			<div className="flex items-start">
				{/* Left side - Page Name */}
				<Header />
			</div>

			{/* Center - Search */}
			{/* The SearchInput component provides a search bar for user input. 
					It may accept props such as 'placeholder' or 'onSearch' for customization. */}
			<SearchInput />
			{/* Right - Theme-toggle */}
			{/* Component responsible for toggling between light and dark mode */}
			<ModeToggle />
			{/* Right - Theme-toggle */}
			<ModeToggle />
		</div>
	);
}
export default MainAppTopBar;
