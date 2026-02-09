import React from 'react'
import { Col, Container, Row, Tab, Tabs } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import Zoom from 'react-reveal/Zoom';
function Videos({MovieVideos}) {

    const { t, i18n } = useTranslation();
  return (
    
    <Row>
      {MovieVideos.map((video) => {
        return (
          <Col lg={4} sm={6} className=' video  mb-3 ' key={video.key}>
            <Zoom>
              <div className=' video  '>
                <iframe allowFullScreen width="100%" height='200' src={`https://www.youtube.com/embed/${video.key}`}></iframe>
              </div>
            </Zoom>
          </Col>
        )
      })}
    </Row>
  
  )
}

export default React.memo(Videos)