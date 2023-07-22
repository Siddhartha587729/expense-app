const express = require('express');
const app = express();
const path=require('path');
const port=5000;
const mongoose = require('mongoose');
if(process.env.NODE_ENV!=="production"){
    require('dotenv').config()
}
const dburl=process.env.db_url;
mongoose.connect(dburl)
.then(()=>{
    console.log("Mongoose Connected Successfully");
})
.catch((err)=>{
    console.log(err.message);
});
app.listen(port,()=>{console.log(`Server Started at ${port}`)})