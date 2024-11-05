"use client";

import React, { useState } from "react";
import { Chip, Paper, Button } from "@mui/material";
import { roleMap } from "@/utils/roleMap"; // Import role map

type User = {
  address: string;
  role: number;
  name: string;
};

interface UserCardProps {
  user: User;
  currentUserRole: number; // Role of the currently logged-in user
  onEditRole: (address: string, newRole: number) => void; // Callback for editing role
}

const UserCard: React.FC<UserCardProps> = ({
  user,
  currentUserRole,
  onEditRole,
}) => {
  const [isOverlayOpen, setOverlayOpen] = useState(false);

  const handleOverlayToggle = () => {
    setOverlayOpen((prev) => !prev);
  };

  const handleRoleChange = (newRole: number) => {
    onEditRole(user.address, newRole);
    handleOverlayToggle(); // Close overlay after changing the role
  };

  // Allow editing if the current user's role is less than or equal to the user's role
  const canEditRole = currentUserRole <= user.role;

  return (
    <Paper
      elevation={3}
      style={{
        padding: "20px 40px",
        display: "flex",
        justifyContent: "space-between",
        margin: "8px",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <div
          style={{
            fontFamily: "var(--primary-font)",
            fontSize: "var(--headings-h5-font-size)",
            lineHeight: "var(--headings-h5-line-height)",
            fontWeight: "var(--font-weight-bold)",
          }}
        >
          {user.name}
        </div>
        <Chip
          label={roleMap[user.role]?.label || "Unknown"}
          sx={{
            width: "fit-content", // Set width to fit content
            maxWidth: "120px", // Optional: Set a max width if desired
            padding: "4px 8px", // Add some padding
            marginTop: "4px", // Optional: Space above the Chip
          }}
        />
      </div>
      <div>
        <Button onClick={handleOverlayToggle} disabled={!canEditRole}>
          Edit Roles
        </Button>
        {isOverlayOpen && (
          <div
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)", // Center the overlay
              background: "white",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              padding: "16px",
              borderRadius: "8px",
              zIndex: 1000, // Ensure the overlay appears above other content
              minWidth: "300px", // Optional: Set a minimum width for the overlay
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h4>Select a Role:</h4>
              <Button onClick={handleOverlayToggle}>Close</Button>{" "}
              {/* Close button */}
            </div>
            {Object.values(roleMap).map(
              (role, index) =>
                currentUserRole < index && (
                  <Button
                    key={index}
                    onClick={() => handleRoleChange(index)}
                    style={{ margin: "4px 0", width: "100%" }} // Full width buttons
                  >
                    {role.label}
                  </Button>
                )
            )}
          </div>
        )}
      </div>
    </Paper>
  );
};

export default UserCard;
