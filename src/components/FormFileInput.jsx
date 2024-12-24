const FormFileInput = ({ label, name, onChange, error }) => (
  <div>
    <label htmlFor={name} className="block text-gray-800 font-medium">
      {label}
    </label>
    <input
      type="file"
      id={name}
      name={name}
      onChange={onChange}
      className="mt-1"
      accept="image/jpeg, image/png, image/jpg"
    />
    {error && <p className="text-red-500 text-sm">{error}</p>}
  </div>
);

export default FormFileInput;
