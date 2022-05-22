import { MouseEvent, useState } from 'react';
import { FiCheckSquare, FiTrash } from 'react-icons/fi';
import { toast } from 'react-toastify';
import '../styles/tasklist.scss';
import { Dropdown } from './Dropdown';
import { Modal } from './Modal';



interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mousePositions, setMousePosition] = useState({left: '', top: ''});

  function handleCreateNewFolder(e: MouseEvent) {
    const left = e.pageX + 'px';
    const top = e.pageY + 'px';
    e.preventDefault();
    setIsDropdownOpen(true);
    setMousePosition({left, top});
  }

  function handleCreateNewTask() {
    if(!newTaskTitle) {
      console.log("teste")
      return toast.error("Informe um nome para sua tarefa antes de criá-la")
    }

    const task: Task = {
      id: Math.ceil(Math.random() * (10000 - 1)) + 1,
      title: newTaskTitle,
      isComplete: false
    }

    const newTasks = [...tasks, task]

    setTasks(newTasks)
    setNewTaskTitle("")
    toast.success("Tarefa criada com sucesso")
  }

  function handleToggleTaskCompletion(id: number) {
    
    setTasks(tasks.map((task) => {
      if(task.id === id) {
        task.isComplete? task.isComplete = false : task.isComplete = true
      }
      
      return task
    }))
  }

  function handleRemoveTask(id: number) {
    const filteredTasks = tasks.filter(task => task.id !== id)
    setTasks(filteredTasks)
    toast.success("Tarefa deletada com sucesso")
  }

  return (
    <>
      <section className="task-list container" onContextMenu={handleCreateNewFolder}>
        <header>
          <h2>Minhas tasks</h2>
          <div className="input-group" >
            {/* <input 
              type="text" 
              placeholder="Adicionar novo todo" 
              onChange={(e) => setNewTaskTitle(e.target.value)}
              value={newTaskTitle}
            />
            <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
              <FiCheckSquare size={16} color="#fff"/>
            </button> */}
            <button onClick={() => setIsModalOpen(true)}>
              <FiCheckSquare size={16} color="#fff"/>
              Nova todo
            </button>
          </div>
        </header>

        <main>
          <ul>
            {tasks.map(task => (
              <li key={task.id}>
                <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                  <label className="checkbox-container">
                    <input 
                      type="checkbox"
                      readOnly
                      checked={task.isComplete}
                      onClick={() => handleToggleTaskCompletion(task.id)}
                    />
                    <span className="checkmark"></span>
                  </label>
                  <p>{task.title}</p>
                </div>

                <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                  <FiTrash size={16}/>
                </button>
              </li>
            ))}
            
          </ul>
        </main>
      </section>
      {isDropdownOpen && <Dropdown left={mousePositions.left} top={mousePositions.top} /> }
      {isModalOpen && <Modal onClose={() => setIsModalOpen(false)}/> }
    </>
  )
}