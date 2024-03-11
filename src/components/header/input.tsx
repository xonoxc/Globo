
import React, { useId } from 'react'

interface InputProps {
	label: string
	type?: string
	className: string
}

const Input = React.forwardRef<HTMLDivElement, InputProps>(const Input = ({
	label,
	type = "text",
	className = "",
	...props
}, ref) => {
	const id: string = useId()

	return (
		<div className="w-full">
			{label && <label htmlFor={id} className='inline-block mb-1'>{label}</label>}
			<input type={type}
				className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
				{...props}
				ref={ref}
				id={id}
			/>
		</div>
	)

})

export default Input
