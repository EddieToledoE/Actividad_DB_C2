const express = require("express");
const router = express.Router();
const UsersSchema = require("../Models/Users.model");
const { Schema } = require("mongoose");

router.get("/obtener", (req, res, next) => {
  UsersSchema.find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

router.post("/crear", async (req, res, next) => {
  try {
    const usuario = new UsersSchema(req.body);
    const result = await usuario.save();
    res.send(result);
  } catch (error) {
    console.log(error.message);
  }
});

router.get("/obtener/:id", (req, res, next) => {
  const { id } = req.params;
  UsersSchema.findById(id)
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

router.patch("/actualizar/:id", (req, res, next) => {
  const { id } = req.params;
  const {
    Nombre_usuario,
    Contraseña,
    Persona,
    usuario: { Nombre, Apellido, Puesto },
  } = req.body;
  UsersSchema.updateOne(
    { _id: id },
    {
      $set: {
        Nombre_usuario,
        Contraseña,
        Persona,
        usuario: {
          Nombre,
          Apellido,
          Marca,
        },
      },
    }
  )
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

router.delete("/borrar/:id", (req, res, next) => {
  const { id } = req.params;
  UsersSchema.deleteOne({ _id: id })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

router.delete("/borrartodos", (req, res, next) => {
  UsersSchema.deleteMany({})
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

module.exports = router;
