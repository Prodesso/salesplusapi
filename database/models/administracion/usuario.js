const { Schema, model } = require("mongoose");
const schema = new Schema(
	{
		nombrecompleto: { type: String, required: true },
		fechanacimiento: { type: Date, required: false,default:Date.now },
		rolempresa: { type: String, required: false,default:"Sin Rol" },
		email: { type: String, required: true },
		password: { type: String, required: true },
		usuarioCreador: { type: String, required: true },
		fechaCreacion: { type: Date, default: Date.now },
		idOrganizacion: { type: String, required: true },
		estado: { type: String, default: true },
		activado: { type: String, default: "No" },
		activadoat: { type: Date }
	}
);
module.exports = model("Usuario", schema);
