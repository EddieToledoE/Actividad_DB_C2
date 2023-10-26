const express = require("express");
const router = express.Router();
const ComentarioSchema = require("../Models/Comentario.model");
const { Schema } = require("mongoose");

router.get("/obtener", (req, res, next) => {
  ComentarioSchema.find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

router.post("/crear", async (req, res, next) => {
  try {
    const comentario = new ComentarioSchema(req.body);
    const result = await comentario.save();
    res.send(result);
  } catch (error) {
    console.log(error.message);
  }
});

router.post("/crearMuchos", async (req, res, next) => {
  try {
    const comentarios = req.body;
    const result = await ComentarioSchema.create(comentarios);
    res.send(result);
  } catch (error) {
    console.log(error.message);
  }
});

router.get("/obtener/:id", (req, res, next) => {
  const { id } = req.params;
  ComentarioSchema.findById(id)
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

router.patch("/actualizar/:id", (req, res, next) => {
  const { id } = req.params;
  const { contenido } = req.body;
  ComentarioSchema.updateOne(
    { _id: id },
    {
      $set: {
        contenido,
      },
    }
  )
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

router.delete("/borrar/:id", (req, res, next) => {
  const { id } = req.params;
  ComentarioSchema.deleteOne({ _id: id })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

module.exports = router;
