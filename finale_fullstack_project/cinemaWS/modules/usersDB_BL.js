const User = require("./userSchema");

const getAllUsers = () => {
  return new Promise((resolve, reject) => {
    User.find({}, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

const getUserById = (id) => {
  return new Promise((resolve, reject) => {
    User.findById(id, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

const createUser = (user) => {
  return new Promise((resolve, reject) => {
    let newUser = new User({
        userName: user.userName,
        password: user.password
    });
    newUser.save((err) => {
      if (err) {
        reject(err);
      } else {
        resolve(newUser);
      }
    });
  });
};

const updateUser = (id, user) => {
  return new Promise((resolve, reject) => {
    User.findByIdAndUpdate(id, user, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(user);
      }
    });
  });
};

const deleteUser = (id) => {
  return new Promise((resolve, reject) => {
    User.findByIdAndDelete(id, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve("User deleted!");
      }
    });
  });
};

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
}