import React, { useMemo, useState, useEffect } from "react";
import { getPlayersTableData } from "../../routes/playersmockdata";
import "./playerspagetable.css";

type Props = {
  selectedId?: string;
  onSelect?: (id: string) => void;
};

export default function PlayersPageTable({ selectedId, onSelect }: Props) {
  const players = useMemo(() => getPlayersTableData(), []);
  const [localSelected, setLocalSelected] = useState<string | null>(
    selectedId ?? null
  );

  // Pagination state
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(players.length / itemsPerPage);

  // Calculate paginated data
  const paginatedPlayers = useMemo(() => {
    const startIndex = currentPage * itemsPerPage;
    return players.slice(startIndex, startIndex + itemsPerPage);
  }, [players, currentPage]);

  // sync prop -> local
  useEffect(() => setLocalSelected(selectedId ?? null), [selectedId]);

  // Reset to first page if selected player is not in current page
  useEffect(() => {
    if (localSelected) {
      const selectedPlayerIndex = players.findIndex(
        (p) => p.id === localSelected
      );
      if (selectedPlayerIndex !== -1) {
        const pageOfSelectedPlayer = Math.floor(
          selectedPlayerIndex / itemsPerPage
        );
        if (pageOfSelectedPlayer !== currentPage) {
          setCurrentPage(pageOfSelectedPlayer);
        }
      }
    }
  }, [localSelected, players, currentPage]);

  function handleRowClick(id: string) {
    const next = localSelected === id ? null : id;
    setLocalSelected(next);
    onSelect?.(next ?? "");
  }

  // Pagination handlers
  function goToPage(page: number) {
    setCurrentPage(Math.max(0, Math.min(totalPages - 1, page)));
  }

  function goToNextPage() {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  }

  function goToPreviousPage() {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  }

  // Generate page numbers to display (with ellipsis for large page counts)
  function getVisiblePages() {
    const maxVisible = 5;
    const pages: (number | string)[] = [];

    if (totalPages <= maxVisible) {
      // Show all pages if total is small
      for (let i = 0; i < totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(0);

      if (currentPage > 2) {
        pages.push("...");
      }

      // Show current page and neighbors
      const start = Math.max(1, currentPage - 1);
      const end = Math.min(totalPages - 2, currentPage + 1);

      for (let i = start; i <= end; i++) {
        if (!pages.includes(i)) {
          pages.push(i);
        }
      }

      if (currentPage < totalPages - 3) {
        pages.push("...");
      }

      // Always show last page
      if (!pages.includes(totalPages - 1)) {
        pages.push(totalPages - 1);
      }
    }

    return pages;
  }

  // keyboard: allow up/down + Enter to select
  function onRowKeyDown(e: React.KeyboardEvent, index: number) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleRowClick(paginatedPlayers[index].id);
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = Math.min(paginatedPlayers.length - 1, index + 1);
      const el = document.querySelector<HTMLTableRowElement>(
        `tr[data-row-index="${next}"]`
      );
      el?.focus();
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      const prev = Math.max(0, index - 1);
      const el = document.querySelector<HTMLTableRowElement>(
        `tr[data-row-index="${prev}"]`
      );
      el?.focus();
    }
  }

  // Keyboard navigation for pagination
  function onPaginationKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      goToPreviousPage();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      goToNextPage();
    } else if (e.key === "Home") {
      e.preventDefault();
      goToPage(0);
    } else if (e.key === "End") {
      e.preventDefault();
      goToPage(totalPages - 1);
    }
  }

  return (
    <div className="playersPageTableWrapper">
      <table
        className="playersPageTable"
        role="table"
        aria-label="Players list"
      >
        <thead className="playersPageTable_tableHeader ">
          <tr className="playersPageTable_tableHeader-row">
            <th
              role="columnheader"
              className="playersPageTable_tableHeader-cell"
            >
              First Name
            </th>
            <th
              role="columnheader"
              className="playersPageTable_tableHeader-cell"
            >
              Last Name
            </th>
            <th
              role="columnheader"
              className="playersPageTable_tableHeader-cell"
            >
              Status
            </th>
          </tr>
        </thead>

        <tbody className="playersPageTable_tableBody ">
          {paginatedPlayers.map((p, i) => {
            const isSelected = localSelected === p.id;
            return (
              <tr
                key={p.id}
                data-row-index={i}
                tabIndex={0}
                role="row"
                aria-selected={isSelected}
                className={`playersPageTable_tableBody-row  ${
                  isSelected ? "is-selected" : ""
                }`}
                onClick={() => handleRowClick(p.id)}
                onKeyDown={(e) => onRowKeyDown(e, i)}
              >
                <td role="cell" className="playersPageTable_tableBody-cell">
                  {p.firstName}
                </td>
                <td role="cell" className="playersPageTable_tableBody-cell">
                  {p.lastName}
                </td>
                <td role="cell" className="playersPageTable_tableBody-cell">
                  {p.status}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div
          className="playersPageTable_pagination"
          onKeyDown={onPaginationKeyDown}
        >
          <div className="pagination-info">
            Showing {currentPage * itemsPerPage + 1} to{" "}
            {Math.min((currentPage + 1) * itemsPerPage, players.length)} of{" "}
            {players.length} players
          </div>
          <div className="pagination-controls">
            <button
              type="button"
              className="pagination-btn"
              onClick={goToPreviousPage}
              disabled={currentPage === 0}
              aria-label="Previous page"
            >
              Prev
            </button>

            <div className="pagination-pages">
              {getVisiblePages().map((page, index) => {
                if (page === "...") {
                  return (
                    <span
                      key={`ellipsis-${index}`}
                      className="pagination-ellipsis"
                    >
                      …
                    </span>
                  );
                }

                const pageNumber = page as number;
                return (
                  <button
                    key={pageNumber}
                    type="button"
                    className={`pagination-page ${
                      pageNumber === currentPage ? "active" : ""
                    }`}
                    onClick={() => goToPage(pageNumber)}
                    aria-label={`Go to page ${pageNumber + 1}`}
                    aria-current={
                      pageNumber === currentPage ? "page" : undefined
                    }
                  >
                    {pageNumber + 1}
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              className="pagination-btn"
              onClick={goToNextPage}
              disabled={currentPage === totalPages - 1}
              aria-label="Next page"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
