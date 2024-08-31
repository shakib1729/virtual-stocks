export const Card = ({ children, className }) => {
  return (
    <div
      className={`w-full h-full rounded-md relative p-8 border-2 bg-white border-neutral-200 ${className}`}
    >
      {children}
    </div>
  );
};
