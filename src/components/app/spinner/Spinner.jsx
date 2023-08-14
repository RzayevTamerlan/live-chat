import { Grid, Container } from "@mui/material";
import "./spinner.css"

const Spinner = () => {
  return (
    <Container>
      <Grid
        justifyItems={"center"}
        alignItems={"center"}
        justifyContent={"center"}
        container
        style={{ height: window.innerHeight - 68 }}
      >
        <div class="lds-ring">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </Grid>
    </Container>
  );
};

export default Spinner;
