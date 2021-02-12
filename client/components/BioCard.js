import React from 'react'
import {
  Button,
  Card,
  CardHeader,
  CardActions,
  CardContent,
  Typography,
} from '@material-ui/core'
import LinkedInIcon from '@material-ui/icons/LinkedIn'
import GitHubIcon from '@material-ui/icons/GitHub'

const BioCard = ({name, linkedin, github, bio}) => {
  return (
    <Card raised id="bio-card">
      <CardHeader id="bio-header" title={name} />
      <CardContent>
        <Typography id="bio-body">{bio}</Typography>
      </CardContent>
      <CardActions id="bio-links">
        <a href={linkedin} target="_blank">
          <Button>
            <LinkedInIcon color="primary" />
          </Button>
        </a>
        <a href={github} target="_blank">
          <Button>
            <GitHubIcon color="primary" />
          </Button>
        </a>
      </CardActions>
    </Card>
  )
}

export default BioCard
