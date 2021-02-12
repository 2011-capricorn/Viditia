import React from 'react'

import {Card, CardHeader, CardContent} from '@material-ui/core'

const TechCard = ({title, images}) => {
  return (
    <Card raised id="tech-card">
      <CardHeader id="card-header" title={title} />
      <CardContent>
        {images.map((image) => (
          <img id="tech-img" key={image} src={image} />
        ))}
      </CardContent>
    </Card>
  )
}

export default TechCard
