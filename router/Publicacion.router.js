const router = require("express").Router()
const Publicacion = require("../model/Publicacion.model")

router.post("/crear", async (req, res) => {
    await Publicacion.sync();
    await Publicacion.create({ 
        titulo: "Noticias", 
        contenido: "Huracan en Acapulco",
        fechaCreacion: 25/10/2023,
        usuarioId: 2
    })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
})

router.get("/obtenerTodos", (req, res) => {
    Publicacion.findAll()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
})


module.exports = router;