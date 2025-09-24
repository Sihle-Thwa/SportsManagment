// app-header.tsx
import { useLocation } from "react-router-dom";
import "./appheader.css";

export default function Header() {
	const location = useLocation();

	return (
		<div className="app-header" role="banner" aria-label="Page title">
			<div aria-label="Breadcrumb" className="app-breadcrumb-item">
				{location.pathname
					.split("/")
					.filter(Boolean)
					.map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))}
			</div>
		</div>
	);
}