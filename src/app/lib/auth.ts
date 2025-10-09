type Role = "User" | "Admin";

export async function postLogin(username: string, password: string) {
  try {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Login failed");
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Login error:", err);
    throw err;
  }
}

export async function postRegister(
  username: string,
  password: string,
  role: Role,
) {
  console.log("run register");
  try {
    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
        role,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Registration failed");
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Registration error:", err);
    throw err;
  }
}

export async function getProfile() {
  try {
    const token = localStorage.getItem("authToken");

    const response = await fetch("/api/auth/profile", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to get profile");
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Get profile error:", err);
    throw err;
  }
}

export type { Role };
