const express = require('express')
const app = express()
const morgan = require('morgan')

app.use(express.json())
// app.use(morgan('tiny'))

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get(`/`, (request, response)=>{
    response.send('<h1> An angry man</h1>')
})

app.get('/api/persons',(request,response)=>{
    response.json(persons)
})

app.get('/api/persons/:id',(request,response)=>{
    const id = Number(request.params.id)
    const person = persons.find(pupil => pupil.id === id)
    if(person){
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.get(`/info`, (request, response)=>{
    const date = new Date()
    response.send(`<p> The phonebook has infor of ${persons.length} people
    <br>
    ${date}
    </p>`)
})

app.delete('/api/persons/:id', (request,response)=>{
    const id = Number(request.params.id)
    persons = persons.filter(note => note.id !== id)
  
    response.status(204).end()
})

app.post('/api/persons', (request, response) => {
    const body = request.body
    console.log(body)

    const checkExisting = (name, number) => {
        if (persons.find(person=>person.name == name
            || person.number == number)){
                return true;
            }
        return false
    }

  
    if (!body.name || !body.number) {
      return response.status(400).json({ 
        error: 'content missing' 
      })
    }

   if(checkExisting(body.name, body.number)){
    return response.status(400).json({ 
        error: 'name or number already exists' 
      })
   }

    const id = persons.length+1
  
    const person = {
      name: body.name,
      number: body.number,
      id: id,
    }
  
    persons = persons.concat(person)
  
    response.json(person)
  })
const PORT = 3002
app.listen(PORT,()=>{
    console.log(`Server running on ${PORT}`)
})