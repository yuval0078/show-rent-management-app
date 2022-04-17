import React, { useState, useEffect } from "react";
import { Button, Checkbox, TextField } from "@material-ui/core";
import axiosUtils from "../../utils/axiosUtils";
import axios from "axios";

function EditUserComp(props) {
  const [firstName, setFirstName] = useState(props.user.name.split(" ")[0]);
  const [lastName, setLastName] = useState(props.user.name.split(" ")[1]);
  const [userName, setUserName] = useState(props.user.userName);
  const [sessionTimeOut, setSessionTimeOut] = useState(
    props.user.sessionTimeOut
  );
  const [prems, setPrems] = useState([]);
  const [fNameErr, setFNameErr] = useState(false);
  const [lNameErr, setLNameErr] = useState(false);
  const [uNameErr, setUNameErr] = useState(false);
  const [stoErr, setStoErr] = useState(false);
  const [helperText, setHelperText] = useState();
  const [password, setPassword] = useState();

  const [checkVS, setCheckVS] = useState();
  const [checkES, setCheckES] = useState();
  const [checkDS, setCheckDS] = useState();
  const [checkVM, setCheckVM] = useState();
  const [checkEM, setCheckEM] = useState();
  const [checkDM, setCheckDM] = useState();
  const [checkAd, setCheckAd] = useState();

  useEffect(() => {
    const getServerData = async () => {
      const resp = await axiosUtils.getById(
        "http://localhost:3005/login-data/",
        props.user.userId
      );
      const data = await resp.data.user.password;
      setPassword(data);
    };
    getServerData();
  });

  const handleFName = (e) => {
    setFirstName(e.target.value);
  };
  const handleLName = (e) => {
    setLastName(e.target.value);
  };
  const handleUName = (e) => {
    setUserName(e.target.value);
  };
  const handleSTO = (e) => {
    setSessionTimeOut(e.target.value);
  };

  const handleCheckbox = (e) => {
    let arr = prems;
    if (e.target.checked) {
      let newArr = [...arr, e.target.value];
      setPrems(newArr);
    } else {
      let newArr = arr.filter((item) => {
        return item !== e.target.value;
      });
      setPrems(newArr);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (firstName && lastName && userName && sessionTimeOut && prems.length > 0) {
      const userObj = {
        _id: props.user.userId,
        name: { first: firstName, last: lastName },
        createdDate: props.user.createdDate,
        sessionTimeOut: +sessionTimeOut,
      };
      const premsObj = {
        userId: props.user.userId,
        premissions: prems,
      };
      const loginObj = {
        userName: userName,
        password: password,
      };
      axiosUtils.updateItem(
        "http://localhost:3005/users/",
        props.user.userId,
        userObj
      );
      axiosUtils.updateItem(
        "http://localhost:3005/login-data/",
        props.user.userId,
        loginObj
      );
      axiosUtils.updateItem(
        "http://localhost:3005/premissions/",
        props.user.userId,
        premsObj
      );
      props.goToViewUsers()
    } else {
      if (firstName) {
        setFNameErr(false);
      }
      if (lastName) {
        setLNameErr(false);
      }
      if (userName) {
        setUNameErr(false);
      }
      if (sessionTimeOut) {
        setStoErr(false);
      }
      if (!firstName || !lastName || !userName || !sessionTimeOut) {
        setHelperText("all fields are required!");
        if (!firstName) {
          setFNameErr(true);
        }
        if (!lastName) {
          setLNameErr(true);
        }
        if (!userName) {
          setUNameErr(true);
        }
        if (!sessionTimeOut) {
          setStoErr(true);
        }
      } else {
        setHelperText("user must have at least one premissions!");
      }
    }
  };

  const textFieldStyle = {
    marginRight: 20,
    marginLeft: 20,
    marginBottom: 10,
    width: 350,
  };
  const checkDivStyle = {
    marginRight: 50,
    marginLeft: 50,
    marginBottom: 20,
    textAlign: "center",
  };

  return (
    <div>
      <h3>user created on {props.user.createdDate}</h3>
      <b style={{ color: "red" }}>{helperText}</b>
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <TextField
          onChange={handleFName}
          style={textFieldStyle}
          defaultValue={firstName}
          label="first name"
          required
          variant="outlined"
          error={fNameErr}
        ></TextField>
        <TextField
          onChange={handleLName}
          defaultValue={lastName}
          style={textFieldStyle}
          label="last name"
          required
          variant="outlined"
          error={lNameErr}
        ></TextField>
        <br />
        <TextField
          onChange={handleUName}
          defaultValue={userName}
          style={textFieldStyle}
          label="user name"
          required
          variant="outlined"
          error={uNameErr}
        ></TextField>
        <TextField
          onChange={handleSTO}
          defaultValue={sessionTimeOut}
          style={textFieldStyle}
          label="session time out in minutes"
          type="number"
          required
          variant="outlined"
          error={stoErr}
        ></TextField>
        <br /> <br />
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div style={checkDivStyle}>
            <b>shows premissions:</b> <br />
            view <Checkbox
              value={"view shows"}
              onChange={handleCheckbox}
            />{" "}
            <br />
            create <Checkbox
              value={"create shows"}
              onChange={handleCheckbox}
            />{" "}
            <br />
            delete <Checkbox
              value={"delete shows"}
              onChange={handleCheckbox}
            />{" "}
            <br />
            update <Checkbox
              value={"update shows"}
              onChange={handleCheckbox}
            />{" "}
          </div>
          <div style={checkDivStyle}>
            <b>members premissions:</b> <br />
            view <Checkbox
              value={"view members"}
              onChange={handleCheckbox}
            />{" "}
            <br />
            create <Checkbox
              value={"create members"}
              onChange={handleCheckbox}
            />{" "}
            <br />
            delete{" "}
            <Checkbox value={"delete members"} onChange={handleCheckbox} />{" "}
            <br />
            update{" "}
            <Checkbox value={"update members"} onChange={handleCheckbox} />{" "}
          </div>
          <div style={checkDivStyle}>
            <b>admin premissions:</b> <br />
            <Checkbox value={"admin premissions"} onChange={handleCheckbox} />
          </div>
        </div>
        <Button type="submit" variant="contained">
          update
        </Button>
      </form>
    </div>
  );
}

export default EditUserComp;
