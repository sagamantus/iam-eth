import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";

// Define typography and general styles
const buttonTypographyStyles = {
  fontFamily: "var(--secondary-font, Roboto)",
  fontSize: "var(--bodytext-paragraph-bold-font-size, 14px)",
  fontWeight: "var(--font-weight-medium, 500)",
  lineHeight: "var(--inputtext-placeholder-line-height, 20px)",
  letterSpacing: "var(--Label-Large-Tracking, 0.1px)",
};

const buttonBaseStyles = {
  borderRadius: "100px",
  height: "40px",
  borderWidth: "2px",
  boxShadow: "none",
  minWidth: "172px",
  display: "inline-flex",
  alignItems: "center",
};

const startIconStyles = {
  fontSize: "inherit",
  width: "1em",
  height: "1em",
  display: "inline-flex",
  alignItems: "center",
};

// Define primary button variants
const primaryContainedStyles = {
  backgroundColor: "var(--primary-50)",
  color: "white",
  borderColor: "var(--primary-50)",
  "&:hover": { backgroundColor: "var(--primary-40)" },
  "&:active": { backgroundColor: "var(--primary-30)" },
  "&:disabled": {
    backgroundColor: "var(--neutral-90)",
    cursor: "not-allowed",
  },
};

const primaryOutlinedStyles = {
  backgroundColor: "transparent",
  color: "var(--primary-50)",
  border: "1px solid var(--primary-50)",
  "&:hover": {
    backgroundColor: "var(--primary-95)",
    borderColor: "var(--primary-50)",
    color: "var(--primary-50)",
  },
  "&:active": {
    backgroundColor: "var(--primary-95)",
    borderColor: "var(--primary-30)",
    color: "var(--primary-30)",
  },
  "&:disabled": {
    borderColor: "var(--neutral-90)",
    color: "var(--neutral-90)",
    cursor: "not-allowed",
  },
};

const primaryTextStyles = {
  backgroundColor: "transparent",
  color: "var(--primary-50)",
  "&:hover": { color: "var(--primary-40)" },
  "&:active": { color: "var(--primary-60)" },
  "&:disabled": {
    color: "var(--neutral-90)",
    cursor: "not-allowed",
  },
};

// Define secondary button variants
const secondaryContainedStyles = {
  backgroundColor: "var(--secondary-50)",
  color: "white",
  borderColor: "var(--secondary-50)",
  "&:hover": { backgroundColor: "var(--secondary-40)" },
  "&:active": { backgroundColor: "var(--secondary-60)" },
  "&:disabled": {
    backgroundColor: "var(--neutral-90)",
    cursor: "not-allowed",
  },
};

const secondaryOutlinedStyles = {
  backgroundColor: "transparent",
  color: "var(--secondary-50)",
  border: "1px solid var(--secondary-50)",
  "&:hover": {
    borderColor: "var(--secondary-40)",
    color: "var(--secondary-40)",
  },
  "&:active": {
    borderColor: "var(--secondary-60)",
    color: "var(--secondary-60)",
  },
  "&:disabled": {
    borderColor: "var(--neutral-90)",
    color: "var(--neutral-90)",
    cursor: "not-allowed",
  },
};

const secondaryTextStyles = {
  backgroundColor: "transparent",
  color: "var(--secondary-50)",
  "&:hover": { color: "var(--secondary-40)" },
  "&:active": { color: "var(--secondary-60)" },
  "&:disabled": {
    color: "var(--neutral-90)",
    cursor: "not-allowed",
  },
};

// Define a styled version of the Material UI Button component
const StyledButton = styled(Button)(({ theme, variant, color }) => ({
  ...buttonTypographyStyles,
  ...buttonBaseStyles,
  "& .MuiButton-startIcon": startIconStyles,

  // Apply primary or secondary styles based on color and variant props
  ...(variant === "contained" && color === "primary" && primaryContainedStyles),
  ...(variant === "outlined" && color === "primary" && primaryOutlinedStyles),
  ...(variant === "text" && color === "primary" && primaryTextStyles),

  ...(variant === "contained" && color === "secondary" && secondaryContainedStyles),
  ...(variant === "outlined" && color === "secondary" && secondaryOutlinedStyles),
  ...(variant === "text" && color === "secondary" && secondaryTextStyles),
}));

export { StyledButton };
