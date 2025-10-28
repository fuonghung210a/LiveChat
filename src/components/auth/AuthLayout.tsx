"use client";

import clsx from "clsx";
import type { PropsWithChildren } from "react";

type AuthLayoutProps = PropsWithChildren<{
    className?: string;
}>;

export default function AuthLayout({
    children,
    className,
}: AuthLayoutProps) {
    return (
        <div
            className={clsx(
                "flex items-center justify-center min-h-screen",
                className,
            )}
        >
            {children}
        </div>
    );
}
