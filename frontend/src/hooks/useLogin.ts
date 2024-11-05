// hooks/useLogin.ts
import { useState } from "react";

export const useLogin = () => {
  const [error, setError] = useState<string>("");

  const login = async (privateKey: string) => {
    try {
      const response = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "accept": "application/json",
        },
        body: JSON.stringify({ private_key: privateKey }),
      });

      if (!response.ok) {
        throw new Error("Failed to log in. Please check your private key.");
      }

      const data = await response.json();
      const { access_token } = data;

      // Cache the token for future use
      localStorage.setItem("access_token", access_token);

      return true; // Indicate success
    } catch (error: any) {
      setError(error.message); // Set the error message
      return false; // Indicate failure
    }
  };

  return { error, login };
};
