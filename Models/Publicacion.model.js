const mongoose = require("mongoose");
const PublicacionSchema = mongoose.Schema(
  {
    titulo: {
      type: String,
      required: [true, "Titulo necesario"],
    },
    contenido: {
      type: String,
      required: [true, "Contenido necesario"],
    },
    fechaCreacion:{
        type: Date,
    },
    usuario :{
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.models.publicacion || mongoose.model("publicacion", PublicacionSchema);
