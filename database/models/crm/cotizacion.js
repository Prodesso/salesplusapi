const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    idOportunidad: { type: String, required: false },
    producto: { type: String, required: false },
    precio: { type: Number, required: false },
    cantidad: { type: Number, required: false },
    descuento: { type: Number, required: false },
    impuestos: { type: Number, required: false },
    usuarioCreador: { type: String, required: true },
    fechaCreacion: { type: Date, default: Date.now },
    idOrganizacion: { type: String, required: true },
    estado: { type: String, default: true }

  }
);

module.exports = model("Cotizacion", schema);
