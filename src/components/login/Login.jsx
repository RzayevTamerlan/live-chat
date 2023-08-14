import { useContext } from "react";
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { Context } from "../..";
import { Container, Grid, Box, Button } from "@mui/material";

import "./login.css";

const Login = () => {
  const { auth } = useContext(Context);
  const login = async () => {
    const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log(user);
  };

  return (
    <div>
      <Container>
        <Grid
          justifyItems={"center"}
          alignItems={"center"}
          justifyContent={"center"}
          container
          style={{ height: window.innerHeight - 68 }}
        >
          <Grid>
            <Box
              borderRadius={10}
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
              style={{ width: "50vw", background: "#84d3f7" }}
              p={10}
            >
              <Button onClick={login} className="login-btn" variant="outlined">
                Login via Google
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Login;
