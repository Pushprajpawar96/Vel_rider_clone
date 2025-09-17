const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { authJwt } = require('./Middleware/AuthJwt');
const Routes = require('./Routes/Routes');
const db = require('./Models/Config/db.config');
const { MakeData } = require('./superadmin');


const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(authJwt())
app.use('/api/v1', Routes);

app.listen(PORT, process.env.HOST, () => {
    try {
      db.sequelize.sync({ alter: true }).then(async () => {
        const args = process.argv;
        console.log(args);
        if (args[2] === 'Add_Data') {
          console.log('Adding data to database. Please wait...');
          MakeData();
        } else {
          console.log('Superadmin work in progress. Please wait...');
        }
  
        console.log('DB has been re-sync,', process.env.HOST);
        
      });
    } catch (error) {
      console.log('Database not sync: ', error);
    }
  });
