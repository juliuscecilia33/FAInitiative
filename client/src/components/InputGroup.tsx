import classNames from "classnames";

interface InputGroupProps {
  type: string;
  placeholder: string;
  value: string;
  error: string | undefined;
  setValue: (str: string) => void;
  maxLength: number;
}

const InputGroup: React.FC<InputGroupProps> = ({
  maxLength,
  type,
  placeholder,
  value,
  error,
  setValue,
}) => {
  return (
    <div className="w-11/12">
      <input
        type={type}
        placeholder={placeholder}
        className={classNames(
          "mb-1 transition duration-200 w-full px-6 py-4 border rounded-full outline-none bg-secondary font-body focus:bg-white hover:bg-white",
          { "border-red-500": error }
        )}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        maxLength={maxLength}
      />
      <small className="font-medium text-red-600">{error}</small>
    </div>
  );
};

export default InputGroup;
