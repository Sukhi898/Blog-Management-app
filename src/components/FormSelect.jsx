const FormSelect = ({ label, name, value, options, onChange, error }) => (
  <div>
    <label htmlFor={name} className="block text-gray-800 font-medium">
      {label}
    </label>
    <select
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full mt-1 p-2 border rounded focus:ring-2 focus:ring-blue-400 text-black"
    >
      <option value="">Select Category</option>
      {options.map((category) => (
        <option key={category} value={category}>
          {category}
        </option>
      ))}
    </select>
    {error && <p className="text-red-500 text-sm">{error}</p>}
  </div>
);

export default FormSelect;
