import React, {Component} from 'react'

import './styles/ErrorPage.css'

class ErrorPage extends Component {
  render() {
    return (
      <div>
        <h1 id="title">404 Page Not Found!</h1>
        <iframe
          src="https://giphy.com/embed/3rgXByB0tbT7oXK7Xq"
          width="480"
          height="360"
          id="gif"
          frameBorder="0"
          className="giphy-embed"
          allowFullScreen
        ></iframe>
      </div>
    )
  }
}

export default ErrorPage
