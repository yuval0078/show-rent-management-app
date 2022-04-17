import React, { useState } from "react";
import { Button, ButtonGroup } from "@material-ui/core";
import ViewUsersComp from "./ViewUsersComp"
import AddUserComp from "./AddUserComp"
import EditUserComp from "./EditUserComp"

function UsersComp(props) {
  const goToEditUser = (user) => {
    setComp(<EditUserComp user={user} goToViewUsers={viewBtnClick} />)
    setBtnVar1("text")
    setBtnVar2("text")
  }

  const [currentComp, setCurrentComp] = useState();
  const [btnVar1, setBtnVar1] = useState("contained");
  const [btnVar2, setBtnVar2] = useState("text");
  const [comp, setComp] = useState(<ViewUsersComp goToEditUser={goToEditUser} />)

  const viewBtnClick = () => {
      setBtnVar1("contained");
      setBtnVar2("text");
      setComp(<ViewUsersComp goToEditUser={goToEditUser} />)
  }
  const addBtnClick = () => {
    setBtnVar2("contained");
    setBtnVar1("text");
    setComp(<AddUserComp goToViewUsers={viewBtnClick} />)
  }



  return (
    <div>
      <h3>users management</h3>
      <ButtonGroup>
        <Button size="small" variant={btnVar1} onClick={viewBtnClick}>view users</Button>
        <Button size="small" variant={btnVar2} onClick={addBtnClick}>add user</Button>
      </ButtonGroup>
      {comp}
    </div>
  );
}

export default UsersComp;
