const salaController = require("../controllers/salasController");
const salaRouter = require("express").Router();

salaRouter.post("/addsala", salaController.addSala);

salaRouter.get("/allsalas", salaController.getAllSalas);

salaRouter.get("/:id", salaController.getSala);

salaRouter.put("/:id", salaController.updateSala);

salaRouter.delete("/:id", salaController.deleteSala);

module.exports = salaRouter;
