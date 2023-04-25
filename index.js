const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/user");
const imageRoute = require("./routes/image");
const authRoute = require("./routes/auth");
const subjectsRoute = require("./routes/subject");


var cors = require('cors')

 
app.use(cors())


app.use(express.json());
dotenv.config();

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/image", imageRoute);
app.use("/api/subjects", subjectsRoute);

//connnect to DB
mongoose
	.connect(process.env.MONGO_URL)
	.then(() => console.log("DB Conection Successfull!"))
	.catch((err) => {
		console.log(err);
	});


// Curb Cores Error by adding a header here
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});







	


app.listen(5000, () => {
	console.log("Backend server is running!");


});



