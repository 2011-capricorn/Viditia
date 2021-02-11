import React from 'react'

import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from '@material-ui/core'
import FavoriteIcon from '@material-ui/icons/Favorite'

const ViditCard = ({question, votes, imageUrl, pollKey, history}) => {
  const redirect = () => {
    history.push(`/vidit/${pollKey}`)
  }
  return (
    <Card raised>
      <CardActionArea>
        <CardMedia
          component="img"
          height="350"
          image={imageUrl}
          onClick={redirect}
        />
      </CardActionArea>
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {question}
        </Typography>
      </CardContent>
      <CardActions>
        <IconButton>
          <FavoriteIcon />
        </IconButton>
        <Typography variant="body2" color="textSecondary" component="p">
          {`${votes} votes`}
        </Typography>
        <Button size="small" color="primary" onClick={redirect}>
          Participate
        </Button>
      </CardActions>
    </Card>
  )
}

export default ViditCard
