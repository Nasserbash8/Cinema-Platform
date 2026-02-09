import React from "react";
import { Col, Row } from "react-bootstrap";
import { api } from "../API";
import { useTranslation } from "react-i18next";

function MovieInfo({MovieDetails}) {
  
    const { t, i18n } = useTranslation();
  return (
    <>
      <ul className="list-unstyled">
        <li className="nav-item">
          {t("Release Date")}: {MovieDetails.release_date}
        </li>
        <li className="nav-item">
          {t("original language")}: {MovieDetails.original_language}
        </li>
        <li className="nav-item">
          {t("Rate")}: {MovieDetails.vote_average}
        </li>
        <li className="nav-item">
          {t("vote count")}: {MovieDetails.vote_count}
        </li>
      </ul>
      <h5>{t("Production Companies")}:</h5>
      <Row>
        {Array.isArray(MovieDetails.production_companies)
          ? MovieDetails.production_companies.map((company) => {
              return (
                <Col key={company.id}>
                  <img
                    className="company-logo"
                    src={api.Image + company.logo_path}
                    alt={company.name}
                  />
                </Col>
              );
            })
          : null}
      </Row>
    </>
  );
}

export default React.memo(MovieInfo);
