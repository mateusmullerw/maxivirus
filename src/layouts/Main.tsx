import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
import { useNavigate } from "react-router-dom";
import { ReactComponent as MaxihostLogo } from "static/maxihost-logo.svg";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { LogoContainer } from "./Main.styles";
import { ArrowBack } from "@mui/icons-material";

const drawerWidth = 240;

interface Props {
  pageTitle: string;
  children: React.ReactNode;
}

const drawerOptions = [
  {
    label: "Dashboard",
    route: "/",
    icon: <DashboardRoundedIcon />,
  },
  {
    label: "About",
    route: "/about",
    icon: <InfoRoundedIcon />,
  },
];

const MainLayout = (props: Props) => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const theme = useTheme();
  const isLargeDisplay = useMediaQuery(theme.breakpoints.up("md"));
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <LogoContainer>
        <MaxihostLogo />
      </LogoContainer>
      <List>
        {drawerOptions.map((item, index) => (
          <ListItem
            key={item.label}
            onClick={() => navigate(item.route)}
            disablePadding
          >
            <ListItemButton>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Box sx={{ display: "flex", height: "100%" }}>
      <CssBaseline />
      <AppBar
        color="transparent"
        elevation={0}
        position="fixed"
        sx={{
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          {/* <IconButton
            color="inherit"
            aria-label="go back"
            edge="start"
            onClick={() => navigate}
            sx={{ mr: 2 }}
          >
            <ArrowBack />
          </IconButton> */}
          <Typography variant="h5" color="#2B223D" noWrap component="div">
            {props.pageTitle}
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
        aria-label="mailbox folders"
      >
        {isLargeDisplay ? (
          <Drawer
            variant="permanent"
            sx={{
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
            open
          >
            {drawer}
          </Drawer>
        ) : (
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true,
            }}
            sx={{
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
          >
            {drawer}
          </Drawer>
        )}
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { md: `calc(100% - ${drawerWidth}px)` },
          height: "100%",
        }}
      >
        <Toolbar />
        {props.children}
      </Box>
    </Box>
  );
};

export default MainLayout;
