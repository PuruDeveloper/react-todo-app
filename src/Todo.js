import React, { useState } from 'react'
import { Button, List, ListItem, ListItemText, Modal } from '@material-ui/core'
import './Todo.css'
import db  from "./firebase"



function Todo(props) {
    const [ open, setOpen ] = useState(false)
    const [ input, setInput] = useState("")

    const handleOpen = (e) =>{ 
        e.preventDefault();
        setOpen(true);
    }

    const handleDelete = (e) => {
        e.preventDefault();
         db.collection('todos').doc(props.todo.id).delete()
    }

    const updateTodo = (e) => {
        e.preventDefault();
        db.collection('todos').doc(props.todo.id).set({todo: input}, { merge: true });
        setOpen(false);
    }
    return (
        <div>
            <div
            className={open ? "todo__modal active" : "todo__modal"}
            open={open}
            onClose={e => setOpen(false)}
        >
            <div className="todo__modal__inner" >
                <h1>I am a modal</h1>
                <input 
                placeholder={props.todo.todo}
                value={input} 
                onChange={e => setInput(e.target.value)} />
                <button onClick={updateTodo} >Update Todo</button>
            </div>
        </div>
        <List className="todo__list" >
        <div className="todo__list__text" >{props.todo.todo}</div>
            
        <button onClick={handleOpen} >Edit</button>
        <button onClick={handleDelete} >Delete Message</button>
        </List>
        </div>
    )
}

export default Todo
