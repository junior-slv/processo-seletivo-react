const salaController = require("../controllers/salasController");
const salaRouter = require("express").Router();
import path from "path";

salaRouter.post("/addsala", salaController.addSala);

salaRouter.get("/allsalas", salaController.getAllSalas);

salaRouter.get("/:id", salaController.getSala);

salaRouter.put("/:id", salaController.updateSala);

salaRouter.delete("/:id", salaController.deleteSala);

salaRouter.post('/upload', salaController.uploadProtocolo);

salaRouter.get('/download/:filename', (req:any, res:any) => {
    const filename = req.params.filename;
    const filepath = path.join(__dirname, '../uploads/sala', filename);
    res.download(filepath);
  });
module.exports = salaRouter;
