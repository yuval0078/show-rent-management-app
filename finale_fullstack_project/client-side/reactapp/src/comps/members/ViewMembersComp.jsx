import React, { useState, useEffect } from "react";
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";
import axiosUtils from "../../utils/axiosUtils";
import { Button, Link } from "@material-ui/core";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch } from "react-redux";
import { switchComp } from "../../utils/compReducer";
import { useSelector } from "react-redux";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

function ViewMembersComp(props) {
  const [reload, updateReload] = useState(false);
  const [membersGrid, setMembersGrid] = useState();
  const [allSubs, setAllSubs] = useState();

  const userId = useSelector((state) => state.userId.value);
  // const elementId = useSelector((state) => {return state.elementId.value})

  const dispatch = useDispatch();

  const handleNameClick = (member) => {
    props.goToEditMember(member);
  };

  const handleDelete = (id) => {
    axiosUtils.deleteItem("http://localhost:8000/members/", id);
    axiosUtils.deleteItem("http://localhost:8000/subs/", id);
    updateReload(!reload);
  };

  const handleShowClick = (show) => {
    dispatch(switchComp("shows"));
  }

  useEffect(() => {
    const getServerData = async () => {
      const premsResp = await axiosUtils.getById(
        "http://localhost:3005/premissions/",
        userId
      );
      const premsData = await premsResp.data[0].premissions;

      const showsResp = await axiosUtils.getAll("http://localhost:8000/shows/");
      const showsData = await showsResp.data;

      const subsResp = await axiosUtils.getAll("http://localhost:8000/subs/");
      const subsData = await subsResp.data;
      setAllSubs(subsData);

      const membersResp = await axiosUtils.getAll(
        "http://localhost:8000/members/"
      );
      const membersData = await membersResp.data;

      let allDataArr = [];
      membersData.forEach((member) => {
        let memberSub = subsData.filter((sub) => {
          return sub.memberId === member._id;
        });

        let memberShowsIds;
        if (memberSub.length > 0) {
          memberShowsIds = memberSub[0].shows;
        }

        let memberShows = [];
        if (memberShowsIds) {
          showsData.forEach((show) => {
            if (memberShowsIds.includes(show._id)) {
              memberShows.push(show);
            }
          });
          console.log(memberShows);
        }

        const obj = {
          memberId: member._id,
          name: member.name,
          email: member.email,
          address: member.address,
          subs: memberShows,
        };
        allDataArr.push(obj);
      });
      let gridData = allDataArr.map((item, index) => {
        return {
          id: index + 1,
          name: {
            name: item.name,
            prems: premsData,
            id: item.memberId,
            email: item.email,
            address: item.address,
            subs: item.subs,
          },
          email: item.email,
          city: item.address.city,
          subs: item.subs.map((sub) => {
            if (premsData.includes("update shows")) {
              return (
                <li key={index}>
                  <Link
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      handleShowClick(sub);
                    }}
                  >
                    {sub.name}
                  </Link>
                </li>
              );
            } else {
              return <li key={index}>{sub.name}</li>;
            }
          }),
          delete: { id: item.memberId, prems: premsData },
        };
      });
      setMembersGrid(gridData);
    };
    getServerData();
  }, [reload]);

  const rows: GridRowsProp = membersGrid;

  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "name",
      headerAlign: "center",
      width: 180,
      align: "center",
      renderCell: (cellValues) => {
        if (cellValues.value.prems.includes("update members")) {
          return (
            <Link
              onClick={() => {
                handleNameClick(cellValues.value);
              }}
              style={{ cursor: "pointer" }}
            >
              {cellValues.value.name}
            </Link>
          );
        } else {
          return <p>{cellValues.value.name}</p>;
        }
      },
    },
    {
      field: "email",
      headerName: "email",
      headerAlign: "center",
      width: 180,
      align: "center",
    },
    {
      field: "city",
      headerName: "city",
      headerAlign: "center",
      width: 150,
      align: "center",
    },
    {
      field: "subs",
      headerName: "subscriptions",
      headerAlign: "center",
      width: 300,
      align: "center",
      renderCell: (cellValues) => {
        return (
          <div
            style={{
              textAlign: "left",
              overflow: "auto",
              height: 60,
              width: 300,
              margin: "auto",
              display: "flex"
            }}
          >
            <ul>{cellValues.value}</ul>
          </div>
        );
      },
    },
    {
      field: "delete",
      headerName: "delete member",
      headerAlign: "center",
      width: 150,
      align: "center",
      renderCell: (cellValues) => {
        if (cellValues.value.prems.includes("delete members")) {
          return (
            <Button
              variant="contained"
              color="secondary"
              size="small"
              startIcon={<DeleteIcon />}
              onClick={() => {
                handleDelete(cellValues.value.id);
              }}
            >
              delete
            </Button>
          );
        } else {
          return (
            <p>
              you don't have <br /> premissions to <br /> delete members
            </p>
          );
        }
      },
    },
  ];

  return (
    <div style={{ marginTop: 10, height: 400, width: "100%" }}>
      <DataGrid rowHeight={60} rows={rows} columns={columns} />
    </div>
  );
}

export default ViewMembersComp;
