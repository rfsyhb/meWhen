import { useState } from 'react';

interface InputFieldProps {
  id: string;
  label: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({
  id,
  label,
  type,
  value,
  onChange,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <label htmlFor={id} className="font-semibold flex flex-row gap-2 group">
      <span className="w-[30%] group-hover:translate-x-3">{label}</span>
      <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        className={`w-[70%] rounded-md bg-cardMain shadow-sm p-1 border border-black border-opacity-20 font-normal group-hover:border-opacity-70 ${isHovered ? 'outline outline-1 outline-green-600' : 'outline-none'}`}
        onMouseOver={() => setIsHovered(true)}
        onMouseOut={() => setIsHovered(false)}
        required
      />
    </label>
  );
};

export default InputField;
