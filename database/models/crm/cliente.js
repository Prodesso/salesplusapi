const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    nombrecontacto: { type: String, required: false },
    puesto: { type: String, required: false },
    email: { type: String, required: false },
    telefono: { type: String, required: false },
    whatsapp: { type: String, required: false },
    empresa: { type: String, required: false },
    estatus: { type: String, required: false },
    fuente: { type: String, required: false },
    vendedor: { type: String, required: false },
    calle: { type: String, required: false },
    numero: { type: String, required: false },
    codigopostal: { type: String, required: false },
    pais: { type: String, required: false },
    estado: { type: String, required: false },
    ciudad: { type: String, required: false },
    giro: { type: String, required: false },
    pagina: { type: String, required: false },
    rfc: { type: String, required: false },
    razonsocial: { type: String, required: false },
    numeroempleado: { type: String, required: false },
    facebook: { type: String, required: false },
    instagram: { type: String, required: false },
    linkedin: { type: String, required: false },
    usuarioCreador: { type: String, required: false },
    fechaCreacion: { type: Date, default: Date.now },
    idOrganizacion: { type: String, required: false },
    activo: { type: String, default: true }
  }
);

module.exports = model("Cliente", schema);
