"use client";

// Libs
import { useState, useEffect, useMemo, ReactNode } from "react";

// Components
import { StickyHeader } from "@/components/StickyHeader";
import { Footer } from "@/components/Footer";

// Contexts
import UserContext from "@/context/UserContext";

// Types
import type { User } from "@/types";

export default function Layout({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | undefined>();

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user`, {
        credentials: "include",
      });
      const userData = await response.json();
      setUser(userData);
    };

    fetchUser();
  }, []);

  const userContextValue = useMemo(() => ({ user, setUser }), [user, setUser]);

  return (
    <div className="h-screen bg-gradient-to-br from-purple-100/70 to-pink-100/70">
      <UserContext.Provider value={userContextValue}>
        <StickyHeader />
        {user ? children : null}
        <Footer />
      </UserContext.Provider>
    </div>
  );
}
