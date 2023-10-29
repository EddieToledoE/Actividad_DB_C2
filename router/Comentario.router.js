const router = require("express").Router()
const Comentario = require("../model/Comentario.model")

router.post("/crear", async (req, res) => {
    await Comentario.sync();
    await Comentario.create({ 
        contenido: "Fuerte huracan arremata a acapulco dejando muchos destrozos",
        fechaCreacion: 25/10/2023,
        usuarioId : 1,
        publicacionId : 1
    })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
})

router.get("/obtenerTodos", (req, res) => {
    Comentario.findAll()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
})

module.exports = router;