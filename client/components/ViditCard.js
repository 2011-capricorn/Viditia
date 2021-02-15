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
import './styles/ViditCard.css'

const ViditCard = ({
  question,
  votes,
  imageUrl,
  pollKey,
  history,
  chartType,
}) => {
  const redirect = () => {
    history.push(`/vidit/${pollKey}`)
  }
  return (
    <Card id="AVCardMaster">
      <CardActionArea></CardActionArea>
      <CardContent className={chartType.split(' ').join('') + 'VCBD'}>
        <Typography
          gutterBottom
          variant="h5"
          component="h2"
          onClick={redirect}
          id="AVCardTitle"
          style={{textAlign: 'center'}}
        >
          {question}
        </Typography>
      </CardContent>
      <CardActions id="cardActionsRow">
        {/* <IconButton id="favoriteIcon">
          <FavoriteIcon id="favoriteIcon" />
        </IconButton> */}
        <Typography
          variant="body2"
          color="textSecondary"
          component="p"
          id="AVCardVoteCount"
        >
          {`${votes} votes`}
        </Typography>
        <Button
          size="small"
          color="primary"
          onClick={redirect}
          id="participateButton"
        >
          Participate
        </Button>
        <div className="toolTip">
          <span className="toolTipText">{chartType}</span>
          <img src={imageUrl} id="chartTypeIcon" />
        </div>
      </CardActions>
    </Card>
  )
}

export default ViditCard
