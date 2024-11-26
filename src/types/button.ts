export type ButtonProps = {
    children: string,
    type: "submit" | "reset" | "button",
    onClick?: () => void,
    disabled?: boolean
}