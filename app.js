const express = require("express");
const bodyParser= require("body-parser");
const app = express();
const cors = require('cors');

const typeOfUserRouter = require("./routes/typeOfUsers");
const UserRouter = require("./routes/users");
const subjectRoute = require("./routes/subject");
const scheduleRoute = require("./routes/schedules");
const kardexRoute = require("./routes/kardex");
const specialiteRouter = require("./routes/specialites");

app.use(cors());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//configuracion de cabeceras
// app.use((res,req,next)=>{
//     res.header('Access-Control-Allow-Origin','*');
//     res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
//     res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
//     res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
//     next();
// });


//carga de rutas
app.use("/api", typeOfUserRouter);
app.use("/api", UserRouter);
app.use("/api", subjectRoute);
app.use("/api", scheduleRoute);
app.use("/api", kardexRoute);
app.use("/api", specialiteRouter);
// app.use("/api", slugRouter);

module.exports = app;

