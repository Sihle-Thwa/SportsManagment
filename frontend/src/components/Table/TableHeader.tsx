import { Search } from "lucide-react";
import "./table.css";

type Props = {
	pageSize: number;
	pageSizeOptions: number[];
	onPageSizeChange: (n: number) => void;
	onSearch: (q: string) => void;
	onAdd?: () => void;
	onBulkDelete?: () => void;
	anySelected?: boolean;
	selectedCount?: number;
	loading?: boolean;
	searchValue?: string;
	onClearSearch?: () => void;
	searchPlaceholder?: string;
};

export default function TableHeader({
	pageSize,
	pageSizeOptions,
	onPageSizeChange,
	onSearch,
	onAdd,
	onBulkDelete,
	anySelected = false,
	selectedCount = 0,
	loading,
	searchValue = "",
	onClearSearch,
	searchPlaceholder = "Search...",
}: Props) {
	return (
		<div className="table-header" role="toolbar" aria-label="Table controls">
			<div className="table-header__inner">
				<div className="table-header__left">
					<div className="table-header__select" aria-label="Rows per page">
						<label htmlFor="rows-per-page">Show</label>
						<select
							id="rows-per-page"
							value={String(pageSize)}
							onChange={(e) => onPageSizeChange(Number(e.target.value))}
							style={{ marginLeft: 8 }}
						>
							{pageSizeOptions.map((o) => (
								<option key={o} value={o}>
									{o}
								</option>
							))}
						</select>
						<span style={{ marginLeft: 8 }}>entries</span>
					</div>
				</div>

				<div className="table-header__center" role="search">
					<div style={{ width: "100%", maxWidth: 560 }}>
						<div
							style={{
								display: "flex",
								alignItems: "center",
								gap: 8,
								padding: "8px 12px",
								borderRadius: 10,
								border: "1px solid var(--border-default)",
								background: "var(--card-background)",
							}}
						>
							<Search className="table-header__icon" />
							<input
								aria-label="Search rows"
								value={searchValue}
								onChange={(e) => onSearch(e.target.value)}
								placeholder={searchPlaceholder}
								style={{
									width: "100%",
									border: "none",
									outline: "none",
									background: "transparent",
								}}
							/>
							{!!searchValue && (
								<button
									aria-label="Clear search"
									onClick={onClearSearch}
									className="icon-btn"
								>
									×
								</button>
							)}
						</div>
					</div>
				</div>

				<div className="table-header__right">
					{anySelected && (
						<div
							className="table-header__select-delete"
							role="status"
							aria-live="polite"
						>
							<span style={{ fontWeight: 600 }}>{selectedCount} selected</span>
							<button
								className="button--danger"
								onClick={() => onBulkDelete?.()}
								aria-disabled={loading}
							>
								Delete Selected
							</button>
						</div>
					)}

					<div className="table-header__cta-wrapper">
						<button className="table-header__button" onClick={() => onAdd?.()}>
							+ Add New Member
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
