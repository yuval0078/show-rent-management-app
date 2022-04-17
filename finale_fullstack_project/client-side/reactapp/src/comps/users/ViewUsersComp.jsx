import React, { useEffect, useState } from "react";
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";
import axiosUtils from "../../utils/axiosUtils";
import { Button, Link } from "@material-ui/core";
import DeleteIcon from "@mui/icons-material/Delete";

function ViewUsersComp(props) {
  const [usersGrid, setUsersGrid] = useState();
  const [reload, updateReload] = useState(false);

  useEffect(() => {
    const getServerData = async () => {
      const loginResp = await axiosUtils.getAll(
        "http://localhost:3005/login-data"
      );
      const loginData = await loginResp.data;

      const usersResp = await axiosUtils.getAll("http://localhost:3005/users");
      const usersData = await usersResp.data;

      const premsResp = await axiosUtils.getAll(
        "http://localhost:3005/premissions"
      );
      const premsData = await premsResp.data;

      let allDataArr = [];
      await premsData.forEach(async (prem) => {
        let obj;
        await usersData.forEach(async (user) => {
          await loginData.forEach((login) => {
            if (prem.userId === user._id && prem.userId === login._id) {
              obj = {
                _id: user._id,
                name: user.name,
                userName: login.userName,
                createdDate: user.createdDate,
                sessionTimeOut: user.sessionTimeOut,
                premissions: prem.premissions,
              };
              allDataArr.push(obj);
            }
          });
        });
      });
      let gridData = allDataArr.map((item, index) => {
        return {
          id: index + 1,
          name: {
            name: `${item.name.first} ${item.name.last}`,
            userId: item._id.toString(),
            userName: item.userName,
            sessionTimeOut: item.sessionTimeOut,
            premissions: item.premissions,
            createdDate: item.createdDate
          },
          "createdDate": item.createdDate,
          "sessionTimeOut": item.sessionTimeOut + " minutes",
          userName: item.userName,
          premissions: item.premissions.map((prem, index) => {
            return <li key={index}>{prem}</li>;
          }),
          "delete user": {userId: item._id.toString(), prems: item.premissions},
        };
      });
      setUsersGrid(gridData);
    };
    getServerData();
  }, [reload]);

  const handleDeleteClick = (id) => {
    axiosUtils.deleteItem("http://localhost:3005/users/", id);
    axiosUtils.deleteItem("http://localhost:3005/login-data/", id);
    axiosUtils.deleteItem("http://localhost:3005/premissions/", id);
    updateReload(!reload);
  };
  const handleNameClick = (user) => {
    props.goToEditUser(user)
  };

  const rows: GridRowsProp = usersGrid;

  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "name",
      headerAlign: "center",
      width: 150,
      align: "center",
      renderCell: (cellValues) => {
        return (
          <Link
          style={{cursor: "pointer"}}
            onClick={() => {
              handleNameClick(cellValues.value);
            }}
          >
            {cellValues.value.name}
          </Link>
        );
      },
    },
    {
      field: "userName",
      headerName: "user name",
      headerAlign: "center",
      width: 150,
      align: "center",
    },
    {
      field: "createdDate",
      headerName: "created date",
      headerAlign: "center",
      width: 150,
      align: "center",
    },
    {
      field: "sessionTimeOut",
      headerName: "session time out",
      headerAlign: "center",
      width: 150,
      align: "center",
    },
    {
      field: "premissions",
      headerName: "premissions",
      headerAlign: "center",
      width: 200,
      align: "center",
      renderCell: (cellValues) => {
        return (
          <div style={{ overflow: "auto", height: 60, width: 200, textAlign: "left" }}>
            <ul>{cellValues.value}</ul>
          </div>
        );
      },
    },
    {
      field: "delete user",
      headerName: "delete user",
      headerAlign: "center",
      width: 150,
      align: "center",
      renderCell: (cellValues) => {
        if(!cellValues.value.prems.includes("admin premissions")) {
        return (
          <Button
            variant="contained"
            color="secondary"
            size="small"
            startIcon={<DeleteIcon />}
            onClick={() => {
              handleDeleteClick(cellValues.value.userId);
            }}
          >
            delete
          </Button>
        )} else {
          return (
            <div style={{fontSize: "xs"}}>admin cannot <br /> be deleted</div>
          )
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
export default ViewUsersComp;
