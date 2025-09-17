const { ResponseOk, ErrorHandler } = require('../../Utils/ResponseHandler');
const db = require('../../Models/Config/db.config');
const Static_Data = db.static_data;

const GetStaticData = async (req,res) =>{
    try { 
        const data = await Static_Data.findAll({
            where:{
                type:req.query.type
            }
        });
        return ResponseOk(res,200,"Static data fetched successfully",data);
    } catch (error) {
        return ErrorHandler(res,400,error.message);
    }
}

module.exports = {
    GetStaticData
}