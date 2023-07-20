const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    cliente: { type: String, required: false },
    vendedor: { type: String, required: false },
    cierreestimado: { type: Date, required: false },
    porcentaje: { type: Date, required: false },
    usuarioCreador: { type: String, required: true },
    fechaCreacion: { type: Date, default: Date.now },
    idOrganizacion: { type: String, required: true },
    estado: { type: String, default: true }
  }
);

module.exports = model("Oportunidad", schema);
