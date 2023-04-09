const mongoose=require('mongoose');
require('dotenv').config()
const Mongoose_Url=process.env.Mongoose_Url

const connection=mongoose.connect(Mongoose_Url)


module.exports={
    connection
}