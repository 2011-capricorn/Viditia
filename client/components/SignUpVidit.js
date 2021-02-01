import React, {Component} from 'react'
import firebase from '../../public/firebase'

const db = firebase.firestore()

class SignUpVidit extends Component {
  constructor() {
    super()
    this.state = {
      Season: '',
      Awake: '',
      Animal: '',
      Hand: '',
      Drink: '',
      Scenery: '',
      Travel: '',
      Food: '',
      Artist: '',
      Boolean: '',
      'GS-ID': 0,
      Last_Name: '',
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }
  handleSubmit(e) {
    e.preventDefault()
    console.log('SUBMIT State --->', this.state)
    const {
      Season,
      Awake,
      Animal,
      Hand,
      Drink,
      Scenery,
      Travel,
      Food,
      Artist,
      Boolean,
      Last_Name,
    } = this.state
    db.collection('users')
      .add({
        'GS-ID': this.state['GS-ID'],
        First_Name: `user`,
        Last_Name,
        Email: `user${this.state['GS-ID']}@email.com`,
        signUpAnswers: {
          Season,
          Awake,
          Animal,
          Hand,
          Drink,
          Scenery,
          Travel,
          Food,
          Artist,
          Boolean,
        },
      })
      .then(function (docRef) {
        console.log('Document written with ID: ', docRef.id)
      })
      .catch(function (error) {
        console.error('Error adding document: ', error)
      })
    this.setState({
      Season: '',
      Awake: '',
      Animal: '',
      Hand: '',
      Drink: '',
      Scenery: '',
      Travel: '',
      Food: '',
      Artist: '',
      Boolean: '',
      'GS-ID': 0,
      Last_Name: '',
    })
    alert('Form Submitted')
  }

  async handleChange(e) {
    await this.setState({
      [e.target.name]: e.target.value,
    })
    // console.log(111, this.state)
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit} id="signUpForm">
          <h1>Signup Form:</h1>
          <br />
          <br />
          <label htmlFor="GS-ID">GS-ID</label>
          <input
            type="number"
            name="GS-ID"
            value={this.state['GS-ID']}
            id="GS-ID"
            onChange={this.handleChange}
          />
          <br />
          <br />
          <hr />
          <br />
          <br />
          <label htmlFor="Last_Name">Last Name</label>
          <input
            type="text"
            name="Last_Name"
            value={this.state.Last_Name}
            id="Last_Name"
            onChange={this.handleChange}
          />
          <br />
          <br />
          <hr />
          <br />
          <br />
          <label htmlFor="Summer or winter (CP21nrZ0iDdwf6trKR8c)">
            Summer or winter?
          </label>
          <br />
          <input
            type="radio"
            name="Season"
            value="Summer"
            id="Summer"
            onChange={this.handleChange}
            checked={this.state.Season === 'Summer'}
          />
          <label htmlFor="Summer">Summer</label>
          <input
            type="radio"
            name="Season"
            value="Winter"
            id="Winter"
            onChange={this.handleChange}
            checked={this.state.Season === 'Winter'}
          />
          <label htmlFor="Winter">Winter</label>
          <br />
          <br />
          <hr />
          <label htmlFor="Early bird or night owl (ZGKpkv4LFvbyAGrR09yD)">
            Are you an early bird or a night owl?
          </label>
          <br />
          <input
            type="radio"
            name="Awake"
            value="Early Bird"
            id="Early Bird"
            onChange={this.handleChange}
            checked={this.state.Awake === 'Early Bird'}
          />
          <label htmlFor="Early Bird">Early bird</label>
          <input
            type="radio"
            name="Awake"
            value="Night Owl"
            id="Night Owl"
            onChange={this.handleChange}
            checked={this.state.Awake === 'Night Owl'}
          />
          <label htmlFor="Night Owl">Night owl</label>
          <br />
          <br />
          <hr />
          <label htmlFor="Cat or Dog (jbFoVzlEJmuNK7vLkxK5)">Cat or Dog?</label>
          <br />
          <input
            type="radio"
            name="Animal"
            value="Cat"
            id="Cat"
            onChange={this.handleChange}
            checked={this.state.Animal === 'Cat'}
          />
          <label htmlFor="Cat">Cat</label>
          <input
            type="radio"
            name="Animal"
            value="Dog"
            id="Dog"
            onChange={this.handleChange}
            checked={this.state.Animal === 'Dog'}
          />
          <label htmlFor="Dog">Dog</label>
          <br />
          <br />
          <hr />
          <label htmlFor="Right or left (AydpVc7N4PlfCgafhsFO)">
            Are you right or left handed?
          </label>
          <br />
          <input
            type="radio"
            name="Hand"
            value="Right"
            id="Right"
            onChange={this.handleChange}
            checked={this.state.Hand === 'Right'}
          />
          <label htmlFor="Right">Right</label>
          <input
            type="radio"
            name="Hand"
            value="Left"
            id="Left"
            onChange={this.handleChange}
            checked={this.state.Hand === 'Left'}
          />
          <label htmlFor="Left">Left</label>
          <br />
          <br />
          <hr />
          <label htmlFor="Coffee or tea (Kh8m2S1k0ED9VFYgAw3F)">
            Coffee or tea?
          </label>
          <br />
          <input
            type="radio"
            name="Drink"
            value="Coffee"
            id="Coffee"
            onChange={this.handleChange}
            checked={this.state.Drink === 'Coffee'}
          />
          <label htmlFor="Coffee">Coffee</label>
          <input
            type="radio"
            name="Drink"
            value="Tea"
            id="Tea"
            onChange={this.handleChange}
            checked={this.state.Drink === 'Tea'}
          />
          <label htmlFor="Tea">Tea</label>
          <br />
          <br />
          <hr />
          <label htmlFor="Beach or mountains (zQIfSpxEVLEm2tyv0n9w)">
            Beach or mountains?
          </label>
          <br />
          <input
            type="radio"
            name="Scenery"
            value="Beach"
            id="Beach"
            onChange={this.handleChange}
            checked={this.state.Scenery === 'Beach'}
          />
          <label htmlFor="Beach">Beach</label>
          <input
            type="radio"
            name="Scenery"
            value="Mountains"
            id="Mountains"
            onChange={this.handleChange}
            checked={this.state.Scenery === 'Mountains'}
          />
          <label htmlFor="Mountains">Mountains</label>
          <br />
          <br />
          <hr />
          <label htmlFor="Travel (23cVgvROTUzo24WHKl6w)">
            Do you like to travel?
          </label>
          <br />
          <input
            type="radio"
            name="Travel"
            value="Yes"
            id="yesTravel"
            onChange={this.handleChange}
            checked={this.state.Travel === 'Yes'}
          />
          <label htmlFor="Yes">Yes</label>
          <input
            type="radio"
            name="Travel"
            value="No"
            id="noTravel"
            onChange={this.handleChange}
            checked={this.state.Travel === 'No'}
          />
          <label htmlFor="No">No</label>
          <br />
          <br />
          <hr />
          <label htmlFor="cheeseburger or hotdog (1qb7vLsHAkCz3GvnjYtK)"></label>
          Cheeseburger or hotdog?
          <br />
          <br />
          <input
            type="radio"
            name="Food"
            value="Cheeseburger"
            id="Cheeseburger"
            onChange={this.handleChange}
            checked={this.state.Food === 'Cheeseburger'}
          />
          <label htmlFor="Cheeseburger">Cheeseburger</label>
          <input
            type="radio"
            name="Food"
            value="Hotdog"
            id="Hotdog"
            onChange={this.handleChange}
            checked={this.state.Food === 'Hotdog'}
          />
          <label htmlFor="Hotdog">Hotdog</label>
          <br />
          <br />
          <hr />
          <label htmlFor="beyonce or black sabbath (JqzBPNZ4QyZr0HKXWjzA)"></label>
          Beyonce or Black Sabbath?
          <br />
          <br />
          <input
            type="radio"
            name="Artist"
            value="Beyonce"
            id="Beyonce"
            onChange={this.handleChange}
            checked={this.state.Artist === 'Beyonce'}
          />
          <label htmlFor="Beyonce">Beyonce</label>
          <input
            type="radio"
            name="Artist"
            value="Black Sabbath"
            id="Black Sabbath"
            onChange={this.handleChange}
            checked={this.state.Artist === 'Black Sabbath'}
          />
          <label htmlFor="Black Sabbath">Black Sabbath</label>
          <br />
          <br />
          <hr />
          <label htmlFor="Yes or no (PjRhb7Y5pmuwaI9Ds4Jf)"></label>
          Yes or no?
          <br />
          <br />
          <input
            type="radio"
            name="Boolean"
            value="Yes"
            id="Yes"
            onChange={this.handleChange}
            checked={this.state.Boolean === 'Yes'}
          />
          <label htmlFor="Yes">yes</label>
          <input
            type="radio"
            name="Boolean"
            value="No"
            id="No"
            onChange={this.handleChange}
            checked={this.state.Boolean === 'No'}
          />
          <label htmlFor="No">no</label>
          <br />
          <br />
          <hr />
          <button type="submit">Submit signup Vidits</button>
          <br />
          <br />
        </form>
      </div>
      // Breakfast, lunch, or dinner?
      // <input type="radio" name="Breakfast" value="bSFg0z7HcoFjS4FbDVCQ" />
      // <label htmlFor="Breakfast">Breakfast</label>
      // <input type="radio" name="Lunch" value="AeA4qK7f0JqewA9hizRq" />
      // <label htmlFor="Lunch">Lunch</label>
      // <input type="radio" name="Dinner" value="AeA4qK7f0JqewA9hizRq" />
      // <label htmlFor="Dinner">Dinner</label>
    )
  }
}
export default SignUpVidit
