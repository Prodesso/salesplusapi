const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    tipo: { type: String, required: false },
    titulo: { type: String, required: false },
    fechainicio: { type: Date, required: false },
    descripcion: { type: String, required: false },
    estatus: { type: String, required: false },
    fechacierre: { type: Date, required: false },
    usuarioCreador: { type: String, required: true },
    fechaCreacion: { type: Date, default: Date.now },
    idOrganizacion: { type: String, required: true },
    estado: { type: String, default: true }
  }
);
module.exports = model("Seguimiento", schema);
