const express = require("express");
const router = express.Router();
const ProductoSchema = require("../Models/Productos.model");
const { Schema } = require("mongoose");

router.get("/obtener", (req, res, next) => {
  ProductoSchema.find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

router.post("/crear", (req, res, next) => {
  const producto = ProductoSchema(req.body);
  producto
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

router.post("/crearasync", async (req, res, next) => {
  try {
    const producto = new ProductoSchema(req.body);
    const result = await producto.save();
    res.send(result);
  } catch (error) {
    console.log(error.message);
  }
});

router.get("/obtener/:id", (req, res, next) => {
  const { id } = req.params;
  ProductoSchema.findById(id)
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

router.patch("/actualizar/:id", (req, res, next) => {
  const { id } = req.params;
  const {
    cantidad_stock,
    costo,
    tipo,
    producto: { nombre, marca },
  } = req.body;
  ProductoSchema.updateOne(
    { _id: id },
    {
      $set: {
        cantidad_stock,
        costo,
        tipo,
        producto: {
          nombre,
          marca,
        },
      },
    }
  )
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

router.delete("/borrar/:id", (req, res, next) => {
  const { id } = req.params;
  ProductoSchema.deleteOne({ _id: id })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

router.delete("/borrartodos", (req, res, next) => {
  ProductoSchema.deleteMany({})
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

module.exports = router;