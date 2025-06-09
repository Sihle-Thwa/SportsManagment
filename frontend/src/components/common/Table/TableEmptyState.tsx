interface EmptyStateProps {
    message?: string;
    icon?: React.ReactNode;
    className?: string;
}

export function EmptyState({
    message = "No results found.",
    icon,
    className = ""
}: EmptyStateProps) {
    return (
        <div className={`text-center py-8 px-4 text-muted ${className}`}>
            {icon && <div className="mb-2 text-3xl">{icon}</div>}
            <p >{message}</p>
        </div >
    );
}
