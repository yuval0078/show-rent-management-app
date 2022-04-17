import React, { useEffect, useState } from "react";
import { TextField, Checkbox, Button } from "@mui/material";
import axiosUtils from "../../utils/axiosUtils";


function AddMemberComp(props) {
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [city, setCity] = useState();
  const [fNameErr, setFNameErr] = useState(false);
  const [lNameErr, setLNameErr] = useState(false);
  const [emailErr, setEmailErr] = useState(false);
  const [cityErr, setCityErr] = useState(false);
  const [helperText, setHelperText] = useState("");


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (firstName && lastName && email && city) {
      const newMember = {
        name: `${firstName} ${lastName}`,
        email: email,
        address: {city: city}
      }
      axiosUtils.addItem('http://localhost:8000/members/', newMember)
      props.goToViewMembers()
    } else {
      if (!firstName) {
        setFNameErr(true);
      }
      if (!lastName) {
        setLNameErr(true);
      }
      if (!email) {
        setEmailErr(true);
      }
      if (!city) {
        setCityErr(true);
      }
      if (firstName) {
        setFNameErr(false);
      }
      if (lastName) {
        setLNameErr(false);
      }
      if (email) {
        setEmailErr(false);
      }
      if (city) {
        setCityErr(false);
      }
      setHelperText("all fields are required!")
    }
  };

  const handleFName = (e) => {
    setFirstName(e.target.value);
  };

  const handleLName = (e) => {
    setLastName(e.target.value);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleCity = (e) => {
    setCity(e.target.value);
  };

  const textFieldStyle = {
    marginRight: 20,
    marginLeft: 20,
    marginBottom: 10,
    width: 350,
  };

  return (
    <div>
      <h3>Add member</h3>
      <p style={{color: "red"}}>{helperText}</p>
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
          label="email"
          required
          variant="outlined"
          onChange={handleEmail}
          error={emailErr}
        ></TextField>
        <TextField
          style={textFieldStyle}
          label="city"
          required
          variant="outlined"
          onChange={handleCity}
          error={cityErr}
        ></TextField>
        <br /> <br />

        <Button type="submit" variant="contained">
          create member
        </Button>
      </form>
    </div>
  );
}

export default AddMemberComp;
