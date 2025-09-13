const express = require ("express");
require("dotenv").config();
const cors =require("cors");
const dbConnection = require("./config/dbconnection");
const userRoutes = require("./routes/userRoutes");
const taskRoutes = require("./routes/taskRoutes");

const app = express();

app.use(express.json());
app.use(cors());
app.use("/auth", userRoutes);
app.use("/task", taskRoutes)

let Port = process.env.PORT || 8081

dbConnection();
app.listen(Port , () =>{
    console.log(`server runnig on ${Port}`);
    
});