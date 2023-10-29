const { Sequelize } = require('sequelize');
const sequelize = require("../index")

const Publicacion = sequelize.define('Publicaciones', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey : true,
    autoIncrement : true
  },
  titulo: {
    type: Sequelize.STRING
  },
  contenido: {
    type: Sequelize.TEXT
  },
  fechaCreacion: {
    type: Sequelize.DATE
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

module.exports = Publicacion;

