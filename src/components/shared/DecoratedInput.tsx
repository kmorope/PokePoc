interface IDecoratedInputProps {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  error: {
    hasError: boolean;
    message: string;
  };
  required?: boolean;
  register?: any;
}
const DecoratedInput: React.FC<IDecoratedInputProps> = ({
  name,
  label,
  type,
  placeholder,
  error,
  required,
  register,
}) => {
  return (
    <div className="form-control w-full max-w-xs">
      <label className="label">
        <span className="label-text text-sm font-medium text-gray-700 tracking-wide">
          {label}
        </span>
      </label>
      <input
        type={type || "text"}
        name={name}
        placeholder={placeholder}
        className="input input-bordered w-full max-w-xs text-base px-4 py-2"
        {...register(name, { required: required })}
      />
      {error.hasError && (
        <label className="label">
          <span className="label-text-alt text-error">{error.message}</span>
        </label>
      )}
    </div>
  );
};

export default DecoratedInput;
