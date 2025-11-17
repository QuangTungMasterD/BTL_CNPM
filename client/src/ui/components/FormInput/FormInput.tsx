function FormInput({
  label,
  name,
  id,
  type = "text",
  require,
  place,
  message = '',
  value = '',
  onChange
}: {
  label?: string;
  name: string;
  id: string;
  type?: "text" | "password" | "email" | "hidden";
  require: boolean;
  place: string;
  message?: string;
  value?: string;
  onChange?: any
}) {
  return (
    <div className="flex flex-col w-[400px] nth-[n+2]:mt-4">
      <label htmlFor={id} className="text-gray-600">
        {label}
      </label>
      <input
        type={type}
        onChange={onChange}
        className="mt-1 mb-1 border border-[2px] border-gray-500 px-4 py-2 rounded-lg focus:outline-[var(--primary-color)]"
        name={name}
        value={value}
        placeholder={place}
        id={id}
        required={require}
      />
      <p className="text-red-600 text-sm">{message}</p>
    </div>
  );
}

export default FormInput;
