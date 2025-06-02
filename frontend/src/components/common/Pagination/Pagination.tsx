import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "../../../lib/utils";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    className?: string;
    siblingCount?: number;
    disabled?: boolean;
    variant?: "pagination-primary" | "pagination-secondary" | "pagination-tertiary";
}

const Pagination: React.FC<PaginationProps> = ({
    currentPage,
    totalPages,
    onPageChange,
    className,
    siblingCount = 1,
    disabled = false,
    variant = "pagination-primary",
}) => {
    const createPageRange = () => {
        const totalNumbers = siblingCount * 2 + 5;
        const totalBlocks = totalNumbers + 2;

        if (totalPages <= totalBlocks) {
            return Array.from({ length: totalPages }, (_, i) => i + 1);
        }

        const leftSibling = Math.max(currentPage - siblingCount, 1);
        const rightSibling = Math.min(currentPage + siblingCount, totalPages);

        const showLeftDots = leftSibling > 2;
        const showRightDots = rightSibling < totalPages - 2;

        const pages = [];

        if (!showLeftDots && showRightDots) {
            const leftRange = Array.from({ length: 3 + 2 * siblingCount }, (_, i) => i + 1);
            pages.push(...leftRange, "...", totalPages);
        } else if (showLeftDots && !showRightDots) {
            const rightRange = Array.from(
                { length: 3 + 2 * siblingCount },
                (_, i) => totalPages - (3 + 2 * siblingCount) + i + 1
            );
            pages.push(1, "...", ...rightRange);
        } else if (showLeftDots && showRightDots) {
            const midRange = Array.from(
                { length: 2 * siblingCount + 1 },
                (_, i) => leftSibling + i
            );
            pages.push(1, "...", ...midRange, "...", totalPages);
        }

        return pages;
    };

    const pageRange = createPageRange();

    return (
        <div className={cn("pagination-base", className)}>
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1 || disabled}
                className={cn(variant)}
                aria-label="Previous page"
            >
                <ChevronLeft className="w-4 h-4" />
            </button>

            {pageRange.map((page, index) =>
                typeof page === "string" ? (
                    <span key={index} className="text-muted text-sm px-2">
                        {page}
                    </span>
                ) : (
                    <button
                        key={page}
                        onClick={() => onPageChange(page)}
                        disabled={disabled}
                        className={cn(
                            variant,
                            page === currentPage && "ring-2 ring-offset-2 ring-primary-500"
                        )}
                        aria-current={page === currentPage ? "page" : undefined}
                    >
                        {page}
                    </button>
                )
            )}
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages || disabled}
                className={cn(variant)}
                aria-label="Next page"
            >
                <ChevronRight className="w-4 h-4" />
            </button>

        </div>
    );
};

Pagination.displayName = "Pagination";
export { Pagination };
