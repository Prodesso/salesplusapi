const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    idOrganizacion: { type: String, required: false },
    idUsuario: { type: String, required: false },
    usuarioCreador: { type: String, required: true },
    fechaCreacion: { type: Date, default: Date.now },
    estado: { type: String, default: true }

  }
);

module.exports = model("UsuarioOrganizacion", schema);
