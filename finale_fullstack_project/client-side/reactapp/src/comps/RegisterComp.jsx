import React, { useState } from "react";
import { Grid, Paper } from "@material-ui/core";
import { TextField } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { Link, useNavigate } from "react-router-dom";
import axiosUtils from "../utils/axiosUtils";

function RegisterComp(props) {

  const [userName, setUserName] = useState();
  const [password, setPassword] = useState();
  const [passwordVer, setPasswordVer] = useState();
  const [helperText, setHelperText] = useState('The user name should be provided by the admin');

  const paperStyle = {
    padding: 20,
    height: 350,
    width: 280,
    margin: "120px auto",
    opacity: 0.9,
    textAlign: "center",
  };

  const handleNameChange = (e) => {
    setUserName(e.target.value);
  };

  const handlePswrdChange = (e) => {
    setPassword(e.target.value);
  };

  const handlePswrdVerChange = (e) => {
    setPasswordVer(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userName && password && passwordVer && password === passwordVer) {
      let resp = await axiosUtils.getAll('http://localhost:3005/login-data/')
      let allUsers = await resp.data
      let user = await allUsers.filter(user => {
        return (user.userName === userName)
      })
      if (user.length === 0 || user[0].password) {
        registerFailed(true)
      } else {
        register(user[0]._id)
      }
      
    } else {
      registerFailed(false)
    }
  }

  const registerFailed = (inValid) => {
    if (userName && password && passwordVer && password !== passwordVer) {
      setHelperText("the password verify doesn't match")
    }
    if (!userName || !password || !passwordVer) {
      setHelperText("all fields are required")
    }
    if (userName && password && passwordVer && password === passwordVer && inValid) {
      setHelperText("the user name is invalid")
    }
  }

  const navigate = useNavigate()

  const register = async (id) => {
    const loginData = {
      userName: userName,
      password: password
    }
    axiosUtils.updateItem('http://localhost:3005/login-data/', id, loginData)
    navigate('/reg-suc')
  }

  return (
    <div>
      <Grid>
        <Paper elevation={20} style={paperStyle}>
          <h3 style={{ color: "black" }}>register</h3>
          <p style={{color: "red", fontSize: 12, fontWeight: "bold" }}>
            {helperText}
          </p>
          <form noValidate autoComplete="off" onSubmit={handleSubmit}>
            <TextField
              label="user name"
              required
              variant="outlined"
              onChange={handleNameChange}
            />
            <TextField
              label="password"
              required
              variant="outlined"
              type="password"
              onChange={handlePswrdChange}
            />
            <TextField
              label="verify password"
              required
              variant="outlined"
              type="password"
              onChange={handlePswrdVerChange}
            />
            <Button type="submit">submit</Button>
          </form>

          <nav>
            <Link to="/login">or click here to log in</Link>
          </nav>
        </Paper>
      </Grid>
    </div>
  );
}

export default RegisterComp;
