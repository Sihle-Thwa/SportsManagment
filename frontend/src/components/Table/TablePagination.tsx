import React from "react";
import "../../styles/components/table.css";
import clsx from "clsx";

export type TablePaginationProps = {
  pageIndex: number;
  pageCount: number;
  pageSize: number;
  totalItems: number;
  onPageChange: (pageIndex: number) => void;
};

function getPageRange(current: number, total: number, sib = 1) {
  const start = Math.max(0, current - sib);
  const end = Math.min(total - 1, current + sib);
  const arr: number[] = [];
  for (let i = start; i <= end; i++) arr.push(i);
  return arr;
}

export default function TablePagination({
  pageIndex,
  pageCount,
  pageSize,
  totalItems,
  onPageChange,
}: TablePaginationProps): React.JSX.Element {
  const siblingCount = 1;

  // Calculate pagination display
  const pages = getPageRange(pageIndex, pageCount, siblingCount);
  const prevDisabled = pageIndex <= 0;
  const nextDisabled = pageIndex >= pageCount - 1;

  // Calculate showing range
  const startItem = pageIndex * pageSize + 1;
  const endItem = Math.min((pageIndex + 1) * pageSize, totalItems);

  if (pageCount <= 1) {
    return (
      <div className="pager" role="navigation" aria-label="Table pagination">
        <span className="pager-info">
          Showing {totalItems > 0 ? startItem : 0} to {endItem} of {totalItems}{" "}
          entries
        </span>
      </div>
    );
  }

  return (
    <nav
      className="pager"
      role="navigation"
      aria-label="Table pagination"
      aria-live="polite"
    >
      <div className="pager-controls">
        <button
          type="button"
          className="pager-link_prev"
          onClick={() => onPageChange(pageIndex - 1)}
          aria-label="Previous page"
          disabled={prevDisabled}
        >
          Prev
        </button>

        <div className="pager-pages" role="list">
          {pageIndex - siblingCount > 1 && (
            <>
              <button
                type="button"
                className="pager-page"
                onClick={() => onPageChange(0)}
                aria-label={`Go to page 1`}
              >
                1
              </button>
              <span aria-hidden>…</span>
            </>
          )}

          {pages.map((p) => (
            <button
              key={p}
              type="button"
              role="listitem"
              className={clsx("pager-page", { active: p === pageIndex })}
              onClick={() => onPageChange(p)}
              aria-current={p === pageIndex ? "page" : undefined}
              aria-label={`Go to page ${p + 1}`}
            >
              {p + 1}
            </button>
          ))}

          {pageIndex + siblingCount < pageCount - 2 && (
            <>
              <span aria-hidden>…</span>
              <button
                type="button"
                className="pager-page"
                onClick={() => onPageChange(pageCount - 1)}
                aria-label={`Go to page ${pageCount}`}
              >
                {pageCount}
              </button>
            </>
          )}
        </div>

        <button
          type="button"
          className="pager-link-next"
          onClick={() => onPageChange(pageIndex + 1)}
          aria-label="Next page"
          disabled={nextDisabled}
        >
          Next
        </button>
      </div>
    </nav>
  );
}
