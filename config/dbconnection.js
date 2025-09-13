const mongoose =require("mongoose");


const dbConnection = async () =>{
    try{
        mongoose.connect(process.env.DBURI ,{
          ssl:true,
          tlsAllowInvalidCertificates:false
        })
        console.log("Database connection established");
        
    }catch(err){
        console.log(err);
        
    }
}

module.exports=dbConnection;
