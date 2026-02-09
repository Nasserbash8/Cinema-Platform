import React, { useState, useEffect, useCallback } from "react";
import { Form, Container, Row, Button, Dropdown, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { getgenres, filtering } from "../../redux/action/MoivesAction";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faFilter } from "@fortawesome/free-solid-svg-icons";

const Filter = React.memo(({ moviesType, setdatainput, datainput }) => {
 
  const { t, i18n } = useTranslation();
  const [genres, setGenres] = useState([]);
  const [genreIds, setGenreIds] = useState([]);
  const [currentYear, setCurrentYear] = useState(0);
  const [startYear, setStartYear] = useState(1900);
  const [selectedYear, setSelectedYear] = useState("");
  const [filterData, setFilterData] = useState([]);
  const [isDisabled, setIsDisabled] = useState(false);
  const [position, setPosition] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const dispatch = useDispatch();
  const ALLgenreslist = useSelector((state) => state.geners.generslist);
  const appLang = useSelector((state) => state.languages.lang);
  const movieData = useSelector((state) => state.movies.movies);

  const checkHandler = useCallback((e) => {
    const { checked, value } = e.target;
    if (checked) {
      setGenreIds((prevIds) => [...prevIds, parseInt(value)]);
    } else {
      setGenreIds((prevIds) => prevIds.filter((id) => id !== parseInt(value)));
    }
  }, []);

  const handleFilter = useCallback(
    (e, page) => {
      e.preventDefault();
      dispatch(filtering(appLang, selectedYear, genreIds, 1, moviesType));
      setdatainput({ year: selectedYear, id: genreIds });
    },
    [appLang, selectedYear, genreIds,moviesType, setdatainput]
  );

  const years = [];
  for (let i = currentYear; i >= startYear; i--) {
    years.push(i);
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    setGenres(ALLgenreslist);
  }, [ALLgenreslist]);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
    dispatch(getgenres(appLang));
  }, [appLang, dispatch]);

  useEffect(() => {
    setFilterData(datainput);
  }, [datainput]);

  const handleScroll = useCallback(() => {
    const section = document.querySelector(".mobile-filtering");
    setPosition(window.scrollY > section.offsetTop - 300);
  }, []);

  const handleMobileFilter = useCallback((active) => {
    setIsActive(active);
  }, []);

  return (
    <>
      <div className="filter d-sm-block d-none p-3  mb-5 ">
        <Form className=" d-flex " onSubmit={handleFilter}>
          <h4 className=" my-auto mb-3 px-1 text-white">{t("Filter")} : </h4>
          <Dropdown className=" mb-2 me-2 ms-2">
            <Dropdown.Toggle variant="" id="dropdown-basic">
              {t("Select Year")}
            </Dropdown.Toggle>
            <Dropdown.Menu className="p-3 ">
              <Row style={{ width: "400px" }} className="p-2  ">
                {years.map((year) => (
                  <Col md={6} key={year}>
                    <Form.Check
                      name="year"
                      onChange={(e) => setSelectedYear(e.target.value)}
                      value={year}
                      type="radio"
                      label={year}
                    />
                  </Col>
                ))}
              </Row>
            </Dropdown.Menu>
          </Dropdown>

          <Dropdown className=" mb-2">
            <Dropdown.Toggle variant="" id="dropdown-basic">
              {t("select genres")}
            </Dropdown.Toggle>
            <Dropdown.Menu className="p-3  ">
              <Row style={{ width: "400px" }} className="p-2  ">
                {genres.map((genre) => (
                  <Col md={6} key={genre.id}>
                    <Form.Check
                      name="genersid"
                      onChange={checkHandler}
                      value={genre.id}
                      type="checkbox"
                      id={genre.id}
                      label={genre.name}
                    />
                  </Col>
                ))}
              </Row>
            </Dropdown.Menu>
          </Dropdown>

          <Button
            disabled={isDisabled}
            type="submit"
            className={` ${appLang === "ar" ? "me-auto" : "ms-auto"}`}
            variant=""
          >
            {t("filter")}
          </Button>
        </Form>
      </div>

      <div className="d-sm-none d-block mobile-filtering text-white ">
        <FontAwesomeIcon
          className={`open-mobile-filter p-3 ${
            position ? "d-block" : "d-none"
          }`}
          onClick={() => handleMobileFilter(true)}
          icon={faFilter}
        />
        <div
          className={`mobile-filter d-sm-none d-block ${
            isActive ? "active" : ""
          }`}
        >
          <FontAwesomeIcon
            style={{ cursor: "pointer" }}
            onClick={() => handleMobileFilter(false)}
            className="close p-3"
            icon={faXmark}
          />
          <Form className="  p-2 px-3" onSubmit={handleFilter}>
            <div className="d-flex mb-4">
              <h4 className=" my-auto text-white">{t("Filter")} : </h4>
              <Button
                type="submit"
                className={`my-auto ${
                  appLang === "ar" ? "me-auto" : "ms-auto"
                }`}
                variant=""
              >
                {t("filter")}
              </Button>
            </div>
            <div className="filter-by-genres">
              <h6> {t("Select genres")}:</h6>
              <ul className="list-unstyled">
                <Row className="p-2">
                  {genres.map((genre) => (
                    <Col xs={6} key={genre.id}>
                      <li className="">
                        <Form.Check
                          name="genersid"
                          onChange={checkHandler}
                          value={genre.id}
                          type="checkbox"
                          id={genre.id}
                          label={genre.name}
                        />
                      </li>
                    </Col>
                  ))}
                </Row>
              </ul>
            </div>
            <h6> {t("Select Year")}:</h6>
            <Slider
              aria-label="years"
              defaultValue={2023}
              valueLabelDisplay="auto"
              name="year"
              onChange={(e) => setSelectedYear(e.target.value)}
              step={1}
              marks
              min={1900}
              max={2023}
            />
          </Form>
        </div>
      </div>
    </>
  );
});

export default Filter;
