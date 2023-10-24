const express = require("express");
const router = express.Router();
const UsuarioSchema = require("../Models/Usuarios.model");
const { Schema } = require("mongoose");

router.get("/obtener", (req, res, next) => {
  UsuarioSchema.find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

router.post("/crear", async (req, res, next) => {
  try {
    const usuario = new UsuarioSchema(req.body);
    const result = await usuario.save();
    res.send(result);
  } catch (error) {
    console.log(error.message);
  }
});

router.get("/obtener/:id", (req, res, next) => {
  const { id } = req.params;
  UsuarioSchema.findById(id)
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
  UsuarioSchema.updateOne(
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
  UsuarioSchema.deleteOne({ _id: id })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

router.delete("/borrartodos", (req, res, next) => {
  ProductoSchema.deleteMany({})
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

module.exports = router;
