import React, { useState, useEffect } from "react";
import { Button, ButtonGroup } from "@material-ui/core";
import ViewMembersComp from "./ViewMembersComp";
import EditMemberComp from "./EditMemberComp";
import AddMemberComp from "./AddMemberComp";
import { useSelector } from "react-redux";
import axiosUtils from "../../utils/axiosUtils";

function MembersComp(props) {
  const goToEditMember = (member) => {
    setComp(<EditMemberComp member={member} goToViewMembers={goToViewMembers} />);
    setBtnVar1("text")
  };
  const goToViewMembers = () => {
    setComp(<ViewMembersComp goToEditMember={goToEditMember} userPrems={premissions} />)
    setBtnVar1("contaied")
    setAddBtn(
      <Button size="small" variant="text" onClick={addBtnClick}>
        add member
      </Button>
    );
  }

  const userId = useSelector((state) => state.userId.value);
  const [premissions, setPremissions] = useState();
  const [btnVar1, setBtnVar1] = useState("contained");
  const [comp, setComp] = useState(
    <ViewMembersComp goToEditMember={goToEditMember} userPrems={premissions} />
  );
  const [addBtn, setAddBtn] = useState();


  const viewBtnClick = () => {
    setBtnVar1("contained");
    if (premissions.includes("create members")) {
      setAddBtn(
        <Button size="small" variant="text" onClick={addBtnClick}>
          add member
        </Button>
      );
    }

    setComp(<ViewMembersComp goToEditMember={goToEditMember} userPrems={premissions} />);
  };

  const addBtnClick = () => {
    setAddBtn(
      <Button size="small" variant="contained" onClick={addBtnClick}>
        add member
      </Button>
    );
    setBtnVar1("text");
    setComp(<AddMemberComp goToViewMembers={goToViewMembers} />);
  };

  useEffect(() => {
    const getPrems = async () => {
      const resp = await axiosUtils.getById(
        "http://localhost:3005/premissions/",
        userId
      );
      const data = await resp.data;
      setPremissions(data[0].premissions);

      if (await data[0].premissions.includes("create members")) {
        setAddBtn(
          <Button size="small" variant="text" onClick={addBtnClick}>
            add member
          </Button>
        );
      }
    };
    getPrems();
  }, []);

  return (
    <div>
      <h3>members management</h3>
      <ButtonGroup>
        <Button size="small" variant={btnVar1} onClick={viewBtnClick}>
          view members
        </Button>
        {addBtn}
      </ButtonGroup>
      {comp}
    </div>
  );
}

export default MembersComp;
