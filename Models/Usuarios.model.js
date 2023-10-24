const mongoose = require("mongoose");
const UsuarioSchema = mongoose.Schema({
  Nombre_usuario: {
    type: String,
    require: true,
  },
  Contraseña: {
    type: String,
    require: true,
  },
  Persona: [
    {
      Nombre: String,
      Apellido: String,
      Puesto: String
    },
  ],
});

module.exports = mongoose.model("Usuario", UsuarioSchema);
