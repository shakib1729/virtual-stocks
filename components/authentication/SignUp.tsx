"use client";

export const SignUp = () => {
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formValues = Array.from(formData.entries()).reduce(
      (acc, [key, value]) => {
        acc[key] = value;
        return acc;
      },
      {},
    );

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
      {
        method: "POST",
        body: JSON.stringify(formValues),
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="firstName">firstName</label>
        <input id="firstName" name="firstName" placeholder="Name" />
      </div>
      <div>
        <label htmlFor="lastName">lastName</label>
        <input id="lastName" name="lastName" placeholder="Name" />
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" placeholder="Email" />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" />
      </div>
      <button type="submit">Sign Up</button>
    </form>
  );
};
