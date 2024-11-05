import { styled } from "@mui/material/styles";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

// Styled ListItemButton Component
const StyledListItemButton = styled(ListItemButton, {
  shouldForwardProp: (prop) => prop !== "collapsed",
})<{ collapsed?: boolean }>(({ theme, collapsed }) => ({
  cursor: "pointer",
  color: "var(--neutral-30)",
  padding: collapsed ? "10px" : "10px 15px", // Reduced padding when collapsed
  margin: "5px 20px",
  display: "flex",
  alignItems: "center",
  justifyContent: collapsed ? "center" : "flex-start", // Center content when collapsed
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  overflow: "hidden",
  "&:hover, &.Mui-selected": {
    backgroundColor: "var(--primary-95)",
    borderRadius: "100px",
  },
}));

// Styled ListItemText Component
const StyledListItemText = styled(ListItemText, {
  shouldForwardProp: (prop) => prop !== "collapsed",
})<{ collapsed?: boolean }>(({ collapsed }) => ({
  color: "var(--neutral-30)",
  fontFamily: "var(--primary-font)",
  fontSize: "var(--bodytext-paragraph2-font-size)",
  fontWeight: "var(--font-weight-medium)",
  lineHeight: "var(--bodytext-paragraph2-line-height)",
  display: collapsed ? "none" : "block", // Hide text when collapsed
  "& .MuiTypography-root": {
    color: "inherit",
    fontFamily: "inherit",
    fontSize: "inherit",
    fontWeight: "inherit",
    lineHeight: "inherit",
  },
}));

// Styled ListItemIcon Component
const StyledListItemIcon = styled(ListItemIcon, {
  shouldForwardProp: (prop) => prop !== "collapsed",
})<{ collapsed?: boolean }>(({ collapsed }) => ({
  fontSize: "24px",
  color: "var(--neutral-30)",
  display: "flex",
  justifyContent: collapsed ? "center" : "flex-start", // Center icon when collapsed
}));

export { StyledListItemButton, StyledListItemText, StyledListItemIcon };
