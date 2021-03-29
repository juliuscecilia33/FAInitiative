import classNames from "classnames";

interface InputGroupProps {
  type: string;
  placeholder: string;
  value: string;
  error: string | undefined;
  setValue: (str: string) => void;
}

const InputGroup: React.FC<InputGroupProps> = ({
  type,
  placeholder,
  value,
  error,
  setValue,
}) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className={classNames(
        "transition duration-200 w-11/12 px-6 py-3 border rounded-full outline-none mb-14 bg-secondary font-body focus:bg-white hover:bg-white",
        { "border-red-500": error }
      )}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

export default InputGroup;
