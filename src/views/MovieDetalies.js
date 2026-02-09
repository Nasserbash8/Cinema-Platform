import React, { useState, useEffect, lazy } from "react";
import {  Container, Tab, Tabs } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  getmoviedetaile,
  getmoviecast,
  getsimilar,
  getvideos,
} from "../redux/action/MoivesAction";
import { api } from "../components/API";
import { SearchContext } from "../App";
import Videos from "../components/widgets/Videos";
import Casting from "../components/widgets/Casting";
import MovieInfo from "../components/widgets/MovieInfo";
import SimilarMovies from "../components/widgets/SimilarMovies";
function MovieDetails({ searchview }) {
  const id = useParams();
  const applang = useSelector((state) => state.languages.lang);
  const { t, i18n } = useTranslation();
  const [key, setKey] = useState("Videos");
  const Dispatch = useDispatch();
  const memoizedDetails = useSelector((state) => state.details.details);
  const memoizedCast = useSelector((state) => state.casting.cast);
  const memoizedVideos = useSelector((state) => state.videos.videos);
  const memoizedSimilar = useSelector((state) => state.similar.similar);

  useEffect(() => {
    Dispatch(getmoviedetaile(applang, id.Movieid));
  }, [applang, Dispatch, id.Movieid]);

  useEffect(() => {
    Dispatch(getmoviecast(applang, id.Movieid));
  }, [applang, Dispatch, id.Movieid]);

  useEffect(() => {
    Dispatch(getvideos(id.Movieid));
  }, [Dispatch, id.Movieid]);

  useEffect(() => {
    Dispatch(getsimilar(applang, id.Movieid));
  }, [applang, Dispatch, id.Movieid]);

  return (
    <div className="movies-page">
      <div>
        {searchview && (
          <SearchContext.Consumer>
            {(context) => {
              if (context === true) {
                return (
                  <>
                    <div className="movie-detalies text-white">
                      <img
                        className="movie-tutorail"
                        src={api.Image + memoizedDetails.backdrop_path}
                      />
                      <div className="movie-info p-3">
                        <Container>
                          <div className="movie-logo">
                            <h1 className="movie-title">
                              {memoizedDetails.title}
                            </h1>
                          </div>
                          <h6 className="movie-rate">
                            {Math.round(memoizedDetails.vote_average * 10) / 10}
                            <i className="rate-icon ms-1">
                              <FontAwesomeIcon icon={faStar} />
                            </i>{" "}
                          </h6>
                          <ul className="movie-tags   list-unstyled">
                            {Array.isArray(memoizedDetails.genres)
                              ? memoizedDetails.genres.map((type) => {
                                  return (
                                    <li className="nav-item  d-inline-block me-2">
                                      {type.name}
                                    </li>
                                  );
                                })
                              : null}
                          </ul>
                          <p className="movie-story">
                            {memoizedDetails.overview}
                          </p>
                        </Container>
                      </div>
                    </div>
                    <div className="additonal-info ">
                      <Container fluid>
                        <Tabs
                          id="controlled-tab-example"
                          activeKey={key}
                          onSelect={(k) => setKey(k)}
                          className="tabs mb-3 "
                        >
                          <Tab
                            eventKey="Videos"
                            title={t("Videos")}
                            className="videos "
                          >
                            <Videos MovieVideos={memoizedVideos} />
                          </Tab>

                          <Tab eventKey="cast" title={t("Casting")}>
                            <Casting MovieCast={memoizedCast} />
                          </Tab>

                          <Tab
                            className="more-info text-white"
                            eventKey="more-info"
                            title={t("More")}
                          >
                            <MovieInfo MovieDetails={memoizedDetails} />
                          </Tab>
                          <Tab eventKey="similar" title={t("Similar")}>
                            <SimilarMovies Similar={memoizedSimilar} />
                          </Tab>
                        </Tabs>
                      </Container>
                    </div>
                  </>
                );
              }
            }}
          </SearchContext.Consumer>
        )}
      </div>
    </div>
  );
}

export default MovieDetails;
