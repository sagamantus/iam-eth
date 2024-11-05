// StyledListItem.tsx
import { styled } from "@mui/material/styles";
import ListItem, { ListItemProps } from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import StyleSwitch from "./switch";

// Extend the ListItemProps to include our additional props
interface StyledListItemProps extends ListItemProps {
  leadingIcon: React.ReactNode; // Leading icon
  trailingSwitch: {
    checked: boolean; // Switch checked state
    onChange: () => void; // Function to handle change
  };
  primary: string; // Primary text for the ListItem
}

const StyledListItem = styled(
  ({ leadingIcon, trailingSwitch, primary, ...other }: StyledListItemProps) => (
    <ListItem {...other}>
      <ListItemIcon>{leadingIcon}</ListItemIcon>
      <ListItemText primary={primary} />
      <StyleSwitch
        edge="end"
        checked={trailingSwitch.checked}
        onChange={trailingSwitch.onChange}
        inputProps={{
          "aria-labelledby": `switch-list-label-${primary}`,
        }}
      />
    </ListItem>
  )
)(({ theme }) => ({
  borderRadius: "8px",
  width: "360px", // Fixed width for each ListItem
  backgroundColor: "var(--primary-99)", // Default background color

  "&.active": {
    backgroundColor: "var(--primary-90)", // Background color when active
  },

  // Additional styles can be added here
}));

export default StyledListItem;
