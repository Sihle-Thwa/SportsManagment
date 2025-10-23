"use client";
import * as React from "react";
import { Search } from "lucide-react";
import "./searchinput.css";
import { useNavigate } from "react-router-dom";

type SearchResult = {
	url: string;
	id?: string | number;
	title: string;
	subtitle?: string;
};

export default function SearchInput() {
	const navigate = useNavigate();
	const [q, setQ] = React.useState("");
	const [results, setResults] = React.useState<SearchResult[]>([]);
	const [open, setOpen] = React.useState(false);
	const [loading, setLoading] = React.useState(false);
	const [index, setIndex] = React.useState<number>(-1);
	const inputRef = React.useRef<HTMLInputElement | null>(null);
	const containerRef = React.useRef<HTMLDivElement | null>(null);

	// keyboard shortcut /
	React.useEffect(() => {
		function onKey(e: KeyboardEvent) {
			if (e.key === "/" && (document.activeElement?.tagName ?? "") === "BODY") {
				e.preventDefault();
				inputRef.current?.focus();
			}
		}
		document.addEventListener("keydown", onKey, { passive: false });
		return () => document.removeEventListener("keydown", onKey);
	}, []);

	// debounce fetch
	React.useEffect(() => {
		if (!q || q.trim().length < 1) {
			setResults([]);
			setOpen(false);
			setLoading(false);
			return;
		}

		const abortController = new AbortController();
		setLoading(true);

		const id = window.setTimeout(async () => {
			try {
				const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`, {
					signal: abortController.signal,
				});
				if (!res.ok) throw new Error("search failed");
				const payload = await res.json();
				setResults(Array.isArray(payload) ? payload : []);
				setOpen(true);
				setIndex(0);
			} catch (error) {
				// Don't update state if request was aborted
				if (error instanceof Error && error.name === "AbortError") {
					return;
				}
				setResults([]);
				setOpen(false);
			} finally {
				if (!abortController.signal.aborted) {
					setLoading(false);
				}
			}
		}, 300);

		return () => {
			window.clearTimeout(id);
			abortController.abort();
		};
	}, [q]);

	// click outside closes
	React.useEffect(() => {
		function onDoc(e: MouseEvent) {
			if (!containerRef.current) return;
			if (!containerRef.current.contains(e.target as Node)) setOpen(false);
		}
		document.addEventListener("mousedown", onDoc, { passive: true });
		return () => document.removeEventListener("mousedown", onDoc);
	}, []);

	function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
		if (!open) return;
		if (e.key === "ArrowDown") {
			e.preventDefault();
			setIndex((i) => Math.min(results.length - 1, i + 1));
		} else if (e.key === "ArrowUp") {
			e.preventDefault();
			setIndex((i) => Math.max(0, i - 1));
		} else if (e.key === "Enter") {
			e.preventDefault();
			if (results[index]) {
				const r = results[index];
				if (r.url) navigate(r.url);
				setOpen(false);
			}
		} else if (e.key === "Escape") {
			setOpen(false);
		}
	}

	return (
		<div className="search-input" ref={containerRef}>
			<div className="search-input__wrap">
				<Search className="search-input__icon" />
				<input
					ref={inputRef}
					className="search-input__control"
					placeholder="Search…"
					value={q}
					onChange={(e) => setQ(e.target.value)}
					onKeyDown={onKeyDown}
					aria-autocomplete="list"
					aria-expanded={open}
					aria-haspopup="listbox"
				/>
			</div>

			{open && results.length > 0 && (
				<ul className="search-input__results" role="listbox">
					{results.map((r, i) => (
						<li
							key={r.id ?? i}
							role="option"
							aria-selected={i === index}
							className={`search-input__result ${
								i === index ? "is-highlight" : ""
							}`}
							onMouseEnter={() => setIndex(i)}
							onClick={() => {
								if (r.url) navigate(r.url);
								setOpen(false);
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
