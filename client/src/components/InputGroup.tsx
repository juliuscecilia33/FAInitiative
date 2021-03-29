import classNames from "classnames";

interface InputGroupProps {
  className?: string;
  type: string;
  placeholder: string;
  value: string;
  error: string | undefined;
  setValue: (str: string) => void;
}

const InputGroup: React.FC<InputGroupProps> = ({
  className,
  type,
  placeholder,
  value,
  error,
  setValue,
}) => {
  return (
    <input
      placeholder="Email"
      className="w-11/12 px-6 py-3 border rounded-full outline-none mb-14 bg-secondary font-body"
    />
  );
};

export default InputGroup;
