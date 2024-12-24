const FormRadio = ({ label, name, options, value, onChange }) => (
  <div>
    <label className="block text-gray-800 font-medium">{label}</label>
    <div className="flex gap-4">
      {options.map((option) => (
        <label key={option.value} className="text-black">
          {" "}
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={value === option.value}
            onChange={onChange}
          />
          {option.label}
        </label>
      ))}
    </div>
  </div>
);

export default FormRadio;
