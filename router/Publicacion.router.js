const router = require("express").Router()
const Publicacion = require("../model/Publicacion.model")

router.post("/crear", async (req, res) => {
    await Publicacion.sync();
    await Publicacion.create({ 
        titulo: "Noticias", 
        contenido: "Huracan en Acapulco",
        fechaCreacion: 25/10/2023,
        usuarioId: 1
    })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));

})

router.get("/obtenerTodos", (req, res) => {
    Publicacion.findAll()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
})

router.get("/obtenerPublicacion/:usuarioId", (req, res) => {
    const usuarioId = req.params.usuarioId;
    Publicacion.findAll({ where: { usuarioId: usuarioId } })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
})

router.delete("/borrarPublicacion/:fecha",  (req, res) => {
    const fecha = req.params.fecha;
    Publicacion.destroy({ where: { fechaCreacion: fecha } })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
})

router.patch("/actualizar/:id",  (req, res) => {
    const id = req.params.id;
    Publicacion.update(
        { 
          contenido: "Nuevo contenido de la publicacion",
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