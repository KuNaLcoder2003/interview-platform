
import type React from "react";

interface Props {
    className: string,
    text: string,
}

const Button: React.FC<Props> = ({ className, text }) => {
    return (
        <button className={`${className}`}>
            {text}
        </button>
    )
}

export default Button;