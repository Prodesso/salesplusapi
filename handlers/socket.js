

const models = './database/models/'
const hym = require('../middleware.js');
const schemas = require('../middleware.js').schemas
const handler = require('./handler')
const graficas = require('./datosGraficas')
const auditoria = require('../database/models/administracion/auditoria.js')
const User = require('../database/models/administracion/usuario.js')
const jsonc = require('jsonc');
var handlebars = require('handlebars');
var fs = require('fs');
var readHTMLFile = function(path, callback) {
	fs.readFile(path, { encoding: 'utf-8' }, function(err, html) {
		if (err) {
			callback(err);
		}
		else {
			callback(null, html);
		}
	});
};

var crypto = require('crypto');
// Defining algorithm
const algorithm = 'aes-256-cbc';
// Defining key
const key = crypto.randomBytes(32);
// Defining iv
const iv = crypto.randomBytes(16);
const nodemailer = require("nodemailer");
// async..await is not allowed in global scope, must use a wrapper
// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
	host: "mail.salespluscrm.io",
	port: 465,
	secure: true, // true for 465, false for other ports
	auth: {
		user: "notificaciones@salespluscrm.io", // generated ethereal user
		pass: "salesplus2023", // generated ethereal password
	},
});
// An encrypt function
function decrypt(text) {
	let iv = Buffer.from(text.iv, 'hex');
	let encryptedText =
		Buffer.from(text.encryptedData, 'hex');
	// Creating Decipher
	let key = Buffer.from(text.key, 'hex')
	let decipher = crypto.createDecipheriv(
		'aes-256-cbc', key, iv);
	// Updating encrypted text
	let decrypted = decipher.update(encryptedText);
	decrypted = Buffer.concat([decrypted, decipher.final()]);
	// returns data after decryption
	return decrypted.toString();
}
function encrypt(text) {
	// Creating Cipheriv with its parameter
	let cipher = crypto.createCipheriv(
		'aes-256-cbc', Buffer.from(key), iv);
	// Updating text
	let encrypted = cipher.update(text);
	// Using concatenation
	encrypted = Buffer.concat([encrypted, cipher.final()]);
	// Returning iv and encrypted data
	const res = {
		iv: iv.toString('hex'),
		key: key.toString('hex'),
		encryptedData: encrypted.toString('hex')
	};
	const url = new URLSearchParams(res).toString();
	return url
}
module.exports = function(io) {
	io.on("connection", (socket) => {
		const req = socket.request;
		console.log(req.sessionID)
		schemas.forEach(async (schema) => {
			const model = await hym(models, schema);
			await Promise.resolve(handler(socket, '../' + model, schema))
		})
		socket.use((__, next) => {
			console.log(req.sessionID)
			if (__[0] === 'login' || __[0] === 'Registra' || __[0] === 'CorreoActivacion' || __[0] === 'activacion') {
				next()
			} else {
				if (req) {
					req.session.reload((err) => {
						if (err) {
							console.log(err)
						} else {
							next();
						}
					});
				}
			}
		});
		socket.on("login", async (auth) => {
			console.log(req.sessionID)
			const { email, password } = auth;
			const user = await User.findOne({ email }).exec();
			if (user === null) {
				socket.emit("toastr", { type: "error", message: "Usuario no existe en la Base de Datos" });
			} else if (user.password !== password) {
				socket.emit("toastr", { type: "error", message: "Password equivocado" });
			} else {
				req.session.auth = true;
				req.session.user = user;
				req.session.save();
				if (!req.session.auth) {
					console.log(req.session.user)
					return socket.disconnect("unauthorized");
				}
				return socket.emit("auth");
			}
		});
		socket.on("Session", async () => {
			const graf = await graficas.dashboard(req)
			if (graf) {
				req.session.user.dashboard = graf
				req.session.save();
				socket.emit("userAuth", req.session.user)
			}
		})
		socket.on("Registra", async (data) => {
			const { email, password } = data;
			const user = await User.findOne({ email }).exec();
			console.log(user)
			if (user === null) {
				socket.emit("usuarioC", data)
			} else {
				console.log('Ex')
				socket.emit("toastr", { type: "error", message: "Usuario ya existe" });
			}
		});
		const audits = async (socketid, movimiento, pagina) => {
			const na = new auditoria({ socketid, movimiento, pagina });
			const sa = await na.save();
		};
		audits(socket.id, "connection", jsonc.stringify(io))
		socket.on("disconnect", () => {
			socket.disconnect("disconnect");
		});
		socket.on("toastr",async(data)=>{
			socket.emit("toastr",data)
		})
		socket.on("CorreoActivacion", async (data) => {
			var dir = __dirname
			let cryptlink = encrypt(data._id)
			let url = new URLSearchParams(cryptlink).toString();
			let liga = socket.handshake.headers.origin + "/activacion?" + url
			console.log(liga)
			readHTMLFile(dir + '/email.html', async function(err, html) {
				if (err) {
					console.log('error reading file', err);
					return;
				}
				var template = handlebars.compile(html);
				var replacements = {
					cliente: data.nombrecompleto,
					liga: liga
				};
				var htmlToSend = template(replacements);
				let info = await transporter.sendMail({
					from: 'notificaciones@salespluscrm.io', // sender address
					to: data.email, // list of receivers
					subject: "Activación de tú Cuenta SalesPlus ✔", // Subject line
					html: htmlToSend, // html body
				});
				console.log('Aqui')
			});
		});
		socket.on("activacion", async (email) => {
			const data = await User.findOne({ email: email }).lean()
			if (data.activado == "") {
				const actdata = await User.findOneAndUpdate({ email: email }, { activado: "Si", activadoat: Date.now() }).lean()
			}
			if (actdata) {
				socket.emit("activado")
			}
		});
		socket.on("usuarioRol", async (rol) => {
			const data = await User.find({ rolempresa: rol }).lean()
			if (data) {
				socket.emit("usuarioRol", data)
			}
		});
		socket.on("roles", async () => {
			const data = await User.distinct("rolempresa").lean()
			if (data) {
				socket.emit("roles", data)
			}
		});
		socket.on("dashboard", () => {
			socket.emit("userAuth", req.session.user)
		})
	});
}