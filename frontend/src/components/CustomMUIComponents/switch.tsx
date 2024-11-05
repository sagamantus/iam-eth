import { styled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";

interface StyleSwitchProps {
  showIcons?: boolean; // Prop to control whether to show icons
}

// --- Styled Switch Component ---
const StyleSwitch = styled(
  ({ showIcons, ...props }: StyleSwitchProps & any) => <Switch {...props} />
)(({ theme, showIcons }: { theme: any; showIcons?: boolean }) => ({
  width: 52,
  height: 32,
  padding: 2,
  display: "flex",
  alignItems: "center",

  // --- Standard Switch Styling ---
  "& .MuiSwitch-switchBase": {
    padding: 4,
    "&.Mui-checked": {
      transform: "translateX(20px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: "var(--primary-50)",
        opacity: 1,
      },
    },
  },

  // --- Handle (Thumb) Styling ---
  "& .MuiSwitch-thumb": {
    width: 24,
    height: 24,
    backgroundColor: "#fff",
    boxShadow: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    // Icon in the thumb (conditionally rendered based on showIcons prop)
    "&:before": {
      content: showIcons ? '""' : "''",
      position: "absolute",
      width: "100%",
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "var(--primary-30)",
      backgroundImage: showIcons
        ? `url('data:image/svg+xml;charset=utf-8,${encodeURIComponent(
            `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="var(--white)"><path d="M0 0h24v24H0z" fill="none"/><path d="M19 13H5v-2h14v2z"/></svg>`
          )}')`
        : "none",
    },
  },

  // --- Track (Background) Styling ---
  "& .MuiSwitch-track": {
    borderRadius: 16,
    backgroundColor: "var(--neutral-90)",
    opacity: 1,
  },
}));

// --- Export Styled Switch ---
export default StyleSwitch;
