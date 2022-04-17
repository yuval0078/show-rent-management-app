import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import {useLocation} from 'react-router-dom'
import LogedInBarComp from './LogedInBarComp'
import axiosUtils from '../utils/axiosUtils'




function AppBarComp(props) {
  const userId = useSelector((state) => state.userId.value);
  const [toolBar, setToolBar] = useState()

    const location = useLocation()
    useEffect(() => {
      changeContent(location.pathname);
    });


  const changeContent = async (pathname) => {
    
    if (pathname === '/workspace') {
      const resp1 = await axiosUtils.getById('http://localhost:3005/users/', userId)
      const resp2 = await axiosUtils.getById('http://localhost:3005/premissions/', userId)
      const userData = await resp1.data
      const premissions = await resp2.data
      let thisToolBar
      if (userData[0] && premissions[0]) {
        thisToolBar = <LogedInBarComp userData={userData[0]} premissions={premissions[0]}/>
      }
      setToolBar(thisToolBar)
    } else {
      setToolBar(undefined)
    }
  }


  return (
    <div>
      <AppBar
        position="static"
        style={{
          paddingLeft: 20,
          height: 75,
          backgroundColor: "white",
          opacity: 0.7,
        }}
      >
        <Box sx={{ display: "flex", flexWrap: "nowrap" }}>
          <div
            style={{
              alignSelf: "flex-start",
              width: 550,
              paddingRight: 10,
            }}
          >
            <h2>Subscriptions Management System</h2>
          </div>
          {toolBar}
        </Box>
      </AppBar>
    </div>
  );
}

export default AppBarComp;
