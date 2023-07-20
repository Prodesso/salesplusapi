const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    nombre: { type: String, required: false },
    rfc: { type: String, required: false },
    usuarioCreador: { type: String, required: true },
    fechaCreacion: { type: Date, default: Date.now },
    idOrganizacion: { type: String, required: true },
    estado: { type: String, default: true }

  }
);

module.exports = model("Organizacion", schema);
