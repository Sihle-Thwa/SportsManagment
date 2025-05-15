import React from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'tertiary';
    size?: 'small' | 'medium' | 'large';
    withIcon?: boolean;
    iconPosition?: 'left' | 'right';
    fullWidth?: boolean;
    className?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            children,
            variant = 'primary',
            size = 'default',
            withIcon = false,
            iconPosition = 'left',
            fullWidth = false,
            className,
            ...props
        },
        ref
    )
) => {
    const getVariantStyles = () => {
        
    }
}