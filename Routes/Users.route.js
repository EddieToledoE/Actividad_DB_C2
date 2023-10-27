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

router.get("/buscar/:email", (req, res, next) => {
  const { email } = req.params;
  UsersSchema.findOne({
    email: { $eq: email },
  })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

router.patch("/actualizar/:id", (req, res, next) => {
  const { id } = req.params;
  const { email, contraseña } = req.body;
  UsersSchema.updateOne(
    { _id: id },
    {
      $set: {
        email,
        contraseña,
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
