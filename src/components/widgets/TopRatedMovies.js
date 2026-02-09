import React , {useMemo} from 'react'
import MoviesSliderTwo from "./MoviesSliderTwo";
import { useTranslation } from 'react-i18next';
import { useDispatch , useSelector } from "react-redux";
import { getTopRatedMovies } from "../../redux/action/MoivesAction";

function TopRatedMovies(type) {
 
    const { t, i18n } = useTranslation();
    const Dispatch = useDispatch();
    const moviesdata = useSelector((state)=>state.topRated.movies);
    const applang = useSelector(state => state.languages.lang);
    useMemo(() => {
      Dispatch(getTopRatedMovies(applang,type.type));
    }, [applang]);
    return (
    <div className="movies-slider top-rated-movies mb-5">
     <MoviesSliderTwo  movies={moviesdata} slidetitle={t("Top Rated")} />
    </div>
  )
}

export default React.memo(TopRatedMovies)