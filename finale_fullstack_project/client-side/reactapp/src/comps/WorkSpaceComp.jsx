import React, { useEffect, useState } from "react";
import { Grid, Paper } from "@material-ui/core";
import axiosUtils from "../utils/axiosUtils";
import { useSelector } from "react-redux";
import UsersComp from "./users/UsersComp";
import ShowsComp from "./shows/ShowsComp";
import MembersComp from "./members/MembersComp";


function WorkSpaceComp(props) {
  const [shows, setShows] = useState();
  const [members, setMembers] = useState();
  const [subs, setSubs] = useState();
  const [users, setUsers] = useState();
  const [comp, setComp] = useState();
  const [prems, setPrems] = useState();
  const [loginData, setLoginData] = useState();

  const userId = useSelector((state) => state.userId.value);
  let currentComp = useSelector((state) => state.comp.value)


  useEffect(() => {
    const getShowsData = async () => {
      const resp = await axiosUtils.getAll(
        "http://localhost:8000/shows/");
      const data = await resp.data;
      setShows(data);
    };
    getShowsData()

    const getMembersData = async () => {
      const resp = await axiosUtils.getAll(
        "http://localhost:8000/members/");
      const data = await resp.data;
      setMembers(data);
    };
    getMembersData()

    const getSubsData = async () => {
      const resp = await axiosUtils.getAll(
        "http://localhost:8000/subs/");
      const data = await resp.data;
      setSubs(data);
    };
    getSubsData()

    const getUsersData = async () => {
      const resp = await axiosUtils.getAll(
        "http://localhost:3005/users/");
      const data = await resp.data;
      setUsers(data);
    };
    getUsersData();

    const getPremsData = async () => {
      const resp = await axiosUtils.getAll(
        "http://localhost:3005/premissions/");
      const data = await resp.data;
      setPrems(data);
    };
    getPremsData();

    const getLoginsData = async () => {
        const resp = await axiosUtils.getAll("http://localhost:3005/login-data/");
        const data = await resp.data;
        setLoginData(data)
    }
    getLoginsData();

    if(currentComp === "users") {
        setComp(<UsersComp/>)
    }
    if(currentComp === "shows") {
        setComp(<ShowsComp subs={subs} members={members} shows={shows} />)
    }
    if(currentComp === "members") {
        setComp(<MembersComp subs={subs} members={members} shows={shows} />)
    }
    if(currentComp === "wellcome") {
        setComp(<h2>wellcome to the work space</h2>)
    }
  }, [userId, currentComp]);

  const paperStyle = {
    padding: 10,
    height: 520,
    width: 1000,
    margin: "40px auto",
    opacity: 0.9,
    textAlign: "center",
  };

  return (
    <div>
      <Grid>
        <Paper elevation={20} style={paperStyle}>
          {comp}
        </Paper>
      </Grid>
    </div>
  );
}
export default WorkSpaceComp;
