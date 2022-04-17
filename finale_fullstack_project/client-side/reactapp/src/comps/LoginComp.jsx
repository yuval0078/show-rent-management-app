import React, { useState } from "react";
import { Grid, Paper } from "@material-ui/core";
import { TextField } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { Link, useNavigate } from "react-router-dom";
import axiosUtils from "../utils/axiosUtils";
import {useDispatch} from 'react-redux'
import {login} from '../utils/userIdReducer'
import {switchComp} from '../utils/compReducer'

function LoginComp(props) {
  const [userName, setUserName] = useState();
  const [password, setPassword] = useState();
  const [userNameErr, setUserNameErr] = useState(false);
  const [passwordErr, setPasswordErr] = useState(false);
  const [userNameHelpTxt, setUserNameHelpTxt] = useState(false);
  const [passwordHelpTxt, setPasswordHelpTxt] = useState(false);
  const [errorMsg, setErrorMsg] = useState();

  const dispatch = useDispatch(); 

  const paperStyle = {
    padding: 20,
    height: 300,
    width: 280,
    margin: "120px auto",
    opacity: 0.9,
    textAlign: "center",
  };

  const handleNameChange = (e) => {
    setUserName(e.target.value);
  };

  const handlepasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let resp = await axiosUtils.getAll("http://localhost:3005/login-data");
    let allUsers = await resp.data;
    let user = await allUsers.filter((user) => {
      return user.userName === userName;
    })[0];
    if (user) {
      if (userName && password) {
        if (password === user.password) {
          let userId = await user._id
          loginSuccess(userId);
        } else {
          logInFailed();
        }
      } else {
        emptyFieldesError();
      }
    } else {
        if(userName && password) {
            logInFailed();
        } else {
            emptyFieldesError();
        }

    }
  };

  const emptyFieldesError = () => {
      setUserNameErr(false)
      setPasswordErr(false)
    if (!userName) {
      setUserNameErr(true);
      setUserNameHelpTxt("this field is required");
      setErrorMsg('')
    }
    if (!password) {
      setPasswordErr(true);
      setPasswordHelpTxt("this field is required");
      setErrorMsg('')
    }
  };

  const navigate = useNavigate()

  const loginSuccess = (id) => {
    dispatch(login(id))
    dispatch(switchComp("wellcome"))
    navigate('/workspace')
  };

  const logInFailed = () => {
    setUserNameErr(true);
    setUserNameHelpTxt(false);
    setPasswordErr(true);
    setPasswordHelpTxt(false);
    setErrorMsg("user name or password is incorrect")
  };


  return (
    <Grid>
      <Paper elevation={20} style={paperStyle}>
        <h3 style={{ color: "black" }}>Log in</h3>
        <p>{errorMsg}</p>
        <form onSubmit={handleSubmit} noValidate autoComplete="off">
          <TextField
            label="user name"
            required
            variant="outlined"
            onChange={handleNameChange}
            error={userNameErr}
            helperText={userNameHelpTxt}
          />
          <TextField
            label="password"
            required
            variant="outlined"
            margin="normal"
            onChange={handlepasswordChange}
            error={passwordErr}
            helperText={passwordHelpTxt}
            type="password"
          />
          <Button type="submit">sign in</Button>
        </form>

        <Link to="/register">or click here to register</Link>
      </Paper>
    </Grid>
  );
}

export default LoginComp;
