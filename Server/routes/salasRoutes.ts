const salaController = require("../controllers/salasController");
const salaRouter = require("express").Router();
import { upload } from "../index";

salaRouter.post("/addsala", upload.single("protocolo"), salaController.addSala);

salaRouter.get("/allsalas", salaController.getAllSalas);

salaRouter.get("/:id", salaController.getSala);

salaRouter.put("/:id", salaController.updateSala);

salaRouter.delete(":id", salaController.deleteSala);

module.exports = salaRouter;
