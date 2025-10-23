export const BUTTON_VARIANTS = {
    PRIMARY: "primary",
    SECONDARY: "secondary",
    DANGER: "danger",
} as const;

export const VARIANT_CLASSES = {
    base: "w-full py-2 rounded font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2",
    primary:
        "bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500 disabled:bg-blue-300",
    secondary:
        "bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-400 disabled:bg-gray-100",
    danger: "bg-red-500 text-white hover:bg-red-600 focus:ring-red-500 disabled:bg-red-300",
};

export type ButtonVariants =
    (typeof BUTTON_VARIANTS)[keyof typeof BUTTON_VARIANTS];

export type VariantClasses =
    (typeof VARIANT_CLASSES)[keyof typeof VARIANT_CLASSES];
