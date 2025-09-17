const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User =(sequelize,Sequelize)=>{

    const user = sequelize.define(
        'user',
        {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false,
            },
            fname: {
                type: Sequelize.STRING,
                allowNull: false
            },
            lname: {
                type: Sequelize.STRING,
                allowNull: false
            },
            email: {
                type: Sequelize.STRING,
                allowNull: false
            },
            is_email_verified: {
                type: Sequelize.BOOLEAN,
                allowNull: true,
                defaultValue: false
            },
            password: {
                type: Sequelize.STRING,
                allowNull: true,
                set(value) {
                  const hash = bcrypt.hashSync(
                    value,
                    parseInt(process.env.PASSWORD_SALT)
                  );
                  this.setDataValue('password', hash);
                },
              },
            date_of_birth: {
                type: Sequelize.DATE,
                allowNull: true
            },
            phone: {
                type: Sequelize.STRING,
                allowNull: false
            },
            
        },
        {
            timestamps: true,
        }
    )


    user.comparePassword = async function (enteredPassword, password) {
        return await bcrypt.compare(enteredPassword, password);
        };



        user.signAccessToken = async function (data) {
            const expiresInDays = 1;
            const expiresInMs = expiresInDays * 24 * 60 * 60 * 1000;
            const token = jwt.sign(data, process.env.ACCESS_TOKEN_KEY || '', {
              expiresIn: `${expiresInDays}d`,
            });
            return { token, expiresin: expiresInMs };
          };
        
          user.signRefreshToken = function (data) {
            const expiresInDays = 365;
            const expiresInMs = expiresInDays * 24 * 60 * 60 * 1000;
            const token = jwt.sign(data, process.env.REFERSH_TOKEN_KEY || '', {
              expiresIn: `${expiresInDays}d`,
            });
            return { token, expiresIn: expiresInMs };
          };
          
    return user;
}

module.exports = {
    User
}