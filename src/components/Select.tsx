import React, { useId } from "react"

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: string[]
  label?: string
  className?: string
}

const Select: React.ForwardRefRenderFunction<HTMLSelectElement, SelectProps> = (
  { options, label, className = "", ...props }: SelectProps,
  ref
) => {
  const id = useId()
  return (
    <div className="w-full">
      {label && <label htmlFor={id}>{label}</label>}
      <select
        {...props}
        name=""
        id={id}
        className={`${className} px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full`}
        ref={ref}
      >
        {options?.map((current, index) => (
          <option value={current} key={index} />
        ))}
      </select>
    </div>
  )
}

export default React.forwardRef(Select)
