export default {
	PORT: process.env.PORT,
	DB: process.env.DB,
	DB_CONFIG: {
		user: process.env.DB_USER,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_NAME,
		host: process.env.DB_HOST,
		dialect: process.env.DB,
	},
};
