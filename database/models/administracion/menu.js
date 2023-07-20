const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    nombre: {type: String,required: true},
    url: {type: String,required: true},
    icon: {type: String,required: true},
  }
);

module.exports= model("Menu", schema);
