import React from "react";
import { Grid } from "@material-ui/core";
import { Link } from "react-router-dom";
import Alert from "@mui/material/Alert";

function SuccessRegComp(props) {

  return (
    <Grid>
      <Alert severity="success" style={{width: "50%", margin: "auto", marginTop: 200}}>
        Account created sccessfully! click&nbsp;
        <Link to="/login">here</Link>&nbsp; to log in
      </Alert>
    </Grid>
  );
}

export default SuccessRegComp;
