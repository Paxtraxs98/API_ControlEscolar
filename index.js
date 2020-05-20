const mongoose = require("mongoose");
const app = require("./app");
const port = process.env.port || 3977;
mongoose.Promise = global.Promise;
mongoose.connect(
    'mongodb://localhost:27017/ControlEscolar', 
    {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true,
        useNewUrlParser: true
    },(req,res)=>{
        if(req)
        {
            throw req
        }
        else    
        {
            console.log("BD Conectada");
            app.listen(port,function()
            {
                console.log("Servidor de Musify Conectada:",port);
            })
        }
    });