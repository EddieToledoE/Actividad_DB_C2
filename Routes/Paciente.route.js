const express = require("express");
const router = express.Router();
const PacienteSchema = require("../Models/Paciente.model");
const { Schema } = require("mongoose");

router.get("/obtener", (req, res, next) => {
  PacienteSchema.find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

router.post("/crear", async (req, res, next) => {
  try {
    const paciente = new PacienteSchema(req.body);
    const result = await paciente.save();
    res.send(result);
  } catch (error) {
    console.log(error.message);
  }
});

router.get("/obtener/:id", (req, res, next) => {
  const { id } = req.params;
  PacienteSchema.findById(id)
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

router.patch("/actualizar/:id", (req, res, next) => {
  const { id } = req.params;
  const { nombre, apellido, telefono, edad, codigo_ajeno, codigo_propio } =
    req.body;
  PacienteSchema.updateOne(
    { _id: id },
    {
      $set: {
        nombre,
        apellido,
        telefono,
        edad,
        codigo_ajeno,
        codigo_propio,
      },
    }
  )
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

router.delete("/borrar/:id", (req, res, next) => {
  const { id } = req.params;
  PacienteSchema.deleteOne({ _id: id })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

router.delete("/borrartodo", (req, res, next) => {
  PacienteSchema.deleteMany({})
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

module.exports = router;
