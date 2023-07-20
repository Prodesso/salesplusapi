const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    sesion: {
      type: String,
      required: true,
    }
  }
);

module.exports= model("Sesion", schema);
