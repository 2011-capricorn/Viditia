import React from 'react'
import TechCard from './TechCard'
import BioCard from './BioCard'
import './styles/HomePage.css'
import {makeStyles, Container, Grid, Card} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  avatar: {
    height: 'auto',
    width: 'auto',
  },
  stack: {
    flexGrow: 1,
  },
  control: {
    padding: theme.spacing(6),
  },
  card: {
    height: 200,
    width: 125,
  },
}))

const HomePage = () => {
  const titles = {
    Frontend: [
      '/react.png',
      '/redux.png',
      '/material-ui.png',
      'javascript.png',
      'html-5.png',
      'css3.png',
      'd3.jpeg',
    ],
    Backend: ['/firebase.png', 'node-js.png'],
    Devops: ['/npm.png', 'webpack.png', 'babel.png'],
  }

  const names = {
    'Gerald Lou Berzuela': [
      'https://www.linkedin.com/in/gerald-lou-berzuela/',
      'https://github.com/gberzuela',
      'Student and problem solver by nature. Gerald is eager to learn new technologies and to contribute in the development of groundbreaking software.',
    ],
    'Derek Louis': [
      'https://www.linkedin.com/in/derek-louis/',
      'https://github.com/dereklouis',
      'Software engineer, telescope enthusiast & bonsai lover, Derek looks forward to working on projects based in science, the arts, education and beyond. ',
    ],
    'Randy Hyun': [
      'https://www.linkedin.com/in/randy-hyun/',
      'https://github.com/randy5478',
      'Software Engineer who enjoys snowboarding and playing drums. Randy has a thirst to sharpen his skills of programming and learn new technology. ',
    ],
    'Aram Martin': [
      'https://www.linkedin.com/in/aram-martin',
      'https://github.com/God-Im-Bored',
      "Aram's alot of things, but what he considers himself most is a problem solver. When he's not learning new technologies, you can find him reading his favorite books or watching Lupin the 3rd.",
    ],
  }

  return (
    <div className="landing-home">
      <Container maxWidth="md">
        <div className="landing-header">Let's talk Vidits.</div>
      </Container>

      <Container fixed>
        <div className="landing-desc">
          <p>
            Viditia is a web application where users can participate, visualize
            and interact with data from polls in a fun and clever way.
          </p>
        </div>
      </Container>

      <Container id="tech-grid">
        {Object.keys(titles).map((key) => (
          <TechCard key={key} title={key} images={titles[key]} />
        ))}
      </Container>

      <Container maxWidth="md">
        <div id="landing-header">Meet the team.</div>
      </Container>

      <Container id="bio-grid">
        {Object.keys(names).map((name) => (
          <BioCard
            key={name}
            name={name}
            linkedin={names[name][0]}
            github={names[name][1]}
            bio={names[name][2]}
            id="bio-card"
          />
        ))}
      </Container>
    </div>
  )
}

export default HomePage
