import { useState, useEffect } from "react";

export const useUser = () => {
  const [user, setUser] = useState(null);

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

  return { user, setUser };
};
