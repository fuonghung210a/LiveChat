type InputVariant =
    | "text"
    | "password"
    | "email"
    | "file"
    | "checkbox"
    | "radio";

export interface InputProps
    extends Omit<
        React.InputHTMLAttributes<HTMLInputElement>,
        "type" | "onChange" | "onBlur"
    > {
    variant?: InputVariant;
    label?: string;
    value?: string;
    placeholder?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
    className?: string;
}
