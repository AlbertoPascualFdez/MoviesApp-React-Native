import { HttpAdapter } from "../../../config/adapters/http/http.adapter";
import { MovieMapper } from "../../../infrastructure/interfaces/mappers/movie.mapper";
import { NowPlayingResponse } from "../../../infrastructure/interfaces/movie-db.responses";
import { Movie } from "../../entities/movie.entity";


export const moviesNowPlayingUseCase = async (fetcher:HttpAdapter):Promise<Movie[]> => {

    try {
        
        const nowPlaying = await fetcher.get<NowPlayingResponse>("/now_playing")

       // console.log({nowPlaying})

        return nowPlaying.results.map(result => MovieMapper.fromMovieDBResultToEntity(result))
       // return nowPlaying.results.map(MovieMapper.fromMovieDBResultToEntity)

    } catch (error) {
        throw new Error("Error fetching movies - NowPlaying");
        
    }
    
}

