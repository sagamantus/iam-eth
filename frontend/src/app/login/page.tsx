"use client";

import React, { useState } from "react";
import styles from "./page.module.scss";
import { useRouter } from "next/navigation";
import { Box, IconButton, InputAdornment } from "@mui/material";
import { StyledButton } from "@/components/CustomMUIComponents/button";
import { StyledTextField } from "@/components/CustomMUIComponents/textField";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { useLogin } from "@/hooks/useLogin"; // Import the custom hook

const KeyLogin: React.FC = () => {
  const router = useRouter();
  const { error, login } = useLogin(); // Destructure from the hook

  // State variables for managing form inputs and visibility toggle
  const [privateKey, setPrivateKey] = useState<string>("");
  const [isPrivateKeyVisible, setIsPrivateKeyVisible] = useState<boolean>(false);

  // Toggle private key visibility
  const handlePrivateKeyVisibilityToggle = () =>
    setIsPrivateKeyVisible((prev) => !prev);

  // Handle form submission for login
  const handleLoginSubmit = async () => {
    if (!privateKey) return; // Prevent submission if private key is empty

    const success = await login(privateKey); // Call the login function
    if (success) {
      // Redirect after successful login
      router.push("/");
    }
  };

  return (
    <main>
      <div className={styles.container}>
        <section className={styles.graphicSection}></section>
        <section className={styles.loginSection}>
          <header className={styles.header}>Enter Your Private Key</header>
          {error && <div className={styles.error}>{error}</div>} {/* Display error message */}
          <Box
            component="form"
            noValidate
            autoComplete="off"
            className={styles.form}
          >
            <StyledTextField
              label="Private Key"
              variant="outlined"
              type={isPrivateKeyVisible ? "text" : "password"}
              value={privateKey}
              rows={4}
              multiline
              onChange={(e) => setPrivateKey(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handlePrivateKeyVisibilityToggle}
                      edge="end"
                    >
                      {isPrivateKeyVisible ? (
                        <MdVisibilityOff />
                      ) : (
                        <MdVisibility />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <StyledButton
              color="primary"
              variant="contained"
              onClick={handleLoginSubmit}
              disabled={!privateKey}
            >
              Log In
            </StyledButton>
          </Box>
        </section>
      </div>
    </main>
  );
};

export default KeyLogin;
