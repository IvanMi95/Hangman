var randomWords = require('random-words');
const Swal = require('sweetalert2')

let alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
  'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
  't', 'u', 'v', 'w', 'x', 'y', 'z']
const letters = document.getElementById('letters')
const gameLines = document.getElementById('gameLines')
let word = randomWords()
let wordLetters = word.split("");
let lives = 10
let idCounter = 1
let ids = []
let winCounter = 0

const restart = () => {
  word = randomWords()
  wordLetters = word.split("");
  lives = 10
  idCounter = 1
  ids = []

  document.getElementById('lives').innerText = `You have ${lives} lives left`
  letters.innerHTML = ''
  gameLines.innerHTML = ''

  alphabet.forEach(x => {
    let letter = document.createElement('li')
    letter.innerText = x
    letter.classList.add('letter')
    letter.addEventListener('click', event => handleClick(x, event))
    letters.appendChild(letter)
  })
  wordLetters.forEach(x => {
    let letter = document.createElement('li')
    letter.id = `${x}${idCounter}`
    ids.push(`${x}${idCounter}`)
    idCounter++
    letter.classList.add('gameLetter')
    gameLines.appendChild(letter)
  })
}

const gameOver = (winOrLoose) => {
  if (winOrLoose == true) {
    new Swal({
      title: "You won!",
      color: '#D9C183',
      background: '#00081C',
      showConfirmButton:true,
      confirmButtonColor:'#D9C183',
      confirmButtonText:'Nice!!!'
    }).then(()=>restart())
  } else {
    new Swal({
      title: "You lost!",
      text:`The word was ${word}`,
      color: '#D9C183',
      background: '#00081C',
      showConfirmButton:true,
      confirmButtonColor:'#D9C183',
      confirmButtonText:'Sorry!!!'
    }).then(()=>restart())
    
  }
}
const handleClick = (letter, event) => {
  if (event.target.classList.contains('clicked')) return false
  event.target.classList.add('clicked')
  if (wordLetters.includes(letter)) {
    ids.forEach(element => {
      if (element.includes(letter)) {
        document.getElementById(element).innerText = letter
        winCounter++
        winCounter == wordLetters.length && gameOver(true)
      }
    });
  } else {
    lives--
    document.getElementById('lives').innerText = `You have ${lives} lives left`
    lives == 0 && gameOver(false)
  }
}

alphabet.forEach(x => {
  let letter = document.createElement('li')
  letter.innerText = x
  letter.classList.add('letter')
  letter.addEventListener('click', event => handleClick(x, event))
  letters.appendChild(letter)
})
wordLetters.forEach(x => {
  let letter = document.createElement('li')
  letter.id = `${x}${idCounter}`
  ids.push(`${x}${idCounter}`)
  idCounter++
  letter.classList.add('gameLetter')
  gameLines.appendChild(letter)
})

