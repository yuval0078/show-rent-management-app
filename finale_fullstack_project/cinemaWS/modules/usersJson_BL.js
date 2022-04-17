const jsonfile = require("jsonfile");

const getAllUsers = () => {
  return new Promise((resolve, reject) => {
    jsonfile.readFile("./json/users.json", (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

const getUserById = async (id) => {
  const users = await getAllUsers();
  const res = users.filter((user) => {
      return user._id === id;
  });
  return res;
};

const addUser = async (user) => {
  if (user._id) {
    const users = await getAllUsers();
    const newUsers = await users;
    newUsers.push(user);
    return new Promise((resolve, reject) => {
      jsonfile.writeFile("./json/users.json", newUsers, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve("user created!");
        }
      });
    });
  } else {
    return "no id";
  }
};

const deleteUser = async (id) => {
  const users = await getAllUsers();
  const newUsers = await users.filter((user) => {
      return user._id !== id;
  });
  return new Promise((resolve, reject) => {
    jsonfile.writeFile("./json/users.json", newUsers, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve("user deleted!");
      }
    });
  });
};

const updateUser = async (id, user) => {
  const users = await getAllUsers();
  const newUsers = await users.filter((user) => {
    if (user) {
      return user._id !== id;
    }
  });
  newUsers.push(user);
  return new Promise((resolve, reject) => {
    jsonfile.writeFile("./json/users.json", newUsers, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve("user updated!");
      }
    });
  });
};

module.exports = { getAllUsers, getUserById, addUser, updateUser, deleteUser };
