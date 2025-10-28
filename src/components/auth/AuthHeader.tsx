"use client";

import clsx from "clsx";
import Image from "next/image";
import type { PropsWithChildren } from "react";

interface AuthHeaderProps extends PropsWithChildren {
    title: string;
    description?: string;
    logoSrc?: string;
    logoAlt?: string;
}

export default function AuthHeader({
    title,
    description,
    logoSrc,
    logoAlt,
    children,
}: AuthHeaderProps) {
    return (
        <div className="flex items-center flex-col justify-center pb-5 text-center">
            {logoSrc ? (
                <Image src={logoSrc} width={100} height={100} alt={logoAlt || title} />
            ) : null}
            <h1
                className={clsx("text-xl font-bold mb-4", logoSrc && "mt-4")}
            >
                {title}
            </h1>
            {description ? (
                <p className="text-sm text-gray-500">{description}</p>
            ) : null}
            {children}
        </div>
    );
}
