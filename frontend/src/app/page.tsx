"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation"; // Import useRouter for navigation
import styles from "./page.module.scss";
import ProfileCard from "@/components/ProfileCard/ProfileCard";
import UserCard from "@/components/UserCard/UserCard"; // Import the UserCard component
import useFetchUsers from "@/hooks/useFetchUsers"; // Import the custom hook
import useFetchUser from "@/hooks/useFetchUser"; // Import the new custom hook

export default function Home() {
  const router = useRouter(); // Initialize the router for navigation
  const token = localStorage.getItem("access_token"); // Retrieve the token from local storage

  // Redirect to login if no token is found
  useEffect(() => {
    if (!token) {
      router.push("/login"); // Redirect to login page
    }
  }, [token, router]);

  // Use the custom hook to fetch user details
  const { user, loading: userLoading, error: userError } = useFetchUser(token);
  const { users, loading: usersLoading, error: usersError } = useFetchUsers(token || ""); // Use the custom hook with an empty string fallback

  const handleEditRole = async (address: string, newRole: number) => {
    try {
      const response = await fetch("http://localhost:8000/users/update-role", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": token || "", // Use the token from local storage
          "accept": "application/json",
        },
        body: JSON.stringify({
          user_address: address,
          role_level: newRole,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update user role.");
      }

      const data = await response.json();
      console.log("Role updated successfully:", data);
      // Optionally, refresh the users list or provide feedback to the user
    } catch (error: any) {
      console.error("Error updating role:", error.message);
    }
  };

  // Filter out the logged-in user from the users list
  const filteredUsers = users.filter((u) => u.address !== user?.address);

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        {userLoading ? (
          <p>Loading user profile...</p>
        ) : userError ? (
          <p>Error: {userError}</p>
        ) : user ? (
          <section className={styles.profileSection}>
            <ProfileCard user={user} /> {/* Pass the fetched user data */}
          </section>
        ) : null}

        <section className={styles.usersSection}>
          {usersLoading && <p>Loading users...</p>}
          {usersError && <p>Error: {usersError}</p>}
          {filteredUsers.map((user) => ( // Use the filtered user list
            <UserCard
              key={user.address}
              user={user}
              currentUserRole={user.role} // Pass the role of the logged-in user
              onEditRole={handleEditRole} // Pass the function to handle role editing
            />
          ))}
        </section>
      </main>
    </div>
  );
}
