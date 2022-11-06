import axios from "axios";
import { Platform } from "../models";
import { AxiosResults } from "../../types/types";
const { API_KEY } = process.env;

export async function addPlatforms(): Promise<void> {
  try {
    const findPlatforms = await Platform.find();
    if(!Boolean(findPlatforms.length)) {
      const platformsApi = await axios.get(`https://api.rawg.io/api/platforms?key=${API_KEY}`);
      const platforms: Array<AxiosResults> = platformsApi.data.results;
      const promises: Array<Promise<Platform>> = platforms.map(platform => {
        let addPlatform = new Platform();
        addPlatform.id = platform.id;
        addPlatform.name = platform.name;
        return addPlatform.save();
      });
      await Promise.all(promises);
      console.log("Platforms added");
    } else {
      console.log("Platforms alredy charged");
    }
  } catch (error) {
    if(error instanceof Error) {
      console.log({ErrorMsg: error.message})
    } else {
      console.log(error)
    }
  }
}
