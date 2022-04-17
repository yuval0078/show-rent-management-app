const Member = require("./MemberSchema");

const getAllMembers = () => {
  return new Promise((resolve, reject) => {
    Member.find({}, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

const getMemberById = (id) => {
  return new Promise((resolve, reject) => {
    Member.findById(id, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

const createMember = (member) => {
  return new Promise((resolve, reject) => {
    let newMember = new Member({
        name: member.name,
        username: member.userName,
        email: member.email,
        address: member.address,
        phone: member.phone
    });
    newMember.save((err) => {
      if (err) {
        reject(err);
      } else {
        resolve(newMember);
      }
    });
  });
};

const updateMember = (id, member) => {
  return new Promise((resolve, reject) => {
    Member.findByIdAndUpdate(id, member, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(member);
      }
    });
  });
};

const deleteMember = (id) => {
  return new Promise((resolve, reject) => {
    Member.findByIdAndDelete(id, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve("Member deleted!");
      }
    });
  });
};

module.exports = {
    getAllMembers,
    getMemberById,
    createMember,
    updateMember,
    deleteMember
}