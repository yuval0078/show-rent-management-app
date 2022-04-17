import React, { useState, useEffect } from "react";
import axiosUtils from "../utils/axiosUtils";
import { Button, ButtonGroup } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { login } from "../utils/userIdReducer";
import { useNavigate } from "react-router-dom";
import { switchComp } from '../utils/compReducer'

function LogedInBarComp(props) {
  const [premissions, setPremissions] = useState(props.premissions);
  const [MembersBtn, setMembersBtn] = useState()
  const [showsBtn, setShowsBtn] = useState()
  const [usersBtn, setUsersBtn] = useState()
  const [variant1, setVariant1] = useState()
  const [variant2, setVariant2] = useState()
  const [variant3, setVariant3] = useState()

  const dispatch = useDispatch();


  useEffect(() => {
    const goToMembers = () => {
        setVariant1("contained")
        setVariant2("text")
        setVariant3("text")
        dispatch(switchComp("members"))
    }
  
    const goToShows = () => {
      setVariant2("contained")
      setVariant1("text")
      setVariant3("text")
      dispatch(switchComp("shows"))
    }
  
    const goToUsers = () => {
      setVariant3("contained")
      setVariant1("text")
      setVariant2("text")
      dispatch(switchComp("users"))
    }
   if (premissions.premissions.includes("view members")) {
       setMembersBtn(<Button variant={variant1} onClick={goToMembers}>members</Button>)
   }
   if (premissions.premissions.includes("view shows")) {
       setShowsBtn(<Button variant={variant2} onClick={goToShows}>Shows</Button>)
   }
   if (premissions.premissions.includes("admin premissions")) {
       setUsersBtn(<Button variant={variant3} onClick={goToUsers}>Users</Button>)
   }
  }, [ dispatch, premissions.premissions, variant1, variant2, variant3]);

  const navigate = useNavigate();

  const logOut = () => {
    dispatch(login(""));
    navigate("/login");
  };

  

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        flexWrap: "nowrap",
        height: 75
      }}
    >
      <ButtonGroup variant="text">
        {MembersBtn}
        {showsBtn}
        {usersBtn}
      </ButtonGroup>
      <div style={{ width: 200, marginLeft: "auto", alignSelf: "flex-end" }}>
        <b>hello {props.userData.name.first}</b> <br />
        <Button onClick={logOut} variant="contained">log out</Button>
      </div>
    </div>
  );
}

export default LogedInBarComp;
