import { AllMovies , Paginate , Filter,MoviesTypes} from "../types/MoviesTypes";
const intialvalue = {
    movies: [],
    pagecount: 0,
    loading: false
  };
export const moviesReducer = (state = intialvalue,action)=>{
                switch (action.type) {
                    case AllMovies:
                        case MoviesTypes:
                        case Paginate:
                        case Filter:
                          return {
                            ...state,
                            movies: action.data,
                            pagecount: action.pages,
                            types: action.type,
                            loading: false
                          };
                   
                    default:
                        return state;
                } 
}