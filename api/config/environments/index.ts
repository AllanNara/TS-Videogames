
import DEVELOPMENT from "./development";
import PRODUCTION from "./production";
import TEST from "./test";

const { NODE_ENV } = process.env;

let enviroment = DEVELOPMENT;

if(NODE_ENV === 'production') {
  enviroment = PRODUCTION
} else if(NODE_ENV === 'test') {
  enviroment = TEST
};

export default enviroment