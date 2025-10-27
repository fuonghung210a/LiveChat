"use client";

import { InputProps } from "@/src/types/components";
import clsx from "clsx";
import { useState } from "react";

export default function Input({
    variant = "text",
    label,
    value,
    onChange,
    onBlur,
    placeholder,
    className,
    ...props
}: InputProps) {
    const [showPassword, setShowPassword] = useState(false);

    const inputType =
        variant === "password"
            ? showPassword
                ? "text"
                : "password"
            : variant === "email"
              ? "email"
              : variant === "file"
                ? "file"
                : variant === "checkbox"
                  ? "checkbox"
                  : variant === "radio"
                    ? "radio"
                    : "text";

    return (
        <div className={clsx("flex flex-col gap-1", className)}>
            {label && (
                <label className="text-md font-bold text-gray-700 pl-0.5">
                    {label}
                </label>
            )}

            {
                <div className="relative flex items-center">
                    <input
                        type={inputType}
                        placeholder={placeholder}
                        value={
                            variant !== "file" &&
                            variant !== "checkbox" &&
                            variant !== "radio"
                                ? value
                                : undefined
                        }
                        onChange={(e) => onChange?.(e)}
                        onBlur={(e) => onBlur?.(e)}
                        className={clsx(
                            "border border-gray-300 rounded-lg px-3 py-2 my-2 w-full focus:ring-2 focus:ring-blue-500",
                            variant === "checkbox" || variant === "radio"
                                ? "w-auto h-4 mr-2 cursor-pointer"
                                : "",
                        )}
                        {...props}
                    />

                    {variant === "password" && (
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 text-gray-500 text-sm hover:text-gray-700"
                        >
                            {showPassword ? "🙈" : "👁️"}
                        </button>
                    )}
                </div>
            }
        </div>
    );
}
