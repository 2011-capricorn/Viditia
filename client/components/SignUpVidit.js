import React from 'react'

const SignUpVidit = () => {
  const handleSubmit = (e) => {
    e.preventDefault()
    for (let i = 0; i < e.target.length; i++) {
      console.log(e.target[i].name)
    }
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        Signup
        <br />
        <label htmlFor="Summer or winter (CP21nrZ0iDdwf6trKR8c)">
          Summer or winter?
        </label>
        <br />
        <input type="radio" name="Summer" value="bSFg0z7HcoFjS4FbDVCQ" />
        <label htmlFor="Summer">Summer</label>
        <input type="radio" name="Winter" value="AeA4qK7f0JqewA9hizRq" />
        <label htmlFor="Winter">Winter</label>
        <br />
        <br />
        <label htmlFor="Early bird or night owl (ZGKpkv4LFvbyAGrR09yD)">
          Are you an early bird or a night owl?
        </label>
        <br />
        <input type="radio" name="Early bird" value="ZfKchdBQtYOj573pEZRE" />
        <label htmlFor="Early bird">Early bird</label>
        <input type="radio" name="Night owl" value="np5cboxRXrMUy4J3e2CU" />
        <label htmlFor="Night owl">Night owl</label>
        <br />
        <br />
        <label htmlFor="Cat or dog (jbFoVzlEJmuNK7vLkxK5)">Cat or dog?</label>
        <br />
        <input type="radio" name="Cat" value="WuV0AuRgEZEjYfkD9dqG" />
        <label htmlFor="Cat">Cat</label>
        <input type="radio" name="Dog" value="FrZOAxSuOSPlQ276Ruls" />
        <label htmlFor="Dog">Dog</label>
        <br />
        <br />
        <label htmlFor="Right or left (AydpVc7N4PlfCgafhsFO)">
          Are you right or left handed?
        </label>
        <br />
        <input type="radio" name="Right" value="GX1PR57lOAOWvxMdD4kj" />
        <label htmlFor="Right">Right</label>
        <input type="radio" name="Left" value="gSZ37CEOF1bESSdFvBvV" />
        <label htmlFor="Left">Left</label>
        <br />
        <br />
        <label htmlFor="Coffee or tea (Kh8m2S1k0ED9VFYgAw3F)">
          Coffee or tea?
        </label>
        <br />
        <input type="radio" name="Coffee" value="GX1PR57lOAOWvxMdD4kj" />
        <label htmlFor="Coffee">Coffee</label>
        <input type="radio" name="Tea" value="gSZ37CEOF1bESSdFvBvV" />
        <label htmlFor="Tea">Tea</label>
        <br />
        <br />
        <label htmlFor="Beach or mountains (zQIfSpxEVLEm2tyv0n9w)">
          Beach or mountains?
        </label>
        <br />
        <input type="radio" name="Beach" value="Xm16HRUtDDfaUbr1Dfse" />
        <label htmlFor="Beach">Beach</label>
        <input type="radio" name="Mountains" value="Sca74CCTpi1dKRsyEZdj" />
        <label htmlFor="Mountains">Mountains</label>
        <br />
        <br />
        <label htmlFor="Travel (23cVgvROTUzo24WHKl6w)">
          Do you like to travel?
        </label>
        <br />
        <input type="radio" name="Yes" value="529SkNEOtkZKQjwVBXEK" />
        <label htmlFor="Yes">Yes</label>
        <input type="radio" name="No" value="7bRKkXZsXkRxoXMcsuVh" />
        <label htmlFor="No">No</label>
        <br />
        <br />
        <label htmlFor="cheeseburger or hotdog (1qb7vLsHAkCz3GvnjYtK)"></label>
        Cheeseburger or hotdog?
        <br />
        <input type="radio" name="Cheeseburger" value="VVGdxMRNm4qcclccgw8D" />
        <label htmlFor="Cheeseburger">Cheeseburger</label>
        <input type="radio" name="Hotdog" value="lZ3RWPIvtmJLT6xFOEqE" />
        <label htmlFor="Hotdog">Hotdog</label>
        <br />
        <br />
        <label htmlFor="beyonce or black sabbath (JqzBPNZ4QyZr0HKXWjzA)"></label>
        Beyonce or Black Sabbath?
        <br />
        <input type="radio" name="Beyonce" value="e88saK61cjg99RRHfuIq" />
        <label htmlFor="Beyonce">Beyonce</label>
        <input type="radio" name="Black Sabbath" value="zNDd8iW59a333RTE8Brs" />
        <label htmlFor="Black Sabbath">Black Sabbath</label>
        <br />
        <br />
        <label htmlFor="Yes or no (PjRhb7Y5pmuwaI9Ds4Jf)"></label>
        Yes or no?
        <br />
        <input type="radio" name="yes" value="eMlHzxLcX9u74B8MCDpl" />
        <label htmlFor="yes">yes</label>
        <input type="radio" name="no" value="Eai51337G9THERGs9DIU" />
        <label htmlFor="no">no</label>
        <br />
        <br />
        <button type="submit">Submit signup Vidits</button>
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
export default SignUpVidit
