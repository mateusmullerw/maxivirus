import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import ListAltRoundedIcon from "@mui/icons-material/ListAltRounded";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
import { useNavigate, useLocation } from "react-router-dom";
import { ReactComponent as MaxihostLogo } from "assets/maxihost-logo.svg";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { LogoContainer, Toolbar } from "./Main.styles";

const drawerWidth = 240;

interface Props {
  pageTitle: string;
  children: React.ReactNode;
}

const drawerOptions = [
  {
    label: "Population list",
    route: "/",
    icon: <ListAltRoundedIcon />,
  },
  {
    label: "About",
    route: "/about",
    icon: <InfoRoundedIcon />,
  },
];

const MainLayout = (props: Props) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isLargeDisplay = useMediaQuery(theme.breakpoints.up("md"));
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMenuItem = (index: number, route: string) => {
    navigate(route);
  };

  const drawer = (
    <div>
      <LogoContainer>
        <MaxihostLogo />
      </LogoContainer>
      <List>
        {drawerOptions.map((item, index) => {
          return (
            <ListItem
              key={item.label}
              onClick={() => handleMenuItem(index, item.route)}
              disablePadding
            >
              <ListItemButton>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItemButton>
            </ListItem>
          );
        })}
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
          paddingTop: 0,
          width: { md: `calc(100% - ${drawerWidth}px)` },
          height: "100vh",
        }}
      >
        <Toolbar />
        {props.children}
      </Box>
    </Box>
  );
};

export default MainLayout;
