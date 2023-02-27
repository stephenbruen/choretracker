const express = require('express');
require('dotenv').config()
const cors = require('cors');
const app = express();
require('dotenv').config()

const cookieParser = require('cookie-parser')
app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(cors({credentials: true,  origin: "http://localhost:3000"}),);

require("./config/mongoose.config");
require("./routes/jobs.routes")(app);
require("./routes/users.routes")(app);


app.listen(8000, () => {console.log("Listening at Port 8000")});