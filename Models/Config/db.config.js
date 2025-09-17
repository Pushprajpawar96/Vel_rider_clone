const Sequelize = require('sequelize');
const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_DIALECT } = require('../../config');

const {
  User
} = require('../User.model');
const {
  Static_Data
} = require('../StaticData.model');
const dbName = DB_NAME;
const dbuser = DB_USER;
const dbpassword = DB_PASSWORD;



const sequelize = new Sequelize(dbName, dbuser, dbpassword, {
    host: DB_HOST,
    port: 3306,
    dialect: 'mysql',
    logging: (sql, timing) => {
      if (timing && timing > 1000) {
        console.warn(`SLOW QUERY [${timing}ms]:`, sql);
      }
    },
    benchmark: true,
    dialectOptions: {
      charset: 'utf8mb4',
    },
    define: {
      charset: 'utf8mb4',
      collate: 'utf8mb4_unicode_ci',
    },
    pool: {
      max: 20,
      min: 0,
      acquire: 60000,
      idle: 10000
    }
  });
  
  sequelize
    .authenticate()
    .then(() => {
      console.log(`Database connected.Please wait for sync.... `);
    })
    .catch(err => {
      console.log(err);
    });
  
  const db = {};
  
  db.Sequelize = Sequelize;
  db.sequelize = sequelize;

  db.user = User(sequelize, Sequelize);
  db.static_data = Static_Data(sequelize, Sequelize);

  module.exports = db;
