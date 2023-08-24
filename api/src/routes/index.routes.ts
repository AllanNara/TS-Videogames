// import path from "path";
// import fs from "fs";
// import { Router, IRouter } from "express";

// const router: IRouter = Router();
// const basename: string = path.basename(__filename);

// fs.readdirSync(__dirname).forEach((file) => {
// 	if (file.slice(-10, -2) !== ".routes." || file === basename) return;
// 	let name = file.substring(0, file.indexOf(file.slice(-10)));
// 	const cb = require(path.join(__dirname, file));
// 	router.use(`/${name}`, cb.default);
// });

// export default router;
