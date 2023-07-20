const path = require('path');
const { readdir } = require('fs/promises');
const findByName = async (dir, name) => {
  const matchedFiles = [];
  const folders = await readdir(dir);
  for (const folder of folders) {
    const files = await readdir(dir + folder);
    for (const file of files) {
      const filename = path.parse(file).name;
      if (filename === name) {
        matchedFiles.push(path.join(dir, folder, file));
      }
    }
  }
  return matchedFiles;
};
const schemas = ["usuario", "sesion", "organigrama", "organizacion", "licencia", "organizacionlicencia", "auditoria", "usuarioorganizacion", "marketing", "cliente", "cotizacion", "oportunidad", "seguimiento","menu"]

const handlersModels = async (models, schema) => {
  const model = await findByName(models, schema)
  return model;
}
module.exports = handlersModels
module.exports.schemas = schemas