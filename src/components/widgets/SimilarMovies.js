import React from 'react'
import { Row } from 'react-bootstrap'
import FeauterdMovies from './FeauterdMovies'

function SimilarMovies({Similar}) {
  
  return (
    <Row>
    {Similar.map((movie) => {
      return (
        <FeauterdMovies movie={movie} key={movie.id} />
      )
    })}
  </Row>
  )
}

export default React.memo(SimilarMovies)