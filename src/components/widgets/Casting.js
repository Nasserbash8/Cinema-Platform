import React from "react";
import { Col, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { api } from "../API";

function Casting({ MovieCast }) {
  
  const { t, i18n } = useTranslation();
  return (
    <Row>
      {MovieCast.map((cast) => {
        return (
          <Col lg={2} md={3} sm={4} xs={6} key={cast.id}>
            <div className="cast mb-3">
              <img
                className="cast-profile-img"
                src={api.Image + cast.profile_path}
                alt={cast.name}
              />
              <span className="cast-info text-center py-5">
                <p>
                  {t("Original name")}: {cast.name}
                </p>
                <p>
                  {t("Character")}: {cast.character}
                </p>
              </span>
            </div>
          </Col>
        );
      })}
    </Row>
  );
}

export default React.memo(Casting);
