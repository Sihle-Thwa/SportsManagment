interface EmptyStateProps {
	message?: string;
	icon?: React.ReactNode;
	className?: string;
}

export function EmptyState({
	message = "No results found.",
	icon,
	className = "",
}: EmptyStateProps) {
	return (
		<div className={`table-empty-state ${className}`}>
			{icon && <div className="mb-2 text-3xl">{icon}</div>}
			<p>{message}</p>
		</div>
	);
}
EmptyState.displayName = "TableEmptyState";
export default EmptyState;
