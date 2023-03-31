import express from 'express';
const app = express();
const port = process.env.PORT || 3001;
import db from './models';
import {users} from './seeders/users';
import {salas} from './seeders/salas';
import { colegios } from './seeders/colegios';

const createUsers = () => {
    users.map(user => {
        db.User.create(user)
    })
}

const createSala = () => {
    salas.map(sala => {
        db.Salas.create(sala)
    })
}
const createColegio = () => {
    colegios.map(colegio => {
        db.Colegios.create(colegio)
    })
}

createUsers();
createSala();
createColegio();

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