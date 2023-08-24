import dotenv from "dotenv";
dotenv.config();

const environments = {
	PORT: process.env.PORT,
	DB: process.env.DB,
	API_KEY: process.env.API_KEY,
	DB_CONFIG: {
		user: process.env.DB_USER,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_NAME,
		host: process.env.DB_HOST,
		port: Number(process.env.DB_PORT),
	},
};

export default environments;
