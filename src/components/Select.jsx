function Select({
    label,
    name,
    value,
    onChange,
    children,
    className = "",
    required = false,
    disabled = false
}) {

    return (

        <div className="space-y-2">

            {
                label && (

                    <label
                        htmlFor={name}
                        className="
                            block
                            text-lg
                            font-medium
                            text-slate-700
                        "
                    >
                        {label}
                    </label>

                )
            }

            <select
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                required={required}
                disabled={disabled}
                className={`
                    w-full
                    rounded-xl
                    border
                    border-slate-300
                    bg-white
                    px-4
                    py-3
                    outline-none
                    transition
                    focus:border-blue-500
                    focus:ring-2
                    focus:ring-blue-200
                    disabled:bg-slate-100
                    disabled:cursor-not-allowed
                    ${className}
                `}
            >
                {children}
            </select>

        </div>

    );
}

export default Select;