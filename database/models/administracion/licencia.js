const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    uuid: { type: String, required: false },
    tipo: { type: String, required: false },
    fechaInicio: { type: Date},
    fechaFin: { type: Date },
    usuarioCreador: { type: String, required: true },
    fechaCreacion: { type: Date, default: Date.now },
    idOrganizacion: { type: String, required: true },
    estado: { type: String, default: true }

  }
);

module.exports = model("Licenica", schema);
