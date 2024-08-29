import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  AppBar,
  Toolbar,
  Button,
  Container,
  Box,
  MenuItem,
  Drawer,
  IconButton,
  Typography,
  Tooltip,
  Menu,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { FaUserCircle } from "react-icons/fa";
import { logoutUser } from "../../redux/authReducer";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const settings = ["Dashboard", "Join Stream", "Start Stream", "Logout"];

const logoStyle = {
  width: "140px",
  height: "auto",
  cursor: "pointer",
};

const toolbarStyle = (theme) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  flexShrink: 0,
  borderRadius: "999px",
  bgcolor:
    theme.palette.mode === "light"
      ? "rgba(255, 255, 255, 0.4)"
      : "rgba(0, 0, 0, 0.4)",
  backdropFilter: "blur(24px)",
  maxHeight: 40,
  border: "1px solid",
  borderColor: "divider",
  boxShadow:
    theme.palette.mode === "light"
      ? `0 0 1px rgba(85, 166, 246, 0.1), 1px 1.5px 2px -1px rgba(85, 166, 246, 0.15), 4px 4px 12px -2.5px rgba(85, 166, 246, 0.15)`
      : "0 0 1px rgba(2, 31, 59, 0.7), 1px 1.5px 2px -1px rgba(2, 31, 59, 0.65), 4px 4px 12px -2.5px rgba(2, 31, 59, 0.65)",
});

function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize useNavigate

  const toggleDrawer = (open) => () => setDrawerOpen(open);

  const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);

  const handleCloseNavMenu = () => setAnchorElNav(null);
  const handleCloseUserMenu = () => setAnchorElUser(null);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/sign-in"); // Redirect to sign-in page after logout
  };

  const handleMenuItemClick = (path) => () => {
    navigate(path);
    handleCloseUserMenu(); // Close the user menu after navigating
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        boxShadow: 0,
        bgcolor: "transparent",
        backgroundImage: "none",
        mt: 2,
      }}
    >
      <Container maxWidth="lg">
        <Toolbar variant="regular" sx={toolbarStyle}>
          <Box
            onClick={handleMenuItemClick("/")}
            sx={{
              flexGrow: 1,
              display: "flex",
              alignItems: "center",
              ml: "-18px",
              px: 0,
            }}
          >
            <img
              src="/logo-stream.png"
              style={logoStyle}
              alt="logo of sitemark"
            />
          </Box>

          {!user ? (
            <Box>
              <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
                <Button color="primary" variant="outlined" href="/sign-in">
                  Sign in
                </Button>
                <Button color="primary" variant="contained" href="/sign-up">
                  Sign up
                </Button>
              </Box>

              <Box sx={{ display: { xs: "flex", md: "none" } }}>
                <IconButton
                  color="primary"
                  aria-label="menu"
                  onClick={toggleDrawer(true)}
                >
                  <MenuIcon />
                </IconButton>
              </Box>
            </Box>
          ) : (
            <Box>
              <Tooltip>
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <FaUserCircle size={40} color="#667FE6" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                keepMounted
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem onClick={handleMenuItemClick("/dashboard")}>
                  <Typography sx={{ textAlign: "center" }}>
                    Dashboard
                  </Typography>
                </MenuItem>
                <MenuItem onClick={handleMenuItemClick("/start-stream")}>
                  <Typography sx={{ textAlign: "center" }}>
                    Start Stream
                  </Typography>
                </MenuItem>
                <MenuItem onClick={handleMenuItemClick("/join-stream")}>
                  <Typography sx={{ textAlign: "center" }}>
                    Join Stream
                  </Typography>
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  <Typography sx={{ textAlign: "center" }}>Log Out</Typography>
                </MenuItem>
              </Menu>
            </Box>
          )}
        </Toolbar>
      </Container>

      {!user && (
        <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
          <Box
            sx={{
              width: 250,
              p: 2,
              display: "flex",
              flexDirection: "column",
              gap: 0,
            }}
            role="presentation"
            onClick={toggleDrawer(false)}
          >
            <MenuItem>
              <Button
                color="primary"
                variant="outlined"
                href="/join-stream/"
                fullWidth
              >
                Join Stream
              </Button>
            </MenuItem>
            <MenuItem>
              <Button
                color="primary"
                variant="outlined"
                href="/sign-in/"
                fullWidth
              >
                Sign in
              </Button>
            </MenuItem>
            <MenuItem>
              <Button
                color="primary"
                variant="contained"
                href="/sign-up/"
                fullWidth
              >
                Sign up
              </Button>
            </MenuItem>
          </Box>
        </Drawer>
      )}
    </AppBar>
  );
}

export default Navbar;
