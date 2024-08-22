"use client";

export const Dummy = () => {
  const handleClick = async (event) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/demo`, {
      credentials: "include",
    });

    const res = await response;
  };

  return <button onClick={handleClick}>Check request</button>;
};
