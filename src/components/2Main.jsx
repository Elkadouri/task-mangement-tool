import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faCheck,
  faEdit,
  faTrash,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { useRef, useState } from "react";

export default function Main() {
  // state for all tasks in array named: allTasks
  const [allTasks, setAllTasks] = useState(
    localStorage.getItem("allTasks")
      ? JSON.parse(localStorage.getItem("allTasks"))
      : []
  );


  // state for add task
  const [addeddTask, setAddeddTask] = useState({
    id: "",
    title: "",
    completed: false,
  });

  // function add task
  function addTask() {
    if (addeddTask.title !== "") {
      let newAllTasks = [...allTasks];
      const newId = newAllTasks.length ? newAllTasks[newAllTasks.length - 1].id + 1 : 1;
      
      newAllTasks.push({ ...addeddTask, id: newId});

      setAllTasks(newAllTasks);
      localStorage.setItem("allTasks", JSON.stringify(newAllTasks));
    }

    setTimeout(() => {
        setAddeddTask({id: '' , title:'' ,completed:false});
    }, 1000);
  }

  //  function deleteAllTasks
  function deleteAllTasks(){
    setAllTasks([]);
    localStorage.removeItem("allTasks");
  } 


  //  function deleteTask
  function deleteTask(id){

  
    setAddOrUpdate('add');
    setAddeddTask({...addeddTask , title:''})
      
    let newAllTasks = allTasks.filter((obj) => {
        return obj.id !== id
    })

    setAllTasks(newAllTasks);
    localStorage.setItem("allTasks", JSON.stringify(newAllTasks));
  } 

  //  add or update task
  const [addOrUpdate , setAddOrUpdate] = useState('add');

  // Create a ref using useRef
  const inputRef = useRef(null);

  //  function displayTaskTitle 
  function displayTaskTitle(id){
    inputRef.current.focus();
    setAddOrUpdate('update');
    let taskToUpdate = allTasks.find((obj) => {
        return obj.id === id
    })
    setAddeddTask({...taskToUpdate})
  }

  // function updateTask
  function updateTask(){

   let newAllTasks = allTasks.map((obj) => {
      if(obj.id === addeddTask.id){
        return {...obj , title:addeddTask.title}
      }
      else{
        return obj
      }
    })

    setAllTasks(newAllTasks);
    localStorage.setItem("allTasks", JSON.stringify(newAllTasks));

    setAddOrUpdate('add');
    setAddeddTask({...addeddTask , title:''})
  }

  //  function handleCompleted
  function handleCompleted(id){
    let newAllTasks = allTasks.map((obj) => {
        if(obj.id === id){
          return {...obj , completed: obj.completed ? false : true}
        }
        else{
          return obj
        }
      })
  
      setAllTasks(newAllTasks);
      localStorage.setItem("allTasks", JSON.stringify(newAllTasks));
  }

  return (
    <main>
      <div className="control">
        <input
          ref={inputRef}
          className="add-task"
          type="text"
          placeholder={`add task`}
          name="task"
          autoComplete="off"
          value={addeddTask.title}
          onChange={(e) => {
            setAddeddTask({...addeddTask , title :e.target.value});
          }}
        />
        <button
          className="add-update-task"
          disabled={addeddTask.title === ""}
          onClick={() => {
            addOrUpdate === 'add' ? addTask() : updateTask();
          }}
        >
          {addOrUpdate === 'add' ? <FontAwesomeIcon icon={faPlus}/>: <FontAwesomeIcon icon={faEdit} />}
        </button>
      </div>

      {allTasks.length > 0 && (
        <button className="delete-all"
          onClick={() => deleteAllTasks()}
        >
            Delete All ({allTasks.length})
        </button>
      )}

      {allTasks.length > 0 
      ? (
        <div className="tasks">
          {allTasks.map((obj , i) => {
            return (
              <div key={obj.id} className={`task ${obj.completed ? 'incomplet-task' : ''}`}>
                <div className="task-title">{i+1 + ' -  '+obj.title}</div>
                <div className="task-btns">
                  <button className={`mark-as-btn ${obj.completed ? 'completed' : 'incompleted'}`}
                    onClick={() => {
                        handleCompleted(obj.id)
                    }}
                  >
                    {obj.completed ? <FontAwesomeIcon icon={faCheck}/> : <FontAwesomeIcon icon={faTimes} />}
                  </button>

                  <button className="update-btn"
                    onClick={() => displayTaskTitle(obj.id)}
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </button>

                  <button className="delete-btn"
                    onClick={() => deleteTask(obj.id)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        )
      : (
        <div className="no-tasks">No tasks available at the moment. Please add a new task to get started !</div>
        )
    }

    </main>
  );
}
