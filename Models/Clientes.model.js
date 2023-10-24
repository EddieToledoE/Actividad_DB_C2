const mongoose = require("mongoose");
const ClienteSchema = mongoose.Schema({
  Nombre: {
    type: String,
    require: true,
  },
  Apellido: {
    type: String,
    require: true,
  },
  Telefono: {
    type: Number,
    require: true,
  },
  Direccion: [
    {
      CP: Number,
      Calle: String,
      Municipio: String,
      Estado: String,
    },
  ],
});

module.exports = mongoose.model("Cliente", ClienteSchema);
