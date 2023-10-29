const { Sequelize } = require('sequelize');
const sequelize = require("../index")

const Comentario = sequelize.define('Comentarios', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey : true,
    autoIncrement : true
  },
  contenido: {
    type: Sequelize.TEXT
  },
  fechaCreacion: {
    type: Sequelize.DATE
  },
  publicacionId: {
    type: Sequelize.INTEGER,
    references: {
        model: "Publicaciones",
        key: "id"
    }
  },
  usuarioId: {
    type: Sequelize.INTEGER,
    references: {
        model: "Usuarios",
        key: "id"
    }
  }
}, {
  // Otras opciones de modelos aqui van :)
  //Estos quitan las columnas creadas automaticamente
  timestamps: false,
  createdAt: false
});

module.exports = Comentario;

