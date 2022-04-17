import React from "react";
import LoginComp from "./LoginComp";
import AppBarComp from "./AppBarComp";
import { Route, Routes } from "react-router-dom";
import RegisterComp from "./RegisterComp";
import SuccessRegComp from './SuccessRegComp'
import NotFoundComp from "./NotFoundComp";
import WorkSpaceComp from "./WorkSpaceComp";

function PlaceHolder() {


  return (
    <div className="placeholder">
      <AppBarComp />
      <Routes>
        <Route exact path="/" element={<LoginComp />} />
        <Route exact path="/login" element={<LoginComp />} />
        <Route exact path="/register" element={<RegisterComp />} />
        <Route exact path="/reg-suc" element={<SuccessRegComp />} />
        <Route exact path="*" element={<NotFoundComp />} />
        <Route exact path="/workspace" element={<WorkSpaceComp />} />
      </Routes>
    </div>
  );
}

export default PlaceHolder;
