import React, { useState } from 'react'
import { Button, List, ListItem, ListItemText, Modal } from '@material-ui/core'
import './Todo.css'
import db  from "./firebase"



function Todo(props) {
    const [ open, setOpen ] = useState(false)
    const [ input, setInput] = useState('')

    const handleOpen = (e) =>{ 
        e.preventDefault();
        setOpen(true)
    }

    const updateTodo = () => {
        db.collection('todos').doc(props.todo.id).set({todo: input}, { merge: true });
        setOpen(false);
    }
    return (
        <div>
            <Modal
            open={open}
            onClose={e => setOpen(false)}
        >
            <div>
                <h1>I am a modal</h1>
                <input placeholder={props.todo.todo} value={input} onChange={e => setInput(e.target.value)} />
                <Button onClick={updateTodo} >Update Todo</Button>
            </div>
        </Modal>
        <List className="todo__list" >
        <ListItem>
            <ListItemText primary={props.todo.todo} secondary="Deadline..." />
        </ListItem>
        <button onClick={handleOpen} >Edit</button>
        <Button onClick={e => db.collection('todos').doc(props.todo.id).delete() } >Remove Todo</Button>
        </List>
        </div>
    )
}

export default Todo
