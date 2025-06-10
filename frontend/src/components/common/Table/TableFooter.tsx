import { TablePagination } from './TablePagination';

interface FooterProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export function TableFooter({ currentPage, totalPages, onPageChange }: FooterProps) {
    return (
        <div className="table-footer">
            <TablePagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={onPageChange}
            />
        </div>
    );
}
