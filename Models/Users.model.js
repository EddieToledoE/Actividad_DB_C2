const mongoose = require("mongoose");
const UsersSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email necesario"],
      unique:true,
      validate: {
        validator: function (value) {
          // Aquí definimos una expresión regular para validar el dominio del correo electrónico.
          // En este caso, permitiremos las direcciones de correo con dominio @gmail.com, @hotmail.com y @outlook.es.
          const emailPattern = /@(gmail\.com|hotmail\.com|outlook\.es)$/i;
          return emailPattern.test(value);
        },
        message: "El formato del correo electrónico no es válido.",
      },
    },
    contraseña: {
      type: String,
      required: [true, "Contrasena necesaria"],
      minlength: [8, "La contraseña debe tener al menos 8 caracteres."],
      maxlength: [20, "La contraseña debe tener menos de 20 caracteres."],
    },
  },
  {
    timestamps:false,
    versionKey: false,
  }
);

module.exports = mongoose.models.users || mongoose.model("users", UsersSchema);
