import './App.css';
import { useState, useEffect } from 'react';
import Todo from './Todo'
import db from './firebase'
import firebase from "firebase"

function App() {
  const  [todos, setTodos] = useState([]);
  const [input, setInput] = useState([""]);

  useEffect(() => {

    //Fetching todos from database
      db.collection('todos').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
        setTodos(snapshot.docs.map((doc) => ({
          id:doc.id,
          todo: doc.data().todo})))
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
    <div className="header">
      <h2>Write a Todo and fix your life</h2>
      <form >
      <div className="header__below" >
        <div className="header__input">
          <input placeholder="Write a todo" value={input} onChange={event => setInput(event.target.value)}  />
        </div>
        <button disabled={!input} type="submit" onClick={addTodo} variant="contained" color="primary"   >Add Todo</button>
      </div>
        
        {/* <button >Add Todo</button> */}
        <ul>
          {todos.map((todo) => (
            <Todo todo={todo}/>
          ))}
        </ul>
      </form>
    </div>
  );
}

export default App;
