import React, { useEffect, useState } from "react";
import { TextField, Checkbox, Button } from "@mui/material";
import axiosUtils from "../../utils/axiosUtils";

function AddUserComp(props) {
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [userName, setUserName] = useState();
  const [sessionTimeOut, setSessionTimeOut] = useState();
  const [prems, setPrems] = useState([]);
  const [fNameErr, setFNameErr] = useState(false);
  const [lNameErr, setLNameErr] = useState(false);
  const [uNameErr, setUNameErr] = useState(false);
  const [stoErr, setStoErr] = useState(false);

  const [checkVS, setCheckVS] = useState();
  const [checkES, setCheckES] = useState();
  const [checkDS, setCheckDS] = useState();
  const [checkVM, setCheckVM] = useState();
  const [checkEM, setCheckEM] = useState();
  const [checkDM, setCheckDM] = useState();
  const [checkAd, setCheckAd] = useState();


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (firstName && lastName && userName && sessionTimeOut && prems.length > 0) {
      let loginObj = {
        userName: userName,
      };
      const newUser = await axiosUtils.addItem("http://localhost:3005/login-data/", loginObj);

      const userId = await newUser.data._id

      let today = new Date();
      let dd = String(today.getDate()).padStart(2, "0");
      let mm = String(today.getMonth() + 1).padStart(2, "0");
      let yyyy = today.getFullYear();

      today = dd + "." + mm + "." + yyyy;
      let userObj = {
        name: {
          first: firstName,
          last: lastName,
        },
        _id: await userId.toString(),
        sessionTimeOut: +sessionTimeOut,
        createdDate: today,
      };
      axiosUtils.addItem("http://localhost:3005/users/", userObj);

      let premsObj = {
        userId: await userId.toString(),
        premissions: prems,
      };
      axiosUtils.addItem("http://localhost:3005/premissions/", premsObj);
      props.goToViewUsers()

    } else if (firstName && lastName && userName && sessionTimeOut) {
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
      alert("you have to pick at least one premissions");
    } else {
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
      alert("all fields are required");
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
    let arr = prems
    if (e.target.checked) {
      let newArr = [...arr, e.target.value]
      setPrems(newArr)
      
    } else {
      let newArr = arr.filter((item) => {
        return item !== e.target.value
      })
      setPrems(newArr)
    }
  };

  return (
    <div>
      <h3>Add user</h3>
      <form onSubmit={handleSubmit} noValidate autoComplete="off">
        <TextField
          style={textFieldStyle}
          label="first name"
          required
          variant="outlined"
          onChange={handleFName}
          error={fNameErr}
        ></TextField>
        <TextField
          style={textFieldStyle}
          label="last name"
          required
          variant="outlined"
          onChange={handleLName}
          error={lNameErr}
        ></TextField>
        <br />
        <TextField
          style={textFieldStyle}
          label="user name"
          required
          variant="outlined"
          onChange={handleUName}
          error={uNameErr}
        ></TextField>
        <TextField
          style={textFieldStyle}
          label="session time out in minutes"
          type="number"
          required
          variant="outlined"
          onChange={handleSTO}
          error={stoErr}
        ></TextField>
        <br /> <br />
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div style={checkDivStyle}>
            <b>shows premissions:</b> <br />
            view <Checkbox value={"view shows"} onChange={handleCheckbox} />{" "}
            <br />
            create <Checkbox value={"create shows"} onChange={handleCheckbox} />{" "}
            <br />
            delete <Checkbox
              value={"delete shows"}
              onChange={handleCheckbox}
            />{" "}
            <br />
            update {" "}
            <Checkbox value={"update shows"} onChange={handleCheckbox} />{" "}
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
            update {" "}
            <Checkbox value={"update members"} onChange={handleCheckbox} />{" "}
          </div>
          <div style={checkDivStyle}>
            <b>admin premissions:</b> <br />
            <Checkbox value={"admin premissions"} onChange={handleCheckbox} />
          </div>
        </div>
        <Button type="submit" variant="contained">
          create user
        </Button>
      </form>
    </div>
  );
}

export default AddUserComp;
