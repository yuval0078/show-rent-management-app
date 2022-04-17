const jsonfile = require("jsonfile");

const getAllPrems = () => {
  return new Promise((resolve, reject) => {
    jsonfile.readFile("./json/premissions.json", (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

const getPremById = async (id) => {
  const prems = await getAllPrems();
  const res = prems.filter((prem) => prem.userId.toString() === id.toString());
  return res;
};

const addPrem = async (prem) => {
    const prems = await getAllPrems();
    const newPrems = await prems;
    newPrems.push(prem);
    return new Promise((resolve, reject) => {
      jsonfile.writeFile("./json/premissions.json", newPrems, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve("premission created!");
        }
      });
    });
};

const deletePrem = async (id) => {
  const prems = await getAllPrems();
  const newPrems = await prems.filter((prem) => {
    return prem.userId.toString() !== id.toString();
  });
  return new Promise((resolve, reject) => {
    jsonfile.writeFile("./json/premissions.json", newPrems, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve("premission deleted!");
      }
    });
  });
};

const updatePrem = async (id, prem) => {
  const prems = await getAllPrems();
  const newPrems = await prems.filter((prem) => {
    return prem.userId.toString() !== id.toString();
  });
  newPrems.push(prem);
  return new Promise((resolve, reject) => {
    jsonfile.writeFile("./json/premissions.json", newPrems, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve("premission updated!");
      }
    });
  });
};

module.exports = { getAllPrems, getPremById, addPrem, updatePrem, deletePrem };
