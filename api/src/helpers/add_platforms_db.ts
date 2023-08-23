import axios from "axios";
import config from "../../config/environments";
import platformService from "../services/platform.service";
import PlatformsApi from "../interfaces/platforms_api";

export async function addPlatforms(): Promise<void> {
	const findPlatforms = await platformService.find().catch(console.log);
	if (!findPlatforms?.length) return console.log("Platforms alredy charged");

	const { data } = await axios.get<PlatformsApi>(
		`https://api.rawg.io/api/platforms?key=${config.API_KEY}`
	);

	const platforms = data.results.map(({ id, name }) => {
		return { id, name };
	});
	platforms.push({ name: "Web", id: 171 });
	platformService.create(platforms);

	console.log("Platforms added");
}
