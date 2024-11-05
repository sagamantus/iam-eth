import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";

// Define props for StyledIconButton
interface StyledIconButtonProps {
  variant?: 'filled' | 'outlined' | 'tonal' | 'standard'; // Button variant options
  color?: 'primary' | 'secondary'; // Button color options
}

// Create a styled version of the Material UI IconButton
const StyledIconButton = styled(IconButton)<StyledIconButtonProps>(({ theme, variant = 'standard', color }) => ({
  padding: theme.spacing(1), // General padding for the button

  // --- Standard Variant Styles ---
  ...(variant === 'standard' && {
    color: "var(--neutral-30)",
    "&:hover": {
      color: "var(--primary-50)",
    },
  }),

  // --- Filled Variant Styles ---
  ...(variant === 'filled' && {
    backgroundColor: "var(--primary-50)",
    color: "white",
    "&:hover": {
      backgroundColor: "var(--primary-40)",
    },
  }),

  // --- Outlined Variant Styles ---
  ...(variant === 'outlined' && {
    color: "var(--primary-50)",
    border: "1px solid var(--primary-50)",
    "&:hover": {
      borderColor: "var(--primary-40)",
      color: "var(--primary-40)",
    },
  }),

  // --- Tonal Variant Styles ---
  ...(variant === 'tonal' && {
    backgroundColor: "var(--primary-95)",
    color: "var(--primary-50)",
    "&:hover": {
      backgroundColor: "var(--primary-90)",
      color: "var(--primary-40)",
    },
  }),
}));

// Export the styled IconButton component
export default StyledIconButton;
