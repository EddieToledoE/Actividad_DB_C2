const mongoose = require("mongoose");
const PacienteSchema = mongoose.Schema({
  nombre: {
    type: String,
    require: true,
  },
  apellido: {
    type: String,
    require: true,
  },
  telefono: {
    type: Number,
    require: true,
  },
  edad: {
    type: Number,
    require: true,
  },
  codigo_ajeno: {
    type: Number,
    require: false,
  },
  codigo_propio: {
    type: Number,
    require: true,
  },
});

module.exports = mongoose.model("Paciente", PacienteSchema);
