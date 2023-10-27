const express = require("express");
const router = express.Router();
const PublicacionSchema = require("../Models/Publicacion.model");
const { Schema } = require("mongoose");

router.get("/obtener", (req, res, next) => {
  PublicacionSchema.find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

router.post("/crear", async (req, res, next) => {
  try {
    const Publicacion = new PublicacionSchema(req.body);
    const result = await Publicacion.save();
    res.send(result);
  } catch (error) {
    console.log(error.message);
  }
});

router.post("/crearMuchos", async (req, res, next) => {
  try {
    const publicaciones = req.body;
    const result = await PublicacionSchema.create(publicaciones);
    res.send(result);
  } catch (error) {
    console.log(error.message);
  }
});

router.get("/publicacionesxusuario/:id", (req, res) => {
  const { id } = req.params;
  PublicacionSchema.find({
    usuario: {
      $eq: id,
    },
  })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});
router.get("/publicacionesconusuario", (req, res) => {
  PublicacionSchema.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "usuario",
        foreignField: "_id",
        as: "autor",
      },
    },
    { $unwind: "$autor" },
  ])
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

router.get("/publicacioncomentarios", (req, res) => {
  //const { id } = req.params;
  PublicacionSchema.aggregate([
    {
      $lookup: {
        from: "comentarios",
        localField: "_id",
        foreignField: "publicacion",
        as: "comentarios",
      },
    },
  ])
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

router.get("/publicacionesconusuario/:etiqueta", (req, res) => {
  const { etiqueta } = req.params;
  PublicacionSchema.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "usuario",
        foreignField: "_id",
        as: "autor",
      },
    },
    { $unwind: "$autor" },
    { $match: { etiqueta: etiqueta } },
  ])
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

router.get("/obtener/:id", (req, res, next) => {
  const { id } = req.params;
  PublicacionSchema.findById(id)
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

router.patch("/actualizar/:id", (req, res, next) => {
  const { id } = req.params;
  const { titulo, contenido } = req.body;
  PublicacionSchema.updateOne(
    { _id: id },
    {
      $set: {
        titulo,
        contenido,
      },
    }
  )
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

router.delete("/borrar/:fecha", (req, res, next) => {
  const { fecha } = req.params;
  PublicacionSchema.deleteOne({ fechaCreacion: fecha })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

module.exports = router;
