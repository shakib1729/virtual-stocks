"use client";

// Libs
import type { MouseEvent } from "react";

export const LogIn = () => {
  const handleSubmit = async (event: MouseEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formValues = Array.from(formData.entries()).reduce(
      (acc, [key, value]) => {
        acc[key] = value;
        return acc;
      },
      {} as Record<string, FormDataEntryValue>,
    );

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/authenticate`,
      {
        method: "POST",
        body: JSON.stringify(formValues),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      },
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" placeholder="Email" />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" />
      </div>
      <button type="submit">Sign In</button>
    </form>
  );
};
