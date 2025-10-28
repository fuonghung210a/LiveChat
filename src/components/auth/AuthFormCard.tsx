"use client";

import clsx from "clsx";
import type { FormHTMLAttributes, PropsWithChildren } from "react";

type AuthFormCardProps = PropsWithChildren<{
    onSubmit?: FormHTMLAttributes<HTMLFormElement>["onSubmit"];
    className?: string;
}>;

export default function AuthFormCard({
    children,
    onSubmit,
    className,
}: AuthFormCardProps) {
    return (
        <form
            onSubmit={onSubmit}
            className={clsx("p-6 rounded-2xl shadow-md w-96 bg-gray-50", className)}
        >
            {children}
        </form>
    );
}
