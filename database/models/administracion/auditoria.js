const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    fecha: {type: Date,default: Date.now},
    socketid: {type: String},
    movimiento: {type: String},
    pagina:  {type: String},
  }
);

module.exports= model("Auditoria", schema);
