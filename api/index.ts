import dotenv from "dotenv";
dotenv.config();
import "reflect-metadata";
import server from './src/app';
import AppDataSource from "./src/db"

(async function () {
  try {
    await AppDataSource.initialize();
    console.log("Database conected")
    server.listen(3001, () => {
      console.log('listening on port 3001');
    });    
  } catch (error) {
    if(error instanceof Error){
      console.log("holaaaaaa", error.stack)
      console.log({ErrorMsg: error.message});
    } else {
      console.log(error)
    }
  }
})();
