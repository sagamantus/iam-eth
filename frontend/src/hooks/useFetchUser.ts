// hooks/useFetchUser.ts
import { useEffect, useState } from "react";

const useFetchUser = (token: string | null) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchUserDetails = async () => {
      setLoading(true); // Set loading state
      try {
        const response = await fetch("http://localhost:8000/users/me", {
          headers: {
            "Authorization": token || "",
            "accept": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user details.");
        }

        const userData = await response.json();
        setUser(userData); // Set the user details in state
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false); // Set loading to false after fetch
      }
    };

    if (token) {
      fetchUserDetails(); // Fetch user details only if the token exists
    }
  }, [token]);

  return { user, loading, error };
};

export default useFetchUser;
