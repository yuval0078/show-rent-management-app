import React, { useState, useEffect } from "react";
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";
import axiosUtils from "../../utils/axiosUtils";
import { Button, Link } from "@material-ui/core";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch } from "react-redux";
import { switchComp } from "../../utils/compReducer";
import { useSelector } from "react-redux";

function ViewShowsComp(props) {
  const [reload, updateReload] = useState(false);
  const [showsGrid, setShowsGrid] = useState();
  const [allSubs, setAllSubs] = useState();

  const userId = useSelector((state) => state.userId.value);

  const dispatch = useDispatch();


  const handleTitleClick = (show) => {
    props.goToEditShow(show);
  };
  const handleDelete = (id) => {
    axiosUtils.deleteItem("http://localhost:8000/shows/", id);
    allSubs.forEach((sub) => {
      if (sub.shows) {
        if (sub.shows.includes(id)) {
          let newShowsArr = sub.shows.filter((show) => {
            return show !== id;
          });
          let newSub = { ...sub, shows: newShowsArr };
          axiosUtils.updateItem(
            "http://localhost:8000/subs/",
            sub.memberId,
            newSub
          );
        }
      }
    });
    updateReload(!reload);
  };

  const handleMemberClick = (id) => {
    dispatch(switchComp("members"));
  };

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
      showsData.forEach((show) => {
        let subs = [];
        subsData.forEach((sub) => {
          if (sub.shows.includes(show._id)) {
            let memberName = membersData.filter((member) => {
              return member._id === sub.memberId;
            })[0].name;
            subs.push({ id: sub.memberId, name: memberName });
          }
        });
        const obj = {
          showId: show._id,
          image: show.image.medium,
          title: show.name,
          premiered: show.premiered,
          genres: show.genres,
          subs: subs,
        };
        allDataArr.push(obj);
      });
      let gridData = allDataArr.map((item, index) => {
        return {
          id: index + 1,
          image: item.image,
          title: {
            prems: premsData,
            title: item.title,
            id: item.showId,
            genres: item.genres,
            premiered: item.premiered,
            image: item.image,
          },
          year: item.premiered.split("-")[0],
          genres: item.genres.map((genre, index) => {
            return <li key={index}>{genre}</li>;
          }),
          subs: item.subs.map((sub, index) => {
            if (premsData.includes("update members")) {
              return (
                <li key={index}>
                  <Link
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      handleMemberClick(sub.id);
                    }}
                  >
                    {sub.name}
                  </Link>
                </li>
              );
            } else if (premsData.includes("view members")) {
              return (<li key={index}>{sub.name}</li>);
            } else {
              return (<li key={index}>no premissions</li>)
            }
          }),
          delete: { id: item.showId, prems: premsData },
        };
      });
      setShowsGrid(gridData);
    };
    getServerData();
  }, [reload]);

  const rows: GridRowsProp = showsGrid;

  const columns: GridColDef[] = [
    {
      field: "image",
      headerName: "image",
      headerAlign: "center",
      width: 115,
      align: "center",
      renderCell: (cellValues) => {
        return <img src={cellValues.value} alt="show cover" height="150px" />;
      },
    },
    {
      field: "title",
      headerName: "show title",
      headerAlign: "center",
      width: 250,
      align: "center",
      renderCell: (cellValues) => {
        if (cellValues.value.prems.includes("update shows")) {
          return (
            <Link
              onClick={() => {
                handleTitleClick(cellValues.value);
              }}
              style={{ cursor: "pointer" }}
            >
              {cellValues.value.title}
            </Link>
          );
        } else {
          return <p>{cellValues.value.title}</p>;
        }
      },
    },
    {
      field: "year",
      headerName: "year",
      headerAlign: "center",
      width: 80,
      align: "center",
    },
    {
      field: "genres",
      headerName: "genres",
      headerAlign: "center",
      width: 180,
      align: "center",
      renderCell: (cellValues) => {
        return (
          <div
            style={{
              textAlign: "left",
              overflow: "auto",
              height: 150,
              width: 180,
              margin: "auto",
            }}
          >
            <ul>{cellValues.value}</ul>
          </div>
        );
      },
    },
    {
      field: "subs",
      headerName: "subscribers",
      headerAlign: "center",
      width: 180,
      align: "center",
      renderCell: (cellValues) => {
        return (
          <div
            style={{
              textAlign: "left",
              overflow: "auto",
              height: 150,
              width: 180,
              margin: "auto",
            }}
          >
            <ul>{cellValues.value}</ul>
          </div>
        );
      },
    },
    {
      field: "delete",
      headerName: "delete show",
      headerAlign: "center",
      width: 150,
      align: "center",
      renderCell: (cellValues) => {
        if (cellValues.value.prems.includes("delete shows")) {
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
              you don't have <br /> premissions to <br /> delete shows
            </p>
          );
        }
      },
    },
  ];
  return (
    <div style={{ marginTop: 10, height: 400, width: "100%" }}>
      <DataGrid rowHeight={150} rows={rows} columns={columns} />
    </div>
  );
}

export default ViewShowsComp;
