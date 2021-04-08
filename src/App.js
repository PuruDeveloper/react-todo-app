import './App.css';
import { useState, useEffect } from 'react';
import Todo from './Todo'
import db from './firebase'
import firebase from "firebase"
import moment from "moment"

function App() {
  const  [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {

    //Fetching todos from database
      db.collection('todos').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
        setTodos(snapshot.docs.map((doc) => ({
          id:doc.id,
          todo: doc.data().todo,
          timestamp: doc.data().timestamp,
          date: doc.data().date
        })))
      })
  }, [])

  const addTodo = (event) => {
    event.preventDefault()
    if( input.trim() != "" ) {
      const Date = moment().format('MMMM Do YYYY, h:mm:ss a')
      //Adding Todo to the database
      db.collection('todos').add({
      todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      date: `${Date}`
    })
    }
    // const Date = moment().format('MMMM Do YYYY, h:mm:ss a')
    // //Adding Todo to the database
    // db.collection('todos').add({
    //   todo: input,
    //   timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    //   date: `${Date}`
    // })
    setInput("")
  }
  return (
    <div className="header">
      <h2>Add a note and get to work</h2>
      <form >
      <div className="header__below" >
        <div className="header__input">
          <input placeholder="Write a todo" value={input} onChange={event => setInput(event.target.value)} />
        </div>
        <button disabled={!input} type="submit" onClick={addTodo} variant="contained" color="primary"   ><i class="fas fa-plus-square"></i></button>
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
