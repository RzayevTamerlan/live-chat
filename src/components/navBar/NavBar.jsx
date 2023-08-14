import { useContext, useState, useEffect } from "react";
import { AppBar, Button, Grid, Toolbar } from "@mui/material";
import { NavLink } from "react-router-dom";
import { LOGIN_ROUTE } from "../utils/consts";
import { Context } from "../..";
import { onAuthStateChanged, signOut } from "firebase/auth";
import chatLogo from "./chat-svgrepo-com.svg"

const NavBar = () => {
  const { auth } = useContext(Context);
  const [user, setUser] = useState(null);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe(); // Unsubscribe when component unmounts
  }, [auth]);
  const handleLogout = async () => {
    await signOut(auth); // Sign out the user
  };

  return (
    <AppBar
      style={{ padding: "10px 0px", background: "#84d3f7" }}
      position="static"
    >
      <Toolbar variant="dense">
        <Grid container justifyContent={"flex-end"}>
          {user ? (
            <Grid justifyContent={"space-between"} container display={"flex"} alignItems={"center"} justifyItems={"center"}>
              <div style={{display:"flex",alignItems:"center",gap:"15px",fontSize:"22px",fontWeight:"600"}} className="icon">Live chat <img style={{maxWidth:"30px", maxHeight:"30px"}} src={chatLogo} alt="Live chat logo" /></div>
              <Button onClick={handleLogout} style={{ color: "#fff" }} variant={"contained"}>
                Exit
              </Button>
            </Grid>
          ) : (
            <NavLink to={LOGIN_ROUTE}>
              <Button style={{ color: "#fff" }} variant={"contained"}>
                Login
              </Button>
            </NavLink>
          )}
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
