import React, {Component} from 'react'

import './styles/ErrorPage.css'

class ErrorPage extends Component {
  render() {
    return (
      <div id="masterError">
        <h1 id="errortitle">404 Page Not Found!</h1>
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
