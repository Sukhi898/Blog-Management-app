const FormInput = ({
  label,
  name,
  value,
  onChange,
  error,
  type = "text",
  placeholder,
}) => (
  <div>
    <label htmlFor={name} className="block text-gray-800 font-medium">
      {label}
    </label>
    {type === "textarea" ? (
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full mt-1 p-2 border rounded focus:ring-2 focus:ring-blue-400 text-black"
        placeholder={placeholder}
      />
    ) : (
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full mt-1 p-2 border rounded focus:ring-2 focus:ring-blue-400 text-black"
        placeholder={placeholder}
      />
    )}
    {error && <p className="text-red-500 text-sm">{error}</p>}
  </div>
);

export default FormInput;
