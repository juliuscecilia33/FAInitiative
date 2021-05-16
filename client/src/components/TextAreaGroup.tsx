import classNames from "classnames";

interface TextAreaGroupProps {
  placeholder: string;
  value: string;
  error: string | undefined;
  setValue: (str: string) => void;
}

const TextAreaGroup: React.FC<TextAreaGroupProps> = ({
  placeholder,
  value,
  error,
  setValue,
}) => {
  return (
    <div className="w-11/12 mb-12">
      <textarea
        style={{ resize: "none" }}
        placeholder={placeholder}
        className={classNames(
          "mb-1 transition duration-200 w-full px-6 py-24 border rounded-3xl outline-none bg-secondary font-body focus:bg-white hover:bg-white",
          { "border-red-500": error }
        )}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <small className="font-medium text-red-600">{error}</small>
    </div>
  );
};

export default TextAreaGroup;
