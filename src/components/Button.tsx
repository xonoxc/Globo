import React from "react"


enum ButtonType {
	Button = "button",
	Submit = "submit",
	Reset = "reset"
}


interface ButtonProps {
	children: React.ReactNode
	type?: ButtonType;
	textColor?: string
	bgColor?: string
	className?: string
}

const Button = ({
	children,
	type = "button",
	textColor = "text-white",
	bgColor = "bg-blue-600",
	className = '',
	...props
}: ButtonProps) => {
	return (
		<button type={type} {...props} className={`px-4 py-2 rounded-lg ${bgColor} ${textColor} ${className}`} >
			{children}
		</button>
	)
}

export default Button
