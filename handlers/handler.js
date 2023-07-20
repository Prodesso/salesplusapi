const auditoria = require('../database/models/administracion/auditoria.js')
const jsonc = require('jsonc');
module.exports = function(socket, urlmodel, schema) {
	const model = require(urlmodel);
	let schAll = schema + 's'
	let schC = schema + 'C'
	let schR = schema + 'R'
	let schU = schema + 'U'
	let schD = schema + 'D'
	const audits = async (socketid, movimiento, pagina) => {
		pagina = jsonc.stringify(pagina)
		const na = new auditoria({ socketid, movimiento, pagina });
		const sa = await na.save();
	};
	const emitAll = async () => {
		const sch = await model.find();
		socket.emit(schAll, sch);
		audits(socket.id, schAll, socket)
	};
	socket.on(schC, async (data) => {
		const nsch = new model(data);
		const ssch = await nsch.save();
		socket.emit("success", { message: "Alta exitosa" });
		socket.emit("Creado", ssch);
		audits(socket.id, schC, socket)
		emitAll()
	});
	socket.on(schR, async (id) => {
		const sch = await model.findById(id);
		audits(socket.id, schR, socket)
		socket.emit(schR, sch);
	});
	socket.on(schU, async (data) => {
		await model.findByIdAndUpdate(data._id, { $set: data });
		const sch = await model.findById(data._id);
		socket.emit("success", { message: "Cambios Guardados con éxito" });
		audits(socket.id, schU, socket)
		socket.emit(schU, sch);
	});
	socket.on(schD, async (id) => {
		await model.findByIdAndDelete(id);
		socket.emit("success", { message: "Borrado Exitoso" });
		audits(socket.id, schD, socket)
		emitAll();
	});
	socket.on(schAll, async () => {
		audits(socket.id, schAll, socket)
		emitAll()
	});
}