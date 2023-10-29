const router = require("express").Router()
const Usuarios = require("../model/Usuario.model")

router.post("/crear", async (req, res) => {
    await Usuarios.sync();
    await Usuarios.create({ 
        nombre: "Luis", 
        email: "luis@upchiapas.edu"
    })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
})

router.get("/obtenerTodos", (req, res) => {
    Usuarios.findAll()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
})

router.get("/obtenerUsuario/:email", (req, res) => {
    const email = req.params.email;
    const usuario = Usuarios.findOne({ where: { email: email } })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
})




module.exports = router;