import React, {Component} from 'react'

import firebase from 'firebase'
import myFirebase from '../../public/firebase'
const db = myFirebase.firestore()

class SurveyInput extends Component {
  constructor() {
    super()
    this.state = {
      userKey: '',
      ihaJxvUQcCzVhc2I4Xbd: '',
      Lxz2XzalmDTVoOrqA8qW: '',
      aQ2qNIuphDmTlYqcVIk8: '',
      vuv0An3whgXtwZgmZzHx: '',
      EJlcBUXvxnIuWPAmw1rw: '',
      pAnW7nSfTm7dNFPdJmBw: -1,
      oZfjpzpl3fRYuAufCVEm: '',
      v7rXnnB17MN1H6Xg81xL: '',
      WIxwS8qIiUOn5tfpHA7f: '',
      '6ywRBZcPXmce94M93tbi': -1,
      m1n8ZyUCJ5M1koWhG2rF: '',
      wpO7dYH2J1lAww3rMCyG: '',
      wRp01LtH7TL5oKx1HJCe: '',
      IcZ4Y1pPWWRRdE7W9mXX: -1,
      PXqcCqj7gH3FB6dEwYKC: -1,
      '3iMzByA5eCCFltsdBFgB': '',
      ww0GdTOiMIchprRmPoEE: '',
      OtiqQWHNMoBFV4c3ckpS: -1,
      '94j8BqwUKuQr61oUvY9W': -1,
      WykLLlKBs0IYLDm5iWQB: '',
      czwgpww6lyxa34bdbRlR: '',
      s2GdZnP781WE0Rde2pve: -1,
      PgA18LiwLKmxdLQK8mZN: -1,
      Jjxs5iWmny5Ox4cvhZPA: '',
      DepXFWGYmIZtXW6v9aTu: '',
      '4CbajKs75QKoSP1I3J3a': -1,
      LS5ozXZVNnaQz3hvTgzr: -1,
      b8ALlRKAoo6n3RGq2LtL: '',
      evwE6TqRwFwgj0iQREvO: '',
      yqEqD9PpiLRB898akHTY: -1,
      OhGBt2o71rdNVmlZdCsL: -1,
      '1IygiR99g2pTTpd7kqqF': '',
      tHupAXv5K1uqERq4UDqi: '',
      RtMecWrcUthp0sbmb3pg: -1,
      pW06bXPfGsk5132wSpXi: '',
      YMkzBiRV5EYo52EudG0n: '',
      YV8GcDKo9pILz5xzGXG7: '',
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault()
    console.log('SUBMIT State --->', this.state)

    for (let key in this.state) {
      if (key !== 'userKey') {
        // console.log('key -->', key)
        // console.log('answer -->', this.state[key])
        let pollRef = db.collection('polls').doc(key)

        pollRef.update({
          answers: firebase.firestore.FieldValue.arrayUnion({
            answer: this.state[key],
            userKey: this.state.userKey,
          }),
        })
      }
    }

    this.setState({
      userKey: '',
      ihaJxvUQcCzVhc2I4Xbd: '',
      Lxz2XzalmDTVoOrqA8qW: '',
      aQ2qNIuphDmTlYqcVIk8: '',
      vuv0An3whgXtwZgmZzHx: '',
      EJlcBUXvxnIuWPAmw1rw: '',
      pAnW7nSfTm7dNFPdJmBw: -1,
      oZfjpzpl3fRYuAufCVEm: '',
      v7rXnnB17MN1H6Xg81xL: '',
      WIxwS8qIiUOn5tfpHA7f: '',
      '6ywRBZcPXmce94M93tbi': -1,
      m1n8ZyUCJ5M1koWhG2rF: '',
      wpO7dYH2J1lAww3rMCyG: '',
      wRp01LtH7TL5oKx1HJCe: '',
      IcZ4Y1pPWWRRdE7W9mXX: -1,
      PXqcCqj7gH3FB6dEwYKC: -1,
      '3iMzByA5eCCFltsdBFgB': '',
      ww0GdTOiMIchprRmPoEE: '',
      OtiqQWHNMoBFV4c3ckpS: -1,
      '94j8BqwUKuQr61oUvY9W': -1,
      WykLLlKBs0IYLDm5iWQB: '',
      czwgpww6lyxa34bdbRlR: '',
      s2GdZnP781WE0Rde2pve: -1,
      PgA18LiwLKmxdLQK8mZN: -1,
      Jjxs5iWmny5Ox4cvhZPA: '',
      DepXFWGYmIZtXW6v9aTu: '',
      '4CbajKs75QKoSP1I3J3a': -1,
      LS5ozXZVNnaQz3hvTgzr: -1,
      b8ALlRKAoo6n3RGq2LtL: '',
      evwE6TqRwFwgj0iQREvO: '',
      yqEqD9PpiLRB898akHTY: -1,
      OhGBt2o71rdNVmlZdCsL: -1,
      '1IygiR99g2pTTpd7kqqF': '',
      tHupAXv5K1uqERq4UDqi: '',
      RtMecWrcUthp0sbmb3pg: -1,
      pW06bXPfGsk5132wSpXi: '',
      YMkzBiRV5EYo52EudG0n: '',
      YV8GcDKo9pILz5xzGXG7: '',
    })
    alert('Form submitted!')
  }

  async handleChange(e) {
    await this.setState({
      [e.target.name]: e.target.value,
    })
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit} id="signUpForm">
          <h1>Survey Input:</h1>
          <br />
          <br />
          <label htmlFor="userKey">userKey</label>
          <input
            type="text"
            name="userKey"
            value={this.state.userKey}
            onChange={this.handleChange}
          />
          <br />
          <br />
          <hr />
          <label htmlFor="Breakfast, lunch, or dinner (ihaJxvUQcCzVhc2I4Xbd)">
            Breakfast, lunch, or dinner?
          </label>
          <br />
          <input
            type="radio"
            name="ihaJxvUQcCzVhc2I4Xbd"
            value="Breakfast"
            onChange={this.handleChange}
            checked={this.state.ihaJxvUQcCzVhc2I4Xbd === 'Breakfast'}
          />
          <label htmlFor="Breakfast">Breakfast</label>
          <input
            type="radio"
            name="ihaJxvUQcCzVhc2I4Xbd"
            value="Lunch"
            onChange={this.handleChange}
            checked={this.state.ihaJxvUQcCzVhc2I4Xbd === 'Lunch'}
          />
          <label htmlFor="Lunch">Lunch</label>
          <input
            type="radio"
            name="ihaJxvUQcCzVhc2I4Xbd"
            value="Dinner"
            onChange={this.handleChange}
            checked={this.state.ihaJxvUQcCzVhc2I4Xbd === 'Dinner'}
          />
          <label htmlFor="Dinner">Dinner</label>
          <br />
          <br />
          <hr />
          <label htmlFor="Cheetos (Lxz2XzalmDTVoOrqA8qW)">
            Hot Cheetos or regular Cheetos?
          </label>
          <br />
          <input
            type="radio"
            name="Lxz2XzalmDTVoOrqA8qW"
            value="Hot"
            onChange={this.handleChange}
            checked={this.state.Lxz2XzalmDTVoOrqA8qW === 'Hot'}
          />
          <label htmlFor="Hot">Hot</label>
          <input
            type="radio"
            name="Lxz2XzalmDTVoOrqA8qW"
            value="Regular"
            onChange={this.handleChange}
            checked={this.state.Lxz2XzalmDTVoOrqA8qW === 'Regular'}
          />
          <label htmlFor="Regular">Regular</label>
          <br />
          <br />
          <hr />
          <label htmlFor="Element (aQ2qNIuphDmTlYqcVIk8)">
            What element would you like to control?
          </label>
          <br />
          <input
            type="radio"
            name="aQ2qNIuphDmTlYqcVIk8"
            value="Air"
            onChange={this.handleChange}
            checked={this.state.aQ2qNIuphDmTlYqcVIk8 === 'Air'}
          />
          <label htmlFor="Air">Air</label>
          <input
            type="radio"
            name="aQ2qNIuphDmTlYqcVIk8"
            value="Water"
            onChange={this.handleChange}
            checked={this.state.aQ2qNIuphDmTlYqcVIk8 === 'Water'}
          />
          <label htmlFor="Water">Water</label>
          <input
            type="radio"
            name="aQ2qNIuphDmTlYqcVIk8"
            value="Earth"
            onChange={this.handleChange}
            checked={this.state.aQ2qNIuphDmTlYqcVIk8 === 'Earth'}
          />
          <label htmlFor="Earth">Earth</label>
          <input
            type="radio"
            name="aQ2qNIuphDmTlYqcVIk8"
            value="Fire"
            onChange={this.handleChange}
            checked={this.state.aQ2qNIuphDmTlYqcVIk8 === 'Fire'}
          />
          <label htmlFor="Fire">Fire</label>
          <br />
          <br />
          <hr />
          <label htmlFor="Bold or beautiful (vuv0An3whgXtwZgmZzHx)">
            Bold or beautiful?
          </label>
          <br />
          <input
            type="radio"
            name="vuv0An3whgXtwZgmZzHx"
            value="Bold"
            onChange={this.handleChange}
            checked={this.state.vuv0An3whgXtwZgmZzHx === 'Bold'}
          />
          <label htmlFor="Bold">Bold</label>
          <input
            type="radio"
            name="vuv0An3whgXtwZgmZzHx"
            value="Beautiful"
            onChange={this.handleChange}
            checked={this.state.vuv0An3whgXtwZgmZzHx === 'Beautiful'}
          />
          <label htmlFor="Beautiful">Beautiful</label>
          <br />
          <br />
          <hr />
          <label htmlFor="Pizza (EJlcBUXvxnIuWPAmw1rw)">
            New York pizza or Chicago pizza?
          </label>
          <br />
          <input
            type="radio"
            name="EJlcBUXvxnIuWPAmw1rw"
            value="New York"
            onChange={this.handleChange}
            checked={this.state.EJlcBUXvxnIuWPAmw1rw === 'New York'}
          />
          <label htmlFor="New York">New York</label>
          <input
            type="radio"
            name="EJlcBUXvxnIuWPAmw1rw"
            value="Chicago"
            onChange={this.handleChange}
            checked={this.state.EJlcBUXvxnIuWPAmw1rw === 'Chicago'}
          />
          <label htmlFor="Chicago">Chicago</label>
          <br />
          <br />
          <hr />
          <label htmlFor="Memory (pAnW7nSfTm7dNFPdJmBw)">
            What age were you in your oldest memory?
          </label>
          <br />
          <label htmlFor="pAnW7nSfTm7dNFPdJmBw">Oldest Memory</label>
          <input
            type="number"
            min="1"
            max="10"
            name="pAnW7nSfTm7dNFPdJmBw"
            value={this.state.pAnW7nSfTm7dNFPdJmBw}
            onChange={this.handleChange}
          />
          <br />
          <br />
          <hr />
          <label htmlFor="Hogwarts (oZfjpzpl3fRYuAufCVEm)">
            What is your Hogwarts house?
          </label>
          <br />
          <input
            type="radio"
            name="oZfjpzpl3fRYuAufCVEm"
            value="Gryffindor (courageous)"
            onChange={this.handleChange}
            checked={
              this.state.oZfjpzpl3fRYuAufCVEm === 'Gryffindor (courageous)'
            }
          />
          <label htmlFor="Gryffindor (courageous)">
            Gryffindor (courageous)
          </label>
          <input
            type="radio"
            name="oZfjpzpl3fRYuAufCVEm"
            value="Hufflepuff (loyal)"
            onChange={this.handleChange}
            checked={this.state.oZfjpzpl3fRYuAufCVEm === 'Hufflepuff (loyal)'}
          />
          <label htmlFor="Hufflepuff (loyal)">Hufflepuff (loyal)</label>
          <input
            type="radio"
            name="oZfjpzpl3fRYuAufCVEm"
            value="Ravenclaw (wise)"
            onChange={this.handleChange}
            checked={this.state.oZfjpzpl3fRYuAufCVEm === 'Ravenclaw (wise)'}
          />
          <label htmlFor="Ravenclaw (wise)">Ravenclaw (wise)</label>
          <input
            type="radio"
            name="oZfjpzpl3fRYuAufCVEm"
            value="Slytherin (cunning)"
            onChange={this.handleChange}
            checked={this.state.oZfjpzpl3fRYuAufCVEm === 'Slytherin (cunning)'}
          />
          <label htmlFor="Slytherin (cunning)">Slytherin (cunning)</label>
          <br />
          <br />
          <hr />
          <label htmlFor="Lightning or thunder (v7rXnnB17MN1H6Xg81xL)">
            Lightning or thunder?
          </label>
          <br />
          <input
            type="radio"
            name="v7rXnnB17MN1H6Xg81xL"
            value="Lighting"
            onChange={this.handleChange}
            checked={this.state.v7rXnnB17MN1H6Xg81xL === 'Lighting'}
          />
          <label htmlFor="Lightning">Lightning</label>
          <input
            type="radio"
            name="v7rXnnB17MN1H6Xg81xL"
            value="Thunder"
            onChange={this.handleChange}
            checked={this.state.v7rXnnB17MN1H6Xg81xL === 'Thunder'}
          />
          <label htmlFor="Thunder">Thunder</label>
          <br />
          <br />
          <hr />
          <label htmlFor="Tomato or chicken soup (WIxwS8qIiUOn5tfpHA7f)">
            Tomato or chicken soup?
          </label>
          <br />
          <input
            type="radio"
            name="WIxwS8qIiUOn5tfpHA7f"
            value="Tomato"
            onChange={this.handleChange}
            checked={this.state.WIxwS8qIiUOn5tfpHA7f === 'Tomato'}
          />
          <label htmlFor="Tomato">Tomato</label>
          <input
            type="radio"
            name="WIxwS8qIiUOn5tfpHA7f"
            value="Chicken"
            onChange={this.handleChange}
            checked={this.state.WIxwS8qIiUOn5tfpHA7f === 'Chicken'}
          />
          <label htmlFor="Chicken">Chicken</label>
          <br />
          <br />
          <hr />
          <label htmlFor="What is your realistic target salary or yearly income (6ywRBZcPXmce94M93tbi)">
            What is your realistic target salary or yearly income?
          </label>
          <br />
          <label htmlFor="6ywRBZcPXmce94M93tbi">Target Salary</label>
          <input
            type="number"
            name="6ywRBZcPXmce94M93tbi"
            value={this.state['6ywRBZcPXmce94M93tbi']}
            onChange={this.handleChange}
          />
          <br />
          <br />
          <hr />
          <label htmlFor="What is the color of your lightsaber (m1n8ZyUCJ5M1koWhG2rF)">
            What is the color of your lightsaber?
          </label>
          <br />
          <input
            type="radio"
            name="m1n8ZyUCJ5M1koWhG2rF"
            value="Red"
            onChange={this.handleChange}
            checked={this.state.m1n8ZyUCJ5M1koWhG2rF === 'Red'}
          />
          <label htmlFor="Red">Red</label>
          <input
            type="radio"
            name="m1n8ZyUCJ5M1koWhG2rF"
            value="Green"
            onChange={this.handleChange}
            checked={this.state.m1n8ZyUCJ5M1koWhG2rF === 'Green'}
          />
          <label htmlFor="Green">Green</label>
          <input
            type="radio"
            name="m1n8ZyUCJ5M1koWhG2rF"
            value="Purple"
            onChange={this.handleChange}
            checked={this.state.m1n8ZyUCJ5M1koWhG2rF === 'Purple'}
          />
          <label htmlFor="Purple">Purple</label>
          <input
            type="radio"
            name="m1n8ZyUCJ5M1koWhG2rF"
            value="Blue"
            onChange={this.handleChange}
            checked={this.state.m1n8ZyUCJ5M1koWhG2rF === 'Blue'}
          />
          <label htmlFor="Blue">Blue</label>
          <br />
          <br />
          <hr />
          <label htmlFor="Are you a ruler or leader (wpO7dYH2J1lAww3rMCyG)">
            Are you a ruler or leader?
          </label>
          <br />
          <input
            type="radio"
            name="wpO7dYH2J1lAww3rMCyG"
            value="Ruler"
            onChange={this.handleChange}
            checked={this.state.wpO7dYH2J1lAww3rMCyG === 'Ruler'}
          />
          <label htmlFor="Ruler">Ruler</label>
          <input
            type="radio"
            name="wpO7dYH2J1lAww3rMCyG"
            value="Leader"
            onChange={this.handleChange}
            checked={this.state.wpO7dYH2J1lAww3rMCyG === 'Leader'}
          />
          <label htmlFor="Leader">Leader</label>
          <br />
          <br />
          <hr />
          <label htmlFor="Do you prefer calling or texting (wRp01LtH7TL5oKx1HJCe)">
            Do you prefer calling or texting?
          </label>
          <br />
          <input
            type="radio"
            name="wRp01LtH7TL5oKx1HJCe"
            value="Calling"
            onChange={this.handleChange}
            checked={this.state.wRp01LtH7TL5oKx1HJCe === 'Calling'}
          />
          <label htmlFor="Calling">Calling</label>
          <input
            type="radio"
            name="wRp01LtH7TL5oKx1HJCe"
            value="Texting"
            onChange={this.handleChange}
            checked={this.state.wRp01LtH7TL5oKx1HJCe === 'Texting'}
          />
          <label htmlFor="Texting">Texting</label>
          <br />
          <br />
          <hr />
          <label htmlFor="I spend much of my time.. (5 being grounded in the present) (IcZ4Y1pPWWRRdE7W9mXX) ">
            I spend much of my time... 1-10: 1,stuck in the past. 5,grounded in
            present. 10,fearing the future
          </label>
          <br />
          <label htmlFor="IcZ4Y1pPWWRRdE7W9mXX">Past Present Future</label>
          <input
            type="number"
            min="1"
            max="10"
            name="IcZ4Y1pPWWRRdE7W9mXX"
            value={this.state.IcZ4Y1pPWWRRdE7W9mXX}
            onChange={this.handleChange}
          />
          <br />
          <br />
          <hr />
          <label htmlFor="How many states have you visited (PXqcCqj7gH3FB6dEwYKC)">
            How many states have you visited?
          </label>
          <br />
          <label htmlFor="PXqcCqj7gH3FB6dEwYKC">States Visited</label>
          <input
            type="number"
            name="PXqcCqj7gH3FB6dEwYKC"
            value={this.state.PXqcCqj7gH3FB6dEwYKC}
            onChange={this.handleChange}
          />
          <br />
          <br />
          <hr />
          <label htmlFor="What came first? The chicken or the egg (3iMzByA5eCCFltsdBFgB) ">
            What came first? The chicken or the egg?
          </label>
          <br />
          <input
            type="radio"
            name="3iMzByA5eCCFltsdBFgB"
            value="Chicken"
            onChange={this.handleChange}
            checked={this.state['3iMzByA5eCCFltsdBFgB'] === 'Chicken'}
          />
          <label htmlFor="Chicken">Chicken</label>
          <input
            type="radio"
            name="3iMzByA5eCCFltsdBFgB"
            value="Egg"
            onChange={this.handleChange}
            checked={this.state['3iMzByA5eCCFltsdBFgB'] === 'Egg'}
          />
          <label htmlFor="Egg">Egg</label>
          <br />
          <br />
          <hr />
          <label htmlFor="Would you rather use a pen or pencil (ww0GdTOiMIchprRmPoEE) ">
            Would you rather use a pen or pencil?
          </label>
          <br />
          <input
            type="radio"
            name="ww0GdTOiMIchprRmPoEE"
            value="Pen"
            onChange={this.handleChange}
            checked={this.state.ww0GdTOiMIchprRmPoEE === 'Pen'}
          />
          <label htmlFor="Pen">Pen</label>
          <input
            type="radio"
            name="ww0GdTOiMIchprRmPoEE"
            value="Pencil"
            onChange={this.handleChange}
            checked={this.state.ww0GdTOiMIchprRmPoEE === 'Pencil'}
          />
          <label htmlFor="Pencil">Pencil</label>
          <br />
          <br />
          <hr />
          <label htmlFor="How many friends do you share personal time with on a consistent weekly basis (OtiqQWHNMoBFV4c3ckpS)">
            How many friends do you share personal time with on a consistent
            weekly basis?
          </label>
          <br />
          <label htmlFor="OtiqQWHNMoBFV4c3ckpS">Friends per week</label>
          <input
            type="number"
            name="OtiqQWHNMoBFV4c3ckpS"
            value={this.state.OtiqQWHNMoBFV4c3ckpS}
            onChange={this.handleChange}
          />
          <br />
          <br />
          <hr />
          How many times do you cook a week?
          <br />
          <label htmlFor="94j8BqwUKuQr61oUvY9W">Hours cooking per week</label>
          <input
            type="number"
            name="94j8BqwUKuQr61oUvY9W"
            value={this.state['94j8BqwUKuQr61oUvY9W']}
            onChange={this.handleChange}
          />
          <br />
          <br />
          <hr />
          <label htmlFor="Half Empty or Half Full (WykLLlKBs0IYLDm5iWQB)">
            Is the glass half-empty or half-full
          </label>
          <br />
          <input
            type="radio"
            name="WykLLlKBs0IYLDm5iWQB"
            value="Half-empty"
            onChange={this.handleChange}
            checked={this.state.WykLLlKBs0IYLDm5iWQB === 'Half-empty'}
          />
          <label htmlFor="Half-empty">Half-empty</label>
          <input
            type="radio"
            name="WykLLlKBs0IYLDm5iWQB"
            value="Half-full"
            onChange={this.handleChange}
            checked={this.state.WykLLlKBs0IYLDm5iWQB === 'Half-full'}
          />
          <label htmlFor="Half-full">Half-full</label>
          <br />
          <br />
          <hr />
          Coke or Pepsi?
          <br />
          <input
            type="radio"
            name="czwgpww6lyxa34bdbRlR"
            value="Coke"
            onChange={this.handleChange}
            checked={this.state.czwgpww6lyxa34bdbRlR === 'Coke'}
          />
          <label htmlFor="Coke">Coke</label>
          <input
            type="radio"
            name="czwgpww6lyxa34bdbRlR"
            value="Pepsi"
            onChange={this.handleChange}
            checked={this.state.czwgpww6lyxa34bdbRlR === 'Pepsi'}
          />
          <label htmlFor="Pepsi">Pepsi</label>
          <br />
          <br />
          <hr />
          Overall, I am proud of the person I am and what I've accomplished in
          life.
          <br />
          <label htmlFor="s2GdZnP781WE0Rde2pve">Proud 1-10</label>
          <input
            type="number"
            min="1"
            max="10"
            value={this.state.s2GdZnP781WE0Rde2pve}
            name="s2GdZnP781WE0Rde2pve"
            onChange={this.handleChange}
          />
          <br />
          <br />
          <hr />
          Weekly average time (hours) exercising?
          <br />
          <label htmlFor="PgA18LiwLKmxdLQK8mZN">Hours exercising</label>
          <input
            type="number"
            name="PgA18LiwLKmxdLQK8mZN"
            value={this.state.PgA18LiwLKmxdLQK8mZN}
            onChange={this.handleChange}
          />
          <br />
          <br />
          <hr />
          Superman or Batman?
          <br />
          <input
            type="radio"
            name="Jjxs5iWmny5Ox4cvhZPA"
            value="Superman"
            checked={this.state.Jjxs5iWmny5Ox4cvhZPA === 'Superman'}
            onChange={this.handleChange}
          />
          <label htmlFor="Superman">Superman</label>
          <input
            type="radio"
            name="Jjxs5iWmny5Ox4cvhZPA"
            value="Batman"
            checked={this.state.Jjxs5iWmny5Ox4cvhZPA === 'Batman'}
            onChange={this.handleChange}
          />
          <label htmlFor="Batman">Batman</label>
          <br />
          <br />
          <hr />
          Pancakes or waffles?
          <br />
          <input
            type="radio"
            name="DepXFWGYmIZtXW6v9aTu"
            value="Pancake"
            checked={this.state.DepXFWGYmIZtXW6v9aTu === 'Pancake'}
            onChange={this.handleChange}
          />
          <label htmlFor="Pancake">Pancake</label>
          <input
            type="radio"
            name="DepXFWGYmIZtXW6v9aTu"
            value="Waffles"
            checked={this.state.DepXFWGYmIZtXW6v9aTu === 'Waffles'}
            onChange={this.handleChange}
          />
          <label htmlFor="Waffles">Waffles</label>
          <br />
          <br />
          <hr />
          How old were you at the time of your first kiss?
          <br />
          <label htmlFor="4CbajKs75QKoSP1I3J3a">Age</label>
          <input
            type="number"
            name="4CbajKs75QKoSP1I3J3a"
            onChange={this.handleChange}
            value={this.state['4CbajKs75QKoSP1I3J3a']}
          />
          <br />
          <br />
          <hr />
          Ideal number of children?
          <br />
          <label htmlFor="LS5ozXZVNnaQz3hvTgzr">Number of children</label>
          <input
            type="number"
            name="LS5ozXZVNnaQz3hvTgzr"
            value={this.state.LS5ozXZVNnaQz3hvTgzr}
            onChange={this.handleChange}
          />
          <br />
          <br />
          <hr />
          Do you write in cursive?
          <br />
          <input
            type="radio"
            name="b8ALlRKAoo6n3RGq2LtL"
            value="No"
            id="cursiveNo"
            checked={this.state.b8ALlRKAoo6n3RGq2LtL === 'No'}
            onChange={this.handleChange}
          />
          <label htmlFor="cursiveNo">No</label>
          <input
            type="radio"
            name="b8ALlRKAoo6n3RGq2LtL"
            value="Yes"
            id="cursiveYes"
            checked={this.state.b8ALlRKAoo6n3RGq2LtL === 'Yes'}
            onChange={this.handleChange}
          />
          <label htmlFor="cursiveYes">Yes</label>
          <br />
          <br />
          <hr />
          Tv shows or movies?
          <br />
          <input
            type="radio"
            name="evwE6TqRwFwgj0iQREvO"
            value="Shows"
            checked={this.state.evwE6TqRwFwgj0iQREvO === 'Shows'}
            onChange={this.handleChange}
          />
          <label htmlFor="Shows">Shows</label>
          <input
            type="radio"
            name="evwE6TqRwFwgj0iQREvO"
            value="Movies"
            checked={this.state.evwE6TqRwFwgj0iQREvO === 'Movies'}
            onChange={this.handleChange}
          />
          <label htmlFor="Movies">Movies</label>
          <br />
          <br />
          <hr />
          How many countries have you visited?
          <br />
          <label htmlFor="yqEqD9PpiLRB898akHTY">Number of Countries</label>
          <input
            type="number"
            min="1"
            max="10"
            name="yqEqD9PpiLRB898akHTY"
            value={this.state.yqEqD9PpiLRB898akHTY}
            onChange={this.handleChange}
          />
          <br />
          <br />
          <hr />
          Average time (hours) sleeping per night
          <br />
          <label htmlFor="OhGBt2o71rdNVmlZdCsL">Hours</label>
          <input
            type="number"
            name="OhGBt2o71rdNVmlZdCsL"
            value={this.state.OhGBt2o71rdNVmlZdCsL}
            onChange={this.handleChange}
          />
          <br />
          <br />
          <hr />
          Can you juggle?
          <br />
          <input
            type="radio"
            name="1IygiR99g2pTTpd7kqqF"
            value="Yes"
            id="juggleYes"
            onChange={this.handleChange}
            checked={this.state['1IygiR99g2pTTpd7kqqF'] === 'Yes'}
          />
          <label htmlFor="juggleYes">Yes</label>
          <input
            type="radio"
            name="1IygiR99g2pTTpd7kqqF"
            value="No"
            id="juggleNo"
            checked={this.state['1IygiR99g2pTTpd7kqqF'] === 'No'}
            onChange={this.handleChange}
          />
          <label htmlFor="juggleNo">No</label>
          <br />
          <br />
          <hr />
          Do you prefer your eggs sunny side up or hard boiled?
          <br />
          <input
            type="radio"
            name="tHupAXv5K1uqERq4UDqi"
            value="Boiled"
            onChange={this.handleChange}
            checked={this.state.tHupAXv5K1uqERq4UDqi === 'Boiled'}
          />
          <label htmlFor="Boiled">Boiled</label>
          <input
            type="radio"
            name="tHupAXv5K1uqERq4UDqi"
            value="Sunny side"
            onChange={this.handleChange}
            checked={this.state.tHupAXv5K1uqERq4UDqi === 'Sunny side'}
          />
          <label htmlFor="Sunny side">Sunny side</label>
          <br />
          <br />
          <hr />
          When I think about my body 1-10, 1:lose weight, 5:content, 10:gain
          weight
          <br />
          <label htmlFor="RtMecWrcUthp0sbmb3pg">1-10</label>
          <input
            type="number"
            name="RtMecWrcUthp0sbmb3pg"
            min="1"
            max="10"
            onChange={this.handleChange}
            value={this.state.RtMecWrcUthp0sbmb3pg}
          />
          <br />
          <br />
          <hr />
          Evens or Odds?
          <br />
          <input
            type="radio"
            name="pW06bXPfGsk5132wSpXi"
            value="Odds"
            onChange={this.handleChange}
            checked={this.state.pW06bXPfGsk5132wSpXi === 'Odds'}
          />
          <label htmlFor="Odds">Odds</label>
          <input
            type="radio"
            name="pW06bXPfGsk5132wSpXi"
            value="Evens"
            onChange={this.handleChange}
            checked={this.state.pW06bXPfGsk5132wSpXi === 'Evens'}
          />
          <label htmlFor="Evens">Evens</label>
          <br />
          <br />
          <hr />
          Which one doesn't have a mustache?
          <br />
          <input
            type="radio"
            name="YMkzBiRV5EYo52EudG0n"
            value="King of Spades"
            onChange={this.handleChange}
            checked={this.state.YMkzBiRV5EYo52EudG0n === 'King of Spades'}
          />
          <label htmlFor="King of Spades">King of Spades</label>
          <input
            type="radio"
            name="YMkzBiRV5EYo52EudG0n"
            value="King of Clubs"
            onChange={this.handleChange}
            checked={this.state.YMkzBiRV5EYo52EudG0n === 'King of Clubs'}
          />
          <label htmlFor="King of Clubs">King of Clubs</label>
          <input
            type="radio"
            name="YMkzBiRV5EYo52EudG0n"
            value="King of Diamonds"
            onChange={this.handleChange}
            checked={this.state.YMkzBiRV5EYo52EudG0n === 'King of Diamonds'}
          />
          <label htmlFor="King of Diamonds">King of Diamonds</label>
          <input
            type="radio"
            name="YMkzBiRV5EYo52EudG0n"
            value="King of Hearts"
            onChange={this.handleChange}
            checked={this.state.YMkzBiRV5EYo52EudG0n === 'King of Hearts'}
          />
          <label htmlFor="King of Hearts">King of Hearts</label>
          <br />
          <br />
          <hr />
          Favorite Fruit?
          <br />
          <label htmlFor="Favorite fruit = (YV8GcDKo9pILz5xzGXG7)">
            <input
              type="text"
              name="YV8GcDKo9pILz5xzGXG7"
              value={this.state.YV8GcDKo9pILz5xzGXG7}
              onChange={this.handleChange}
            />
          </label>
          <br />
          <br />
          <button type="submit">Submit 37</button>
          <br />
          <br />
        </form>
      </div>
    )
  }
}

export default SurveyInput
