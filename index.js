const express = require("express");
const app = express();
const mongoose = require("mongoose");

app.use(express.json());

mongoose.connect("mongodb+srv://223191:Wintersito123@cluster0.rsowkuq.mongodb.net/actividadDB")
  .then(() => {
    console.log("mongodb conectado");
  })
  .catch((error) => console.log(error));

const UserRoute = require("./Routes/Usuarios.route");
app.use("/usuarios", UserRoute);
const ProductoRoute = require("./Routes/Productos.route");
app.use("/productos", ProductoRoute);
const PacienteRoute = require("./Routes/Paciente.route");
app.use("/paciente", PacienteRoute);
const ClienteRoute = require("./Routes/Clientes.route");
app.use("/Cliente", ClienteRoute);

//// Actividad DB
const UsersRoute = require("./Routes/Users.route");
app.use("/Users", UsersRoute);
const ComentarioRoute = require("./Routes/Comentario.route");
app.use("/Comentario", ComentarioRoute);
const PublicacionRoute = require("./Routes/Publicacion.route");
app.use("/Publicacion", PublicacionRoute);

app.use((req, res, next) => {
  const err = new Error("No encontrado");
  err.status = 404;
  next(err);
});

//Manejo de errores
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});

app.listen(3000, () => {
  console.log("Servidor iniciado en el puerto 3000....");
});





