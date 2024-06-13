import { useState, useEffect } from 'react'
import axios from 'axios'
import { Table, Form, Button, Alert } from 'react-bootstrap'
import { Container } from '@mui/material'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])

    useEffect(() => {
      const fetchResources = async () => {
        try {
          const response = await axios.get(baseUrl)
          setResources(response.data)
        } catch (error) {
          console.error(error)
        }
      }
      fetchResources()
    }, [baseUrl])

  const create = async (resource) => {
    try {
      const response = await axios.post(baseUrl, resource)
      const createdResource = response.data
      setResources([...resources, createdResource])
    } catch (error) {
      console.error(error)
    }
    
  }

  const service = {
    create
  }

  return [
    resources, service
  ]
}

const App = () => {
  const content = useField('text')
  const name = useField('text')
  const number = useField('text')

  const [notes, noteService] = useResource('http://localhost:3005/notes')
  const [persons, personService] = useResource('http://localhost:3005/persons')
  const [message, setMessage] = useState('')

  const handleNoteSubmit = (event) => {
    event.preventDefault()
    if (content.value.length < 1) {
      alert("Longer note please")
    } else {
      noteService.create({ content: content.value })
      setMessage(`${content.value} has been created!`)
      content.value = ''
      setTimeout(() => {
        setMessage('')
      }, 5000)
    }
  }
 
  const handlePersonSubmit = (event) => {
    event.preventDefault()
    personService.create({ name: name.value, number: number.value})
    setMessage(`${name.value} ${number.value} has been created!`)
    setTimeout(() => {
      setMessage('')
    }, 5000)
  }

  return (
    <Container>
      <div>
        <div>
          {message && (
            <Alert severity='success'>
              {message}
            </Alert>
          )}
        </div>
        <h2>notes</h2>
        <form onSubmit={handleNoteSubmit}>
          <Form.Group>
            <Form.Label>Note Content:</Form.Label>
            <input {...content} />
            <Button variant="primary" type='submit'>create</Button>
          </Form.Group>
        </form>
        <Table striped>
          <tbody>
            {notes.map(n => (
              <tr key={n.id}>
                <td>{n.content}</td>
              </tr>
            ))}
          </tbody>
        </Table>
  
        <h2>persons</h2>
        <form onSubmit={handlePersonSubmit}>
          name <input {...name} /> <br />
          number <input {...number} />
          <Button variant="primary" type='submit'>create</Button>
        </form>
        <Table striped>
          <tbody>
            {persons.map(p => (
              <tr key={p.id}>
                <td>{p.name}</td>
                <td>{p.number}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </Container>
  )
  
}

export default App