import { useEffect, useState } from "react"
import { FullMovie } from "../../core/entities/movie.entity"
import { getMovieByIdUseCase } from "../../core/use-cases/movie/get-by-id.use-case"
import { movieDBFetcher } from "../../config/adapters/movieDb.adapter"
import { getMovieCastUseCase } from "../../core/use-cases/movie/get-cast.use-case"
import { Cast } from "../../core/entities/cast.entity"


export const useMovie = (movieId: number) => {

    const [isLoading, setIsLoading] = useState(true)
    const [movie, setMovie] = useState<FullMovie>()
    const [cast, setCast] = useState<Cast[]>()

    useEffect(() => {
        loadMovie();
    
    }, [movieId])

    const loadMovie = async () =>{

        setIsLoading(true);
        const moviePromise = getMovieByIdUseCase(movieDBFetcher, movieId);
        const castPromise =  getMovieCastUseCase(movieDBFetcher, movieId);

        const[movieInfo, castInfo] = await Promise.all([moviePromise, castPromise])

        setMovie(movieInfo);
        setCast(castInfo);
        setIsLoading(false);

        console.log("Get by id", {movieInfo});
        console.log("casts: ", {castInfo})

    }
    



  return {
    movie,
    cast,
    isLoading
  }
}
