import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function resolveCellValue<T>(item: T, accessorKey: keyof T): React.ReactNode {
  return item[accessorKey] as React.ReactNode;
}
