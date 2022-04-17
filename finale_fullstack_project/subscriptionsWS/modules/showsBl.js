const Show = require("./showSchema");

const getAllShows = () => {
  return new Promise((resolve, reject) => {
    Show.find({}, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

const getShowById = (id) => {
  return new Promise((resolve, reject) => {
    Show.findById(id, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

const createShow = (show) => {
  return new Promise((resolve, reject) => {
    let newShow = new Show({
        url: show.url,
        name: show.name,
        language: show.language,
        genres: show.genres,
        premiered: show.premiered,
        ended: show.ended,
        officialSite: show.officialSite,
        rating: show.rating,
        image: show.image,
        summary: show.summary,
    });
    newShow.save((err) => {
      if (err) {
        reject(err);
      } else {
        resolve(newShow);
      }
    });
  });
};

const updateShow = (id, show) => {
  return new Promise((resolve, reject) => {
    Show.findByIdAndUpdate(id, show, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(show);
      }
    });
  });
};

const deleteShow = (id) => {
  return new Promise((resolve, reject) => {
    Show.findByIdAndDelete(id, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve("Show deleted!");
      }
    });
  });
};

module.exports = {
    getAllShows,
    getShowById,
    createShow,
    updateShow,
    deleteShow
}