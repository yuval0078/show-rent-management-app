import React, { useEffect, useState } from "react";
import { TextField, Button } from "@mui/material";
import axiosUtils from "../../utils/axiosUtils";

function AddShowComp(props) {
  const [title, setTitle] = useState();
  const [genres, setGenres] = useState();
  const [date, setDate] = useState();
  const [image, setImage] = useState();
  const [titleErr, setTitleErr] = useState(false);
  const [genresErr, setGenresErr] = useState(false);
  const [dateErr, setDateErr] = useState(false);
  const [imageErr, setImageErr] = useState(false);
  const [helperText, setHelperText] = useState(" ");

  const handleSubmit = async (e) => {
    e.preventDefault();
    let dateArr = date.split("-");
    if (title && genres && date && image) {
      if (
        dateArr[0].length === 4 &&
        dateArr[1].length === 2 &&
        dateArr[2].length === 2
      ) {
        let genresArr = genres.split(",");
        let genresArrNoSpace = genresArr.map((genre) => {
          return genre.trim();
        });
        let showObj = {
          name: title,
          genres: genresArrNoSpace,
          premiered: date,
          image: { medium: image },
        };
        axiosUtils.addItem("http://localhost:8000/shows/", showObj);
        props.goToViewShows();
      } else {
        setHelperText("please enter a valid date!")
        setDateErr(true)
      }
    } else {
      setHelperText("all fields are required!");
      if (!title) {
        setTitleErr(true);
      }
      if (!genres) {
        setGenresErr(true);
      }
      if (!date) {
        setDateErr(true);
      }
      if (!image) {
        setImageErr(true);
      }

      if (title) {
        setTitleErr(false);
      }
      if (genres) {
        setGenresErr(false);
      }
      if (date) {
        setDateErr(false);
      }
      if (image) {
        setImageErr(false);
      }
    }
  };

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleGenres = (e) => {
    setGenres(e.target.value);
  };

  const handlePremiered = (e) => {
    setDate(e.target.value);
  };

  const handleImage = (e) => {
    setImage(e.target.value);
  };

  const textFieldStyle = {
    marginRight: 20,
    marginLeft: 20,
    marginBottom: 10,
    width: 350,
  };

  return (
    <div>
      <h3>add show</h3>
      <b style={{ color: "red" }}>{helperText}</b> <br />
      <form onSubmit={handleSubmit} noValidate autoComplete="off">
        <TextField
          style={textFieldStyle}
          label="show title"
          required
          variant="outlined"
          onChange={handleTitle}
          error={titleErr}
        ></TextField>
        <TextField
          style={textFieldStyle}
          label="genres"
          helperText='separate with ","'
          required
          variant="outlined"
          onChange={handleGenres}
          error={genresErr}
        ></TextField>
        <br />
        <TextField
          pattern="\d{4}-\d{2}-\d{2}-\d{2}"
          style={textFieldStyle}
          helperText="yyyy-mm-dd"
          label="premiered"
          required
          variant="outlined"
          onChange={handlePremiered}
          error={dateErr}
        ></TextField>
        <TextField
          style={textFieldStyle}
          label="image url"
          type="url"
          required
          variant="outlined"
          onChange={handleImage}
          error={imageErr}
        ></TextField>{" "}
        <br /> <br /> <br />
        <Button type="submit" variant="contained">
          add show
        </Button>
      </form>
    </div>
  );
}

export default AddShowComp;
