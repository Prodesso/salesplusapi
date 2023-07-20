const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    titulo: { type: String, required: false },
    descripción: { type: String, required: false },
    cuerpo: { type: String, required: false },
    fechainicio: { type: Date, required: false },
    fechacierre: { type: Date, required: false },
    estadocliente: { type: String, required: false },
    estadocampaña: { type: String, required: false },
    indefinido: { type: Boolean, required: false },
    usuarioCreador: { type: String, required: false },
    fechaCreacion: { type: Date, default: Date.now },
    idOrganizacion: { type: String, required: false },
    estado: { type: String, default: true }
  }
);

module.exports = model("Marketing", schema);
