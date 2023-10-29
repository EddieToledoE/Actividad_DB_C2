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

router.get("/obtenerComentario/:publicacionId", (req, res) => {
    const publicacionId = req.params.publicacionId;
    Comentario.findAll({ where: { publicacionId: publicacionId } })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
})

router.delete("/borrarComentarioFecha",  (req, res) => {
    Comentario.destroy({ 
        where: { 
            fechaCreacion: "1970-01-01T00:00:00.000Z",
            publicacionId: 1
        } })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));

})

router.patch("/actualizar/:id",  (req, res) => {
    const id = req.params.id;
    Comentario.update(
        { 
          contenido: "Nuevo contenido del comentario",
        },
        {
        where: {
          id: id
        }
      })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
    
})

module.exports = router;