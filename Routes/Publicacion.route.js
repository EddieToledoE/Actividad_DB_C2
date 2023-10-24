const express = require("express");
const router = express.Router();
const ClienteSchema = require("../Models/Clientes.model");
const { Schema } = require("mongoose");

router.get("/obtener", (req, res, next) => {
  ClienteSchema.find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});



router.post("/crear", async (req, res, next) => {
  try {
    const cliente = new ClienteSchema(req.body);
    const result = await cliente.save();
    res.send(result);
  } catch (error) {
    console.log(error.message);
  }
});

router.get("/obtener/:id", (req, res, next) => {
  const { id } = req.params;
  ClienteSchema.findById(id)
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

router.patch("/actualizar/:id", (req, res, next) => {
  const { id } = req.params;
  const {
    Nombre,
    Apellido,
    Telefono,
    Direccion: {CP,Calle,Municipio,Estado},
  } = req.body;
 ClienteSchema.updateOne(
    { _id: id },
    {
      $set: {
        Nombre,
        Apellido,
        Telefono,
        Direccion: {
          CP,
          Calle,
          Municipio,
          Estado,
        },
      },
    }
  )
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

router.delete("/borrar/:id", (req, res, next) => {
  const { id } = req.params;
  ClienteSchema.deleteOne({ _id: id })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

module.exports = router;
