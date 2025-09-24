import * as React from "react";
import { Search } from "lucide-react";
import "./searchinput.css";
import { cn } from "../../../lib/utils";
import { Input } from "./input";

// Define a type for search results
type SearchResult = {
	id?: string | number;
	url?: string;
	title?: string;
	subtitle?: string;
	// add other fields as needed
};

export function SearchInput() {
	const [query, setQuery] = React.useState("");
	const [results, setResults] = React.useState<Array<SearchResult>>([]); // use SearchResult type
	const [loading, setLoading] = React.useState(false);
	const [open, setOpen] = React.useState(false);
	const [highlight, setHighlight] = React.useState<number | null>(null);
	const inputRef = React.useRef<HTMLInputElement | null>(null);

	// debounce timer
	React.useEffect(() => {
		if (!query || query.trim().length < 1) {
			setResults([]);
			setOpen(false);
			setLoading(false);
			return;
		}
		setLoading(true);
		const id = window.setTimeout(async () => {
			try {
				const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`, {
					method: "GET",
				});
				if (!res.ok) throw new Error("Search failed");
				const payload = await res.json();
				setResults(Array.isArray(payload) ? payload : []);
				setOpen(true);
				setHighlight(payload && payload.length ? 0 : null);
			} catch (err) {
				console.error("Search error", err);
				setResults([]);
				setOpen(false);
			} finally {
				setLoading(false);
			}
		}, 300); // 300ms debounce

		return () => window.clearTimeout(id);
	}, [query]);

	// keyboard handling for navigation
	function onKeyDown(e: React.KeyboardEvent) {
		if (!open) return;
		if (e.key === "ArrowDown") {
			e.preventDefault();
			setHighlight((h) =>
				h === null ? 0 : Math.min((results.length || 1) - 1, h + 1),
			);
		} else if (e.key === "ArrowUp") {
			e.preventDefault();
			setHighlight((h) => (h === null ? 0 : Math.max(0, h - 1)));
		} else if (e.key === "Enter") {
			if (highlight != null && results[highlight]) {
				const url = results[highlight].url;
				if (url) window.location.assign(url);
			}
		} else if (e.key === "Escape") {
			setOpen(false);
			inputRef.current?.blur();
		}
	}

	// click outside closes the dropdown
	React.useEffect(() => {
		function onDocClick(e: MouseEvent) {
			if (!inputRef.current) return;
			if (e.target && inputRef.current.contains(e.target as Node)) return;
			setOpen(false);
		}
		document.addEventListener("mousedown", onDocClick);
		return () => document.removeEventListener("mousedown", onDocClick);
	}, []);

	return (
		<div className="search-input" role="search" aria-label="Site search">
			<Input
				ref={inputRef}
				startIcon={Search}
				type="search"
				value={query}
				onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
					setQuery(e.target.value)
				}
				onKeyDown={onKeyDown}
				placeholder="Search…"
				className="search-input__control"
				aria-autocomplete="list"
				aria-expanded={open}
				aria-controls="search-results-list"
				setValue={setQuery}
			/>

			{open && results && results.length > 0 && (
				<ul
					id="search-results-list"
					role="listbox"
					className="search-input__results"
					aria-label="Search results"
				>
					{results.map((r, i) => (
						<li
							key={r.id ?? i}
							role="option"
							aria-selected={i === highlight}
							className={cn(
								"search-input__result",
								i === highlight && "is-highlight",
							)}
							onMouseEnter={() => setHighlight(i)}
							onClick={() => {
								if (r.url) window.location.assign(r.url);
							}}
						>
							<div className="search-input__result-title">{r.title}</div>
							{r.subtitle && (
								<div className="search-input__result-sub">{r.subtitle}</div>
							)}
						</li>
					))}
				</ul>
			)}

			{open && !loading && results.length === 0 && (
				<div className="search-input__empty">No results</div>
			)}
		</div>
	);
}

export default SearchInput;
