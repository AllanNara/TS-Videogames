import path from "path";
import fs from "fs";
import { Router, IRouter } from "express";

const router: IRouter = Router();
const basename: string = path.basename(__filename)

fs.readdirSync(__dirname).forEach((file) => {
  if ((file.slice(-10, -2) !== ".routes.") || (file === basename)) return;
  // Configurar los routers
  let name = file.substring(0, file.indexOf(file.slice(-10)));
  // CONSIDERAR SI ES MEJOR MEZCLAR EN ESTE ARCHIVO COMMONJS CON ECMASCRIPT MODULE,
  // O HACER LO MISMO QUE CON LA CARPETA MODELS
  const cb = require(path.join(__dirname, file));
  router.use(`/${name}`, cb.default);
});


export default router;
