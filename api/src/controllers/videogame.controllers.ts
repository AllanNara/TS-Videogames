import { Request as Req, Response as Res, NextFunction as Next } from "express";
import { AllDetailGame } from "../../types/types";
import { Videogame, Genre, Platform } from "../models";
import { gameDetailApi } from "../services/gameDetailRawgApi";
import { CustomError } from "../utils/customError";


export const getVideogameById = async(req: Req, res: Res, next: Next): Promise<any> => {
  const { idVideogame } = req.params;
  try {
    let game: AllDetailGame | null;
    if(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(idVideogame)){
        game = (
          await Videogame.find({
            where: {
              id: idVideogame
            },
            relations: {
              platforms: true,
              genres: true
            }
          })
        )[0];
        
        if(game === null){
          throw new CustomError("Not found.", 404, `Game with ID(${idVideogame}) not found in API`)
        };

      } else if(/^[0-9]*$/.test(idVideogame)){
        game = await gameDetailApi(idVideogame as string);

      } else {
      throw new CustomError("Parameter 'ID' not valid", 400, "Parameter ID only receive number or UUID")
    };

    res.status(200).json(game)
  } catch (error) {
    next(error)
  }
}

export const newVideogame = async(req: Req, res: Res, next: Next): Promise<any> => {
  const name: string = req.body.name;
  const description: string = req.body.description;
  const platforms: Array<string> = req.body.platforms;
  const genres: Array<string> = req.body.genres;

  try {
    if(
      !Boolean(name) || 
      !Boolean(description) || 
      (!Boolean(platforms) || !Boolean(platforms.length)) ||
      (!Boolean(genres) || !Boolean(genres.length))
      ) {
      throw new CustomError("Mandatory data are missing", 400, {name, description, platforms, genres});
    };
    
    let modelsPlatforms: Array<Platform> = await Promise.all(
      platforms.map(async(name: string) => {
        let model = await Platform.find({ where: { name } });
        return model[0]
      })
    );

    let modelsGenres: Array<Genre> = await Promise.all(
      genres.map(async(name: string) => {
        let model = await Genre.find({ where: { name } });
        return model[0]
      })
    );

    const game = new Videogame();
    game.name = name;
    game.description = description;
    if(req.body.released) game.released = req.body.released;
    if(req.body.rating) game.rating = req.body.rating;
    if(req.body.image) game.image = req.body.image;
    game.platforms = modelsPlatforms;
    game.genres = modelsGenres;
    await game.save();

    res.status(201).json({id: game.id});
  } catch (error) {
    next(error)
  }
}
