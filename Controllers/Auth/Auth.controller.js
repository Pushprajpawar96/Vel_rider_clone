const { ResponseOk, ErrorHandler } = require('../../Utils/ResponseHandler');
const db = require('../../Models/Config/db.config');
const Users = db.user;
const { sendToken } = require('../../Utils/TokenUtils');
const { sendRefreshToken } = require('../../Utils/TokenUtils');




const UserRegister = async (req,res) =>{
    try {
        
        const { fname,lname,email, password,phone,date_of_birth,confirm_password} = req.body;
        const users = await Users.findOne({
          where: { email},
        })
        if (users) {
          return ErrorHandler(res, 200, "User already exists with this email");
        }
        if(!fname || !lname || !email || !password || !phone || !date_of_birth) {
            return ErrorHandler(res, 400, "All fields are required");
        }
        if(password !== confirm_password) {
            return ErrorHandler(res, 400, "Password and confirm password do not match");
        }
        const user = await Users.create({
            fname,
            lname,
            email,
            password,
            phone,
            date_of_birth,
        });
        return ResponseOk(res, 200, "User registered successfully", user);
    } catch (error) {
        console.log(error);
        return ErrorHandler(res, 400, error.message);
    }
}


const LoginUser = async (req, res) => {
    try {
      const { email, password, } = req.body;
      const users = await Users.findOne({
        where: { email },
      })
      if (!users) {
        return ErrorHandler(res, 401, "User not found with this email");
      }
  
      const isMatched = await Users.comparePassword(password, users.password);
      if (!isMatched) {
        return ErrorHandler(res, 401, "Invalid password");
      }
      const user_data = {
        id: users.id,
        email: users?.email || null,
        first_name: users?.fname,
        last_name: users?.lname,
        phone: users?.phone,
        date_of_birth: users?.date_of_birth,
      };
  
  
      const access_token_data = await sendToken(user_data, res);
      const { token, expiresin } = access_token_data;
      const refresh_token_data = await sendRefreshToken(user_data, res);
      const { refresh_token, expiresIn } = refresh_token_data;
      return ResponseOk(
        res,
        200,
        "Login successful",
        {
          access_token:token,
          expiresin,
          refresh_token,
          expiresIn,
        }
      );
    } catch (error) {
        console.log("error",error);
      return ErrorHandler(res, 400, error)
    }
  }

module.exports = {
    UserRegister,
    LoginUser
}