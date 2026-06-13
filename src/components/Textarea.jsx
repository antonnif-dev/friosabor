function Textarea({
    label,
    name,
    value,
    onChange,
    placeholder = "",
    rows = 4,
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

            <textarea
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                rows={rows}
                required={required}
                disabled={disabled}
                className={`
                    w-full
                    rounded-xl
                    border
                    border-slate-300
                    px-4
                    py-3
                    outline-none
                    transition
                    resize-none
                    focus:border-blue-500
                    focus:ring-2
                    focus:ring-blue-200
                    disabled:bg-slate-100
                    disabled:cursor-not-allowed
                    ${className}
                `}
            />

        </div>

    );
}

export default Textarea;