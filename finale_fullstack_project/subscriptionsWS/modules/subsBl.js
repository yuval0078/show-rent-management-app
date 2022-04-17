const Sub = require("./subSchema");

const getAllSubs = () => {
  return new Promise((resolve, reject) => {
    Sub.find({}, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

const getSubById = (id) => {
  return new Promise((resolve, reject) => {
    Sub.findOne({memberId: id}, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

const createSub = (sub) => {
  return new Promise((resolve, reject) => {
    let newSub = new Sub({
      memberId: sub.memberId,
      shows: sub.shows
    });
    newSub.save((err) => {
      if (err) {
        reject(err);
      } else {
        resolve(newSub);
      }
    });
  });
};

const updateSub = (id, sub) => {
  return new Promise((resolve, reject) => {
    Sub.findOneAndUpdate({memberId: id}, sub, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(sub);
      }
    });
  });
};

const deleteSub = (id) => {
  return new Promise((resolve, reject) => {
    Sub.findOneAndDelete({memberId: id}, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve("Sub deleted!");
      }
    });
  });
};

module.exports = {
    getAllSubs,
    getSubById,
    createSub,
    updateSub,
    deleteSub
}