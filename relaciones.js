
const Usuarios = require("./model/Usuario.model");
const Publicaciones = require("./model/Publicacion.model");
const Comentarios = require("./model/Comentario.model");

Usuarios.hasMany(Publicaciones, { foreignKey: 'usuarioId' });
Publicaciones.belongsTo(Usuarios, { foreignKey: 'usuarioId' });

Publicaciones.hasMany(Comentarios, { foreignKey: 'publicacionId' });
Comentarios.belongsTo(Publicaciones, { foreignKey: 'publicacionId' });

Usuarios.hasMany(Comentarios, { foreignKey: 'usuarioId' });
Comentarios.belongsTo(Usuarios, { foreignKey: 'usuarioId' });
