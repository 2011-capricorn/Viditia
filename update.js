import firebase from './public/firebase'

const db = firebase.firestore()
const allPolls = db.collection('polls').get().docs()

allPolls.then((querySnapshot) => {
  querySnapshot
    .forEach((poll) => {
      // poll.update({
      //   likes: 0
      // })
      console.log(333, poll)
    })
    .then(function () {
      console.log('updated!')
    })
})

db.collection('polls')
  .doc('')
  .update({
    likes: 0,
  })
  .then(function () {
    console.log('Likes updated/added')
  })

db.collection('users')
  .doc('0Fy4CoQSB0QW4G36Wlvc')
  .update({
    liked: [],
  })
  .then(function () {
    console.log(222, 'liked array has been added')
  })

for (let i = 0; i < this.state.users.length; i++) {
  db.collection('users').doc(this.state.users[i]).update({
    liked: [],
  })
  console.log(222, this.state.user[i])
}

db.collection('polls')
  .get()
  .then(function (querySnapshot) {
    querySnapshot.forEach(function (doc) {
      doc.ref.update({
        likes: 0,
      })
    })
  })
