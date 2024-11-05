import React from "react";
import { Chip, Paper, Box } from "@mui/material";
import styles from "./ProfileCard.module.scss";
import { roleMap } from "@/utils/roleMap"; // Update the import path according to your structure

type User = {
  address: string;
  role: number;
  is_suspended: boolean;
  name: string;
  dept: string;
};

interface ProfileCardProps {
  user: User;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ user }) => {
  return (
    <Paper
      elevation={3}
      className={`${styles.profileCard} ${user.is_suspended ? styles.suspended : ""}`}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        padding: 2,
        backgroundColor: user.is_suspended ? "var(--secondary-95)" : "var(--secondary-99)",
      }}
    >
      <div
        className={styles.userName}
        style={{
          fontFamily: "var(--primary-font)",
          fontSize: "var(--headings-h5-font-size)",
          lineHeight: "var(--headings-h5-line-height)",
          fontWeight: "var(--font-weight-bold)",
        }}
      >
        {user.name}
      </div>
      <div
        className={styles.userDept}
        style={{
          fontFamily: "var(--secondary-font)",
          fontSize: "var(--subtitles-subtitle2-font-size)",
          lineHeight: "var(--subtitles-subtitle2-line-height)",
          color: "var(--neutral-70)",
        }}
      >
        {user.dept}
      </div>
      <div
        className={styles.userAddress}
        style={{
          fontFamily: "var(--primary-font)",
          fontSize: "var(--bodytext-paragraph1-font-size)",
          lineHeight: "var(--bodytext-paragraph1-line-height)",
          fontWeight: "var(--font-weight-medium)",
          color: "var(--neutral-60)",
        }}
      >
        Address: {user.address}
      </div>
      <Box mt={1} mb={1}>
        <Chip
          label={roleMap[user.role]?.label || "Unknown"}
          sx={{
            backgroundColor: roleMap[user.role]?.color || "var(--secondary-10)",
            color: "#fff",
            fontWeight: "var(--font-weight-bold)",
            fontFamily: "var(--primary-font)",
          }}
        />
      </Box>
      {user.is_suspended && (
        <div
          className={styles.suspendedText}
          style={{
            fontFamily: "var(--primary-font)",
            fontSize: "var(--bodytext-paragraph-bold-font-size)",
            lineHeight: "var(--bodytext-paragraph-bold-line-height)",
            color: "var(--error-50)",
          }}
        >
          Suspended
        </div>
      )}
    </Paper>
  );
};

export default ProfileCard;
