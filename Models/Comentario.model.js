const mongoose = require("mongoose");
const ComentarioSchema = mongoose.Schema(
  {
    contenido: {
      type: String,
      required: [true, "Contenido necesario"],
    },fechaCreacion:{
        type:Date,
    },
    publicacion: {
      type: mongoose.Schema.Types.ObjectId,
      ref:"publicacion",
      required: [true, "publicacion necesaria"],
    },
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"users",
        required: [true, "Usuario necesario"],
      },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.models.comentario || mongoose.model("comentario", ComentarioSchema);
