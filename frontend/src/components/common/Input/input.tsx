import * as React from "react";

import { cn } from "../../../lib/utils";
import { LucideIcon } from "lucide-react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  startIcon?: LucideIcon;
  endIcon?: LucideIcon;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, startIcon, endIcon, ...props }, ref) => {
    const StartIcon = startIcon;
    const EndIcon = endIcon;

    return (
      <div className="relative flex w-full items-center h-lg ">
        {StartIcon && (
          <div className="absolute left-1.5 top-1/2 transform -translate-y-1/2">
            <StartIcon className="icon-base" />
          </div>
        )}
        <input
          type={type}
          className={cn(
            "input",
            startIcon ? "pl-12" : "",
            endIcon ? "pr-12" : "",
            className
          )}
          ref={ref}
          {...props}
        />
        {EndIcon && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <EndIcon className="icon-base" />
          </div>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
