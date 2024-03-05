import { useEffect, useState } from "react"
import { Movie } from "../../core/entities/movie.entity"
import { moviesNowPlayingUseCase } from "../../core/use-cases/movies/now-playing.use-case";
import { movieDBFetcher } from "../../config/adapters/movieDb.adapter";
import { popularUseCase, topRatedUseCase, upcomingUseCase } from "../../core/use-cases/movies";

let popularPageNumber = 1;

export const useMovies = () => {

    const [nowPlaying, setNowPlaying] = useState<Movie[]>([]);
    const [popular, setPopular] = useState<Movie[]>([]);
    const [topRated, setTopRated] = useState<Movie[]>([]);
    const [upcoming, setUpcoming] = useState<Movie[]>([]);
    const [isLoading, setIsLoading] = useState(true)


    useEffect(() => {
        initialLoad();
    
    }, [])

    const initialLoad = async () =>{
        const nowPlayingPromise = moviesNowPlayingUseCase(movieDBFetcher)
        const popularPromise = popularUseCase(movieDBFetcher)
        const topRatedPromise = topRatedUseCase(movieDBFetcher)
        const upcomingPromise = upcomingUseCase(movieDBFetcher)

        const[nowPlaying, popular, topRated, upcoming]  = await Promise.all([nowPlayingPromise, popularPromise, topRatedPromise, upcomingPromise])

        //console.log(nowPlayingMovies[0])

        setNowPlaying(nowPlaying);
        setPopular(popular);
        setTopRated(topRated);
        setUpcoming(upcoming);

        setIsLoading(false)

       // console.log({nowPlaying, popular, topRated, upcoming})

      

    }
    

  return{
    isLoading,
    nowPlaying,
    popular,
    topRated,
    upcoming,


    popularNextPage: async () =>{
        popularPageNumber++;
        const popularMovies = await popularUseCase(movieDBFetcher, {page:popularPageNumber})
        setPopular(prev => [...prev, ...popularMovies])
       },
    
  }
}
