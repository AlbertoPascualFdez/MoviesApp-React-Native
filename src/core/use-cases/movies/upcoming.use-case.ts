import { HttpAdapter } from "../../../config/adapters/http/http.adapter";
import { MovieMapper } from "../../../infrastructure/interfaces/mappers/movie.mapper";
import { MovieDBMoviesResponse, NowPlayingResponse } from "../../../infrastructure/interfaces/movie-db.responses";
import { Movie } from "../../entities/movie.entity";


export const upcomingUseCase = async (fetcher:HttpAdapter):Promise<Movie[]> => {

    try {
        
        const upcoming = await fetcher.get<MovieDBMoviesResponse>("/upcoming")

        console.log({upcoming})

        return upcoming.results.map(result => MovieMapper.fromMovieDBResultToEntity(result))
       // return nowPlaying.results.map(MovieMapper.fromMovieDBResultToEntity)

    } catch (error) {
        throw new Error("Error fetching movies - Upcoming");
        
    }
    
}

