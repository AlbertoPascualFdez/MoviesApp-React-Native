import { useRoute } from '@react-navigation/native'
import { StackScreenProps } from '@react-navigation/stack';
import { Text, View } from 'react-native'
import { RootStackParams } from '../../navigation/StackNavigator';
import { useMovie } from '../../hooks/useMovie';
import { MovieHeader } from '../../components/movie/MovieHeader';
import { MovieItems } from '../../components/movie/MovieItems';
import { ScrollView } from 'react-native-gesture-handler';
import { FullScreenLoader } from '../../components/loaders/FullScreenLoader';


interface Props extends StackScreenProps<RootStackParams, "Details">{}

export const DetailsScreen = ({route}:Props) => {

    const {movieId} = route.params;
    const {movie, cast = [], isLoading} = useMovie(movieId)

    if(isLoading){
        return <FullScreenLoader/>
    }



return (
    <ScrollView>
       <MovieHeader /* {...movie!} */ originalTitle={movie!.originalTitle} poster={movie!.poster} title={movie!.title} />		
       <MovieItems movie={movie!} cast={cast}/>
    </ScrollView>
)
}