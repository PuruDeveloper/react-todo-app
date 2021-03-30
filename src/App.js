import './App.css';
import { useState, useEffect } from 'react';
import { Button, FormControl, InputLabel, Input } from '@material-ui/core'
import Todo from './Todo'
import db from './firebase'
import firebase from "firebase"

function App() {
  const  [todos, setTodos] = useState([]);
  const [input, setInput] = useState([""]);

  useEffect(() => {

    //Fetching todos from database
      db.collection('todos').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
        setTodos(snapshot.docs.map((doc) => doc.data().todo))
      })
  }, [])

  const addTodo = (event) => {
    event.preventDefault()
    //Adding Todo to the database
    db.collection('todos').add({
      todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    }) 
    setInput('')
  }
  return (
    <div className="App">
      <h2>Hi</h2>
      <form >
        <FormControl>
          <InputLabel>Write a todo</InputLabel>
          <Input value={input} onChange={event => setInput(event.target.value)}  />
        </FormControl>
        <Button disabled={!input} type="submit" onClick={addTodo} variant="contained" color="primary"   >Add Todo</Button>
        {/* <button >Add Todo</button> */}
        <ul>
          {todos.map((todo, index) => (
            <Todo index={index} text={todo}/>
          ))}
        </ul>
      </form>
    </div>
  );
}

export default App;
