const seedComment = require('./commentSeeder');
const seedPost = require('./postSeeder');
const seedUser = require('./userSeeder');

const sequelize = require('../config/connection');

const seedAll = async () => {

  await sequelize.sync({ force: true });
  console.log('\n----- DATABASE SYNCED -----\n');

  await seedComment();
  console.log('\n----- Comment SEEDED -----\n');

  await seedUser();
  console.log('\n----- User SEEDED -----\n');

  await seedPost();
  console.log('\n----- Post SEEDED -----\n');

  process.exit(0);
};

seedAll();