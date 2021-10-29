import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { useEffect, useState, useRef } from 'react';

function App() {

  const [todo, setTodo] = useState([])
  const [formVal, setFormVal] = useState(null)
  const [update, setUpdate ] = useState()
  const [updateStatus, setUpdateStatus] = useState(false)
  const [ completeStatus, setCompleteStatus ] = useState('true')


const contentRef = useRef(null)

 const getData = async ()=>{
    axios.get('http://127.0.0.1:8000/api/todo_list')
    .then((data)=>{
      setTodo(data.data)
    })
  }

  useEffect(()=>{
  getData()
}, [setTodo])


// useEffect(()=>{
//   setFormVal('')
// }, [formVal])
const completeTask = (id, content, completed)=>{
  // setCompleteStatus(!completeStatus)
  axios.post(`http://127.0.0.1:8000/api/update_task/${id}`, {...
      {completed :  !completed , content : content }
}).then((data)=>{
      console.log(data)
    })
  getData()

}

    
const updateTodo = ()=>{
  var content = contentRef.current.value
   axios.post(`http://127.0.0.1:8000/api/update_task/${update.id}`, {
      content : content 
    }).then((data)=>{
      console.log(data)
    })
    getData()
}


const createPost = ()=>{
  var content = contentRef.current.value
  axios.post('http://127.0.0.1:8000/api/create_task', {content : content}).then((data)=>{
    setTodo(data.data)
  })
  } 

const handleSubmit= (e)=>{
  

  { updateStatus ? updateTodo() : createPost()}
  
}


const updateTask = (id) =>{
  axios.get(`http://127.0.0.1:8000/api/todo_detail/${id}`)
  .then((data)=>{
    setUpdate(data.data)
    console.log(data.data.content)
  })
  setUpdateStatus(true)
}


const deleteTask = (id) =>{
  axios.get(`http://127.0.0.1:8000/api/delete_task/${id}`)
  .then((data)=>{
    setTodo(data.data)
  })
}
  return (
    <div className='container'>
      <div className="form">
        <form action="" onSubmit={handleSubmit}>
          <input type="text" placeholder='Add task' defaultValue={ update?.content || formVal }  ref = { contentRef }/>
        </form>
        <button onClick={handleSubmit}> Add Task </button>
      </div>

      <div className="tasks">
        { todo?.map((task)=>{
          return(
            <div key={task.id} className='task'>
              <p onClick={()=>{completeTask(task.id, task.content, task.completed )}} className = { task.completed ? 'strike' : 'rm-strike' }> { task.content }</p>
              
              <button onClick={()=>updateTask(task.id)} className='deleteBtn'> Edit</button>
              <button onClick={()=>deleteTask(task.id)} className = 'deleteBtn'> Delete </button>
            </div>
          )
        })}
      </div>
    </div>
  );
}

export default App;
