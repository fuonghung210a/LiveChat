"use client";

import React from "react";
import clsx from "clsx";
import {
    BUTTON_VARIANTS,
    VARIANT_CLASSES,
    type ButtonVariants,
} from "@/src/constants/button";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: ButtonVariants;
    loading?: boolean;
};

export default function Button({
    children,
    variant = BUTTON_VARIANTS.PRIMARY,
    loading = false,
    className,
    ...props
}: ButtonProps) {
    return (
        <button
            className={clsx(
                VARIANT_CLASSES.base,
                VARIANT_CLASSES[variant],
                className,
            )}
            disabled={loading || props.disabled}
            {...props}
        >
            {loading ? "Loading..." : children}
        </button>
    );
}
