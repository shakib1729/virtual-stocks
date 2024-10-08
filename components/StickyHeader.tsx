// Libs
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  CurrencyDollarIcon,
  UserIcon,
  ArrowRightOnRectangleIcon,
  GlobeAltIcon,
  ChartBarIcon,
  ChartPieIcon,
} from "@heroicons/react/24/outline";

// Hooks
import { useUser } from "@/hooks/useUser";

const NavLink = ({
  href,
  Icon,
  title,
}: {
  href: string;
  Icon: typeof CurrencyDollarIcon;
  title: string;
}) => (
  <Link
    href={href}
    className="w-32 px-4 py-2 rounded-md text-purple-600 border border-purple-200 hover:border-purple-400 transition duration-200 ease-in-out"
  >
    <Icon className="h-5 w-5 inline-block mr-1" />
    {title}
  </Link>
);

export const StickyHeader = () => {
  const { user } = useUser();
  const { push } = useRouter();
  const pathname = usePathname();

  const handleLogOut = async () => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {
      credentials: "include",
    }).then(() => push("/"));
  };

  const isExplorePage = pathname === "/dashboard";

  const { balance, name, email } = user ?? {};

  return (
    <header className="sticky top-0 z-10 bg-white shadow-md py-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between">
          <div className="flex items-center space-x-4 mb-2 sm:mb-0">
            <ChartPieIcon className="h-8 w-8 text-purple-500" />
            <h1 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              Virtual Stocks
            </h1>
          </div>
          <div className="flex flex-wrap items-center space-x-2 sm:space-x-4">
            <div className="flex items-center bg-green-100 px-3 py-1 rounded-md">
              <CurrencyDollarIcon className="h-5 w-5 text-green-500 mr-1" />
              <span className="font-semibold text-green-700">
                ${balance?.toFixed(2)}
              </span>
            </div>
            {isExplorePage ? (
              <NavLink
                href="/dashboard/portfolio"
                Icon={ChartBarIcon}
                title="Portfolio"
              />
            ) : (
              <NavLink href="/dashboard" Icon={GlobeAltIcon} title="Explore" />
            )}
            <div className="flex items-center space-x-2">
              <UserIcon className="h-5 w-5 text-gray-500" />
              <div className="flex flex-col">
                <span className="font-semibold text-sm text-gray-700">
                  {name}
                </span>
                <span className="text-xs text-gray-500">{email}</span>
              </div>
            </div>
            <button
              className="p-2 rounded-md text-gray-600 hover:bg-gray-100 transition duration-200 ease-in-out"
              onClick={handleLogOut}
            >
              <ArrowRightOnRectangleIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
