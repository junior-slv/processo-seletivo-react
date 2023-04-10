import express from "express";
const app = express();
const port = process.env.PORT || 3001;
const cors = require('cors')
import db from "./models";
import { users } from "./seeders/users";
var corsOptions = {
    origin: "http://localhost:5173"
}

const createUser = () => {
  users.map(user =>{
    db.User.create(user)
  })
}
// createUser()




//middleware
app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use((err:any, req:any, res:any, next:any) => {
  console.error(err.stack);
  res.status(500).send('Ocorreu um erro no servidor');
});


//routes
const userRouter = require('./routes/userRoutes')
app.use('/api/users', userRouter)
const colegioRouter = require('./routes/colegioRoutes')
app.use('/api/colegios', colegioRouter)
const salaRouter = require('./routes/salasRoutes')
app.use('/api/salas', salaRouter)
const professorRouter = require('./routes/professorRoutes')
app.use('/api/professor', professorRouter)

db.sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Rodando na porta: ${port}`);
  });
});
