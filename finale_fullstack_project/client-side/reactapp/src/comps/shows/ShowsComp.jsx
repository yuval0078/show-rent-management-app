import React, { useState, useEffect } from "react";
import { Button, ButtonGroup } from "@material-ui/core";
import ViewShowsComp from "./ViewShowsComp";
import EditShowComp from "./EditShowComp";
import AddShowComp from "./AddShowComp";
import { useSelector } from "react-redux";
import axiosUtils from "../../utils/axiosUtils";

function ShowsComp(props) {
  const goToEditShow = (show) => {
    setComp(<EditShowComp show={show} goToViewShows={goToViewShows} />);
    setBtnVar1("text")
  };
  const goToViewShows = () => {
    setComp(<ViewShowsComp goToEditShow={goToEditShow} userPrems={premissions}/>);
    setBtnVar1("contained")
  }

  const userId = useSelector((state) => state.userId.value);

  const [premissions, setPremissions] = useState()
  const [btnVar1, setBtnVar1] = useState("contained");
  const [comp, setComp] = useState(
    <ViewShowsComp goToEditShow={goToEditShow} userPrems={premissions} />
  );
  const [addBtn, setAddBtn] = useState();


  const viewBtnClick = () => {
      setBtnVar1("contained");
      if (premissions.includes("create shows")) {
        setAddBtn(
          <Button size="small" variant="text" onClick={addBtnClick}>
            add show
          </Button>
        );
      }
      setComp(<ViewShowsComp goToEditShow={goToEditShow} userPrems={premissions} />)
  }

  const addBtnClick = () => {
    setAddBtn(
      <Button size="small" variant="contained" onClick={addBtnClick}>
        add show
      </Button>
    );
    setBtnVar1("text");
    setComp(<AddShowComp goToViewShows={goToViewShows} />)
  }

  useEffect(() => {
    const getPrems = async () => {
      const resp = await axiosUtils.getById(
        "http://localhost:3005/premissions/",
        userId
      );
      const data = await resp.data;
      setPremissions(data[0].premissions);

      if (await data[0].premissions.includes("create shows")) {
        setAddBtn(
          <Button size="small" variant="text" onClick={addBtnClick}>
            add show
          </Button>
        );
      }
    };
    getPrems();
  }, []);


  return (
    <div>
      <h3>shows management</h3>
      <ButtonGroup>
        <Button size="small" variant={btnVar1} onClick={viewBtnClick}>
          view shows
        </Button>
        {addBtn}
      </ButtonGroup>
      {comp}
    </div>
  );
}

export default ShowsComp;
