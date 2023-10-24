const mongoose = require("mongoose");
const ProductoSchema = mongoose.Schema({
  cantidad_stock: {
    type: Number,
    require: true,
  },
  costo: {
    type: Number,
    require: true,
  },
  tipo: {
    type: String,
    require: true,
  },
  producto: [
    {
      nombre: String,
      marca: String,
    },
  ],
});

module.exports = mongoose.model("Producto", ProductoSchema);