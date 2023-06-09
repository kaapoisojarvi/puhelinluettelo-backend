const express = require('express')
const app = express()

app.use(express.json())

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456"
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523"
  },
  {
    id: 3,
    name: "Dan Ambromov",
    number: "12-42-234345"
  }
]

const info = (`
  <p>Phonebook has info for ${persons.length} people.</p>
  <p>${new Date()}</p>
`)

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.get('/info', (req, res) => {
  res.send(info)
})

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const person = persons.find(person => person.id === id)

  if (person) {
    res.json(person)
  } else {
    res.status(404).end()
  }
})

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  persons = persons.filter(person => person.id !== id)

  res.status(204).end()
})

app.post('/api/persons', (req, res) => {
  if(!Object.keys(req.body).includes("number") || !Object.keys(req.body).includes("name")){
    res.statusMessage = "Request must include name and number"
    res.status(409).end()
  }else if(persons.some(p => p.name === req.body.name)){
    res.statusMessage = "Name must be unique"
    res.status(409).end()
  }else{
    const id = Math.floor(Math.random() * 69000000)
    const person = {
      id: id,
      name: req.body.name,
      number: req.body.number
    }
    persons = persons.concat(person)

    res.json(person)
  }
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})