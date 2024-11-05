import Menu, { MenuProps } from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import { styled, alpha } from '@mui/material/styles';

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: "0px 0px 8px 8px",
    marginTop: theme.spacing(0.1),
    color: "rgb(55, 65, 81)",
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      display: "flex",
      alignItems: "center",
      color: "var(--neutral-30)",
      fontSize: "var(--subtitles-subtitle2-font-size, 16px)",
      fontStyle: "normal",
      fontWeight: "var(--font-weight-medium, 500)",
      lineHeight: "var(--subtitles-subtitle2-line-height, 24px)",
      height: "56px",
      gap: theme.spacing(2), // Adds spacing between icon and text
      padding: "8px 16px",
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
    "& .MuiDivider-root": {
      margin: theme.spacing(0.5, 0), // Adds some vertical margin to the divider
      backgroundColor: theme.palette.divider,
    },
  },
}));

export default StyledMenu;
