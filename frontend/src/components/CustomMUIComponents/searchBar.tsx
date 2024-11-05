"use client";

import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";

import { MdOutlineMenu, MdOutlineSearch } from "react-icons/md";

import StyledIconButton from "./iconButton";

// --- Styled Paper Component for Search Bar ---
const StyledPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: "var(--primary-95)",
  borderRadius: "100px",
  display: "flex",
  alignItems: "center",
  height: 56,
  width: "90%",
  padding: theme.spacing(0.5, 2),
  boxShadow: "none",
  "&:hover": {
    boxShadow: "none",
  },
  "&:active": {
    boxShadow: "none",
  },
}));

// --- Styled InputBase Component ---
const StyledInputBase = styled(InputBase)(({ theme }) => ({
  marginLeft: theme.spacing(1),
  flex: 1,
  fontFamily: "var(--primary-font)",
  fontSize: "var(--bodytext-paragraph1-font-size)",
  "&::placeholder": {
    color: "var(--neutral-40)",
  },
}));

// --- Custom Search Bar Component ---
const CustomSearchBar = () => {
  const [isInputFocused, setIsInputFocused] = useState(false);
  return (
    <StyledPaper>
      {/* Leading Icon */}
      <StyledIconButton aria-label="menu">
        {isInputFocused ? <MdOutlineSearch /> : <MdOutlineMenu />}
      </StyledIconButton>

      {/* Search Input Field */}
      <StyledInputBase
        placeholder="Hinted search text"
        inputProps={{ "aria-label": "search" }}
        onFocus={() => setIsInputFocused(true)} // Set focus state
        onBlur={() => setIsInputFocused(false)} // Reset focus state when input is blurred
      />

      {/* Trailing Icon */}
      <StyledIconButton type="button" aria-label="search">
        {isInputFocused ? null : <MdOutlineSearch />}{" "}
        {/* Change to void space when input is focused */}
      </StyledIconButton>
    </StyledPaper>
  );
};

// --- Export Custom Search Bar ---
export default CustomSearchBar;
