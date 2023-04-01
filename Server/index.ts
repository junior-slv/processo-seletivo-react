import express from "express";
const app = express();
const port = process.env.PORT || 3001;
const cors = require('cors')
import db from "./models";
var corsOptions = {
    origin: "http://127.0.0.1:5173"
}

//middleware
app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

//routes
const router = require('./routes/userRoutes')
app.use('/api/users', router)

db.sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`app listenem port ${port}`);
  });
});
