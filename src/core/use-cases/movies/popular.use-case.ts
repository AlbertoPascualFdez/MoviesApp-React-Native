import { HttpAdapter } from "../../../config/adapters/http/http.adapter";
import { MovieMapper } from "../../../infrastructure/interfaces/mappers/movie.mapper";
import { MovieDBMoviesResponse, NowPlayingResponse } from "../../../infrastructure/interfaces/movie-db.responses";
import { Movie } from "../../entities/movie.entity";

interface Options{
    page?:number
    limit?:number
}

export const popularUseCase = async (fetcher:HttpAdapter, Options?:Options):Promise<Movie[]> => {

    try {
        
        const popular = await fetcher.get<MovieDBMoviesResponse>("/popular", {
            params:{
                page:Options?.page ?? 1
            }
        })

        console.log({popular})

        return popular.results.map(result => MovieMapper.fromMovieDBResultToEntity(result))
       // return nowPlaying.results.map(MovieMapper.fromMovieDBResultToEntity)

    } catch (error) {
        throw new Error("Error fetching movies - Popular");
        
    }
    
}

