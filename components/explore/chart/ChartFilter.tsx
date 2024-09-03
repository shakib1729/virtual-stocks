type Props = { text: string; isActive: boolean; onClick: () => void };

export const ChartFilter = ({ text, isActive, onClick }: Props) => {
  return (
    <button
      onClick={onClick}
      className={`w-20 m-2 h-8 border-1 flex items-center justify-center cursor-pointer transition duration-100 ease-in-out py-2 px-4 rounded-md bg-gradient-to-r hover:from-purple-400 hover:to-pink-400 hover:text-white ${
        isActive
          ? "from-purple-400 to-pink-400 text-white hover:from-purple-500 hover:to-pink-500 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-50"
          : "border-indigo-300 text-purple-700"
      }`}
    >
      {text}
    </button>
  );
};
