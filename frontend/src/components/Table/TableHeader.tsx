import "./table.css";
import SearchInput from "../layout/TopNav/search-input";

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
	onAdd,
	onBulkDelete,
	anySelected = false,
	selectedCount = 0,
	loading,
	searchValue = "",
	onClearSearch,
}: Props) {
	return (
		<div
			className="tableHeader_thead"
			role="toolbar"
			aria-label="Table controls"
		>
			<div className="table-header__inner">
				<div className="table-header__left">
					<div className="table-header__select-text">Show</div>
					<select
						id="rows-per-page"
						value={String(pageSize)}
						onChange={(e) => onPageSizeChange(Number(e.target.value))}
						style={{ marginLeft: 8 }}
						className="table-header__select"
					>
						{pageSizeOptions.map((o) => (
							<option key={o} value={o}>
								{o}
							</option>
						))}
					</select>
					<div className="table-header__select-text">entries</div>
				</div>

				<div className="table-header__center" role="search">
					<div style={{ width: "100%", maxWidth: 560 }}>
						<SearchInput />

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

					<button className="table-header__button" onClick={() => onAdd?.()}>
						+ Add New Member
					</button>
				</div>
			</div>
		</div>
	);
}
