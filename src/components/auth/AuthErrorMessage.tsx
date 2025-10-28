"use client";

import clsx from "clsx";

interface AuthErrorMessageProps {
    message?: string;
    className?: string;
}

export default function AuthErrorMessage({
    message,
    className,
}: AuthErrorMessageProps) {
    if (!message) {
        return null;
    }

    return <p className={clsx("text-red-500 text-sm", className)}>{message}</p>;
}
