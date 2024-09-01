import { Search } from "@/components/header/Search";

export const Header = ({ name = "Select a stock", user }) => {
  return (
    <div className="xl-px-32">
      <h1 className="text-5xl">{name}</h1>
      <h1>{user.name}</h1>
      <h1>{user.email}</h1>
      <h1>{user.balance?.toFixed(2)}</h1>
      <Search />
    </div>
  );
};
