export async function signupUser(data) {
  const res = await fetch("https://backend-url.com/api/auth/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
    credentials: "include", // important if backend sends cookies
  });

  if (!res.ok) {
    throw new Error("Signup failed");
  }

  return await res.json();
}
