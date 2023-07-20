const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    jefe: { type: String, required: false },
    colaborador: { type: String, required: false },
    orgid: { type: String, required: false },
    meta: { type: String, required: false },
    usuarioCreador: { type: String, required: true },
    fechaCreacion: { type: Date, default: Date.now },
    idOrganizacion: { type: String, required: true },
    estado: { type: String, default: true }
  }
);

module.exports = model("Organigrama", schema);
