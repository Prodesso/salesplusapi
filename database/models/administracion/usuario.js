const { Schema, model } = require("mongoose");
const schema = new Schema(
	{
		nombrecompleto: { type: String, required: false },
		fechanacimiento: { type: String, required: false },
		rolempresa: { type: String, required: false },
		email: { type: String, required: false },
		password: { type: String, required: false },
		usuarioCreador: { type: String, required: true },
		fechaCreacion: { type: Date, default: Date.now },
		idOrganizacion: { type: String, required: true },
		estado: { type: String, default: true },
		activado: { type: String, default: "" },
		activadoat: { type: Date }
	}
);
module.exports = model("Usuario", schema);
