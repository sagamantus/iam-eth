import { styled } from "@mui/material/styles";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";

// --- Input Label Styles ---
const inputLabelBaseStyles = {
  color: "var(--neutral-30)",
  fontFamily: "Poppins",
  fontSize: "16px",
  fontWeight: 500,
  lineHeight: "22px",
  marginBottom: "4px",
};

const inputLabelFocusedStyles = {
  color: "var(--primary-50)",
};

const inputLabelDisabledStyles = {
  color: "var(--neutral-70)",
};

// Styled InputLabel Component
const StyledInputLabel = styled(InputLabel)(({ theme }) => ({
  ...inputLabelBaseStyles,
  "&.Mui-focused": inputLabelFocusedStyles,
  "&.Mui-disabled": inputLabelDisabledStyles,
}));

// --- TextField Label Styles ---
const textFieldLabelFocusedStyles = {
  color: "var(--primary-50)",
  fontFamily: "var(--secondary-font)",
  fontSize: "var(--bodytext-paragraph1-font-size)",
  fontWeight: "var(--font-weight-regular)",
};

// --- TextField Outlined Input Styles ---
const textFieldOutlinedBaseStyles = {
  borderColor: "var(--neutral-30)",
};

const textFieldOutlinedHoverStyles = {
  borderColor: "var(--neutral-40)",
};

const textFieldOutlinedFocusedStyles = {
  borderColor: "var(--primary-50)",
  borderWidth: "3px",
};

const textFieldOutlinedDisabledStyles = {
  borderColor: "var(--neutral-70)",
};

// Styled TextField Component
const StyledTextField = styled(TextField)(({ theme }) => ({
  "& label.Mui-focused": textFieldLabelFocusedStyles,
  "& .MuiOutlinedInput-root": {
    "& fieldset": textFieldOutlinedBaseStyles,
    "&:hover fieldset": textFieldOutlinedHoverStyles,
    "&.Mui-focused fieldset": textFieldOutlinedFocusedStyles,
    "&.Mui-disabled fieldset": textFieldOutlinedDisabledStyles,
  },
}));

// --- Export Styled Components ---
export { StyledInputLabel, StyledTextField };
