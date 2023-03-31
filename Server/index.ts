import express from 'express';
const app = express();
const port = process.env.PORT || 3001;
import db from './models';
import {users} from './seeders/users';
import {salas} from './seeders/salas';

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
createSala();
app.post('/', (req, res) => {
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