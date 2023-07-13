
const { User } = require('../models');

const userData = [
  {
    name: "Sal",
    email: "sal@hotmail.com",
    passwrd: "password12345",
  },
  {
    name: "Lernantino",
    email: "lernantino@gmail.com",
    password: "password12345",
  },
  {
    name: "Amiko",
    email: "amiko2k20@aol.com",
    passwrd: "password12345",
  }
];

const seedUsers = async () => {
  for (let i = 0; i < userData.length; i++) {
    const user = userData[i];
    await User.create(user);
  }
};

module.exports = seedUsers;
