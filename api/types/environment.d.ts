export {};

declare global {
	namespace NodeJS {
		interface ProcessEnv {
			PORT: number;
			DB_HOST: string;
			DB_USER: string;
			DB_PASSWORD: string;
			DB_PORT: number;
			DB_NAME: string;
			API_KEY: string;
			DB: string;
			NODE_ENV: "test" | "development" | "production";
		}
	}
}
