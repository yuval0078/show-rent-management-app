import React, { useEffect, useState } from "react";
import { TextField, Checkbox, Button } from "@mui/material";
import axiosUtils from "../../utils/axiosUtils";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";

function EditMemberComp(props) {
  const [firstName, setFirstName] = useState(props.member.name.split(" ")[0]);
  const [lastName, setLastName] = useState(props.member.name.split(" ")[1]);
  const [email, setEmail] = useState(props.member.email);
  const [city, setCity] = useState(props.member.address.city);
  const [fNameErr, setFNameErr] = useState(false);
  const [lNameErr, setLNameErr] = useState(false);
  const [emailErr, setEmailErr] = useState(false);
  const [cityErr, setCityErr] = useState(false);
  const [newSub, setNewSub] = useState();
  const [showsArr, setShowsArr] = useState();
  const [options, setOptions] = useState();
  const [prevSubs, setPrevSubs] = useState(() => {
    if (props.member.subs) {
      return props.member.subs.map((sub) => {
        return sub._id;
      });
    } else return [];
  });

  useEffect(() => {
    const getServerData = async () => {
      const showsResp = await axiosUtils.getAll("http://localhost:8000/shows/");
      const showsData = await showsResp.data;
      setShowsArr(await showsData);
    };
    getServerData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const obj = {
      name: `${firstName} ${lastName}`,
      email: email,
      address: {city: city},
    }
    axiosUtils.updateItem('http://localhost:8000/members/', props.member.id, obj)
    props.goToViewMembers()
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

  const handleSelectClick = () => {
    const list = showsArr.map((show, index) => {
      return (
        <MenuItem
          style={{ width: 300, display: "block" }}
          key={index}
          value={show}
        >
          {show.name}
        </MenuItem>
      );
    });
    setOptions(list);
  };

  const handleSelectChange = (e) => {
    setNewSub(e.target.value);
  };

  const handleAddSub = () => {
    if (prevSubs.length === 0) {
      let obj = {
        memberId: props.member.id,
        shows: [newSub._id],
      };
      console.log(obj)
      axiosUtils.addItem("http://localhost:8000/subs/", obj);
      setPrevSubs([...prevSubs, newSub]);
      alert("subscription added successfully!")
    } else {
      if (!prevSubs.includes(newSub)) {
        let prevSubsArr = prevSubs;
        prevSubsArr.push(newSub._id);
        let obj = {
          memberId: props.member.id,
          shows: prevSubsArr,
        };
        axiosUtils.updateItem(
          "http://localhost:8000/subs/",
          props.member.id,
          obj
        );
        setPrevSubs([...prevSubs, newSub]);
        alert("subscription added successfully!")
      } else {
        alert ("this member already subscribed to this show!")
      }
    }
  };

  const textFieldStyle = {
    marginRight: 20,
    marginLeft: 20,
    marginBottom: 10,
    width: 350,
  };

  return (
    <div>
      <h3>update member</h3>
      <form onSubmit={handleSubmit} noValidate autoComplete="off">
        <TextField
          style={textFieldStyle}
          label="first name"
          defaultValue={firstName}
          required
          variant="outlined"
          onChange={handleFName}
          error={fNameErr}
        ></TextField>
        <TextField
          style={textFieldStyle}
          label="last name"
          defaultValue={lastName}
          required
          variant="outlined"
          onChange={handleLName}
          error={lNameErr}
        ></TextField>
        <br />
        <TextField
          style={textFieldStyle}
          label="email"
          defaultValue={email}
          required
          variant="outlined"
          onChange={handleEmail}
          error={emailErr}
        ></TextField>
        <TextField
          style={textFieldStyle}
          label="city"
          defaultValue={city}
          required
          variant="outlined"
          onChange={handleCity}
          error={cityErr}
        ></TextField>
        <br />
        add a new subscription
        <br />
        <Select
          onChange={handleSelectChange}
          onClick={handleSelectClick}
          style={{ width: 500, marginBottom: "30px" }}
          value={newSub}
        >
          {options}
        </Select>
        <Button variant="text" color="secondary" onClick={handleAddSub}>
          add
        </Button>{" "}
        <br /> <br />
        <Button type="submit" variant="contained">
          update member
        </Button>
      </form>
    </div>
  );
}

export default EditMemberComp;
