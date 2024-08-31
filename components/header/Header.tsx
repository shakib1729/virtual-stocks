import { Search } from "@/components/header/Search";

export const Header = ({ name = "Select a stock" }) => {
  return (
    <div className="xl-px-32">
      <h1 className="text-5xl">{name}</h1>
      <Search />
    </div>
  );
};
