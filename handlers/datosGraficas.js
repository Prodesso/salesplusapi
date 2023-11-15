const { format, register } = require('timeago.js') //Puede utilizar `import` para Javascript code.
register('es_ES', (number, index, total_sec) => [
	['justo ahora', 'ahora mismo'],
	['hace %s segundos', 'en %s segundos'],
	['hace 1 minuto', 'en 1 minuto'],
	['hace %s minutos', 'en %s minutos'],
	['hace 1 hora', 'en 1 hora'],
	['hace %s horas', 'in %s horas'],
	['hace 1 dia', 'en 1 dia'],
	['hace %s dias', 'en %s dias'],
	['hace 1 semana', 'en 1 semana'],
	['hace %s semanas', 'en %s semanas'],
	['1 mes', 'en 1 mes'],
	['hace %s meses', 'en %s meses'],
	['hace 1 año', 'en 1 año'],
	['hace %s años', 'en %s años']
][index]);
const timeago = timestamp => format(timestamp, 'es_ES');
const Cliente = require('../database/models/crm/cliente.js')

module.exports.dashboard = async function(req) {
	return await dashboard(req);
}
var dashboard = async function(req) {
	var uid = req.session.user._id
	var dashboard = {
		ventas: { meta: 0, ventas: 0 },
		oportunidades: {
			frias: { qty: 0, monto: 0 },
			calientes: { qty: 0, monto: 0 },
			ganadas: { qty:0, monto: 0 },
			perdidas: { qty: 0, monto: 0 }
		},
		contactos: {
			Noint: { qty: 0 },
			PocoInt: { qty: 0 },
			Interesado: { qty: 0 },
			Cliente: { qty: 0 }
		},
		ventasSem: {
			Lunes: { g: 0, p: 0 },
			Martes: { g: 0, p: 0 },
			Miercoles: { g: 0, p: 0 },
			Jueves: { g: 0, p: 0 },
			Viernes: { g: 0, p: 0 },
			Sabado: { g: 0, p: 0 },
			Domingo: { g: 0, p: 0 }
		},
		seguimiento: {
			1: { fecha: timeago("2023-07-07"), tooltip: "2023-07-07", tipo: "llamada", titulo: "Llamada a contacto", descripcion: "Llamar al contacto registrado para revisar cotización", status: "Vencida" },
		},
		marketing: {
			1: { titulo: "Dia de las madres", enviada: 34, leida: 20, estado: "Activa" },
		}
	}
	
	const con = await Cliente.aggregate([
		{ $match: { usuarioCreador: uid } },
		{
			$group:
			{
				_id: "$estatus",
				qty: { $sum: 1 }
			}
		}
	])
	if (con) {
		let Noint = con.find(el => el._id === "Contacto no interesado")
		let Pocoint = con.find(el => el._id === "Prospecto poco interesado")
		let Interesado = con.find(el => el._id === "Interesado")
		let Cliente = con.find(el => el._id === "Cliente")
		dashboard.contactos.Noint.qty = Noint ? Noint.qty : 0
		dashboard.contactos.PocoInt.qty = Pocoint ? Pocoint.qty : 0
		dashboard.contactos.Interesado.qty = Interesado ? Interesado.qty : 0
		dashboard.contactos.Cliente.qty = Cliente ? Cliente.qty : 0
		return dashboard
	}

}