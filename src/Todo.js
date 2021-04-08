import React, { useState } from 'react'
import { Button, List, ListItem, ListItemText, Modal } from '@material-ui/core'
import './Todo.css'
import db  from "./firebase"


function Todo(props) {
    const [ open, setOpen ] = useState(false)
    const [ input, setInput] = useState(`${props.todo.todo}`)

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
                <h1>Update Your Note</h1>
                <input 
                placeholder={props.todo.todo}
                value={input} 
                onChange={e => setInput(e.target.value)} />
                <button className="update__button" disabled={!input} onClick={updateTodo} >Update Note</button>
            </div>
            </div>
        <List className="todo__list" >
        <div className="todo__list__text" >
            <div className="todo__list__text text" >{props.todo.todo}</div>
            <div className="todo__list__text time" >{props.todo.date}</div>
            {/* <ListItemText primary={props.todo.todo} secondary={props.todo.date} /> */}
        </div>
            
        {/* <div className="todo__list__text" >{props.todo.todo}
        </div>
        <div className="todo__list__text" >
            {props.todo.date}
        </div> */}
        <button onClick={handleOpen} ><i class="fas fa-pencil-alt"></i></button>
        <button onClick={handleDelete} ><i className="fas fa-trash-alt"></i></button>
        </List>
        </div>
    )
}

export default Todo
