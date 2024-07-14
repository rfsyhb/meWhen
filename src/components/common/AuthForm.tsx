interface AuthFormProps {
  onSubmit: (e: React.FormEvent) => void;
  children: React.ReactNode;
  formUsage: string;
}

const AuthForm: React.FC<AuthFormProps> = ({
  onSubmit,
  children,
  formUsage,
}) => (
  <form className="flex flex-col w-[70%] gap-3" onSubmit={onSubmit}>
    {children}
    <button
      type="submit"
      className="rounded-lg shadow-sm hover:shadow-md border border-black"
    >
      <span className="flex justify-end p-1 pr-3">{formUsage}</span>
    </button>
  </form>
);

export default AuthForm;
