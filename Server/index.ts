import express from 'express';
const app = express();
const port = process.env.PORT || 3001;
import db from './models';
// import {users} from './seeders/users';
// import { colegios } from './seeders/colegios';

const usuarios = db.User.findAll();
console.log("tabela de"+usuarios);

// const createUsers = () => {
//     users.map(user => {
//         db.User.create(user)
//     })
// }
// const createColegios = () => {
//     colegios.map(colegio => {
//         db.Colegio.create(colegio)
//     })
// }

// const createSalas = () => {
//     salas.map(sala => {
//         db.Sala.create(sala)
//     })
// }
// createSalas();
// createColegios();

app.post('/', (req: any, res:any ) => {
    db.User.create({
        userLogin: "matheus2",
        userPassword: "aifoda2",
    })
})


db.sequelize.sync().then(() => {
    app.listen(port, () =>{
        console.log(`app listenem port ${port}`);
        
    })
})