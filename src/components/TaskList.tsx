import { MouseEvent, useCallback, useState } from 'react';
import { FiCheckSquare, FiFolder, FiTrash } from 'react-icons/fi';
import { toast } from 'react-toastify';
import '../styles/tasklist.scss';
import { Dropdown } from './Dropdown';
import { Modal } from './Modal';



interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export interface Folder {
  id: number;
  title: string;
  tasks: Task[];
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [folders, setFolders] = useState<Folder[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"task" | 'folder'>("task");
  const [mousePositions, setMousePosition] = useState({left: '', top: ''});

  function handleOpenDropdown(e: MouseEvent) {
    const left = e.pageX + 'px';
    const top = e.pageY + 'px';
    e.preventDefault();
    setIsDropdownOpen(true);
    setMousePosition({left, top});
  }

  const onClickFolder = useCallback(() => {
    setModalType('folder')
    setIsModalOpen(true);
  }, [])

  const handleCreateNewFolder = useCallback((name: string) => {

    const newFolder = {
      id: Math.ceil(Math.random() * (10000 - 1)) + 1,
      title: name,
      tasks: []
    }

    setFolders([...folders, newFolder]);
    toast.success("Pasta criada com sucesso")

  }, [])

  function handleCreateNewTask(name: string, folderId: number | null ) {

    const task: Task = {
      id: Math.ceil(Math.random() * (10000 - 1)) + 1,
      title: name,
      isComplete: false
    }

    const folder = folders.find(folderState => folderState.id === folderId);

    if(!folder) {
      const newTasks = [...tasks, task];
      return setTasks(newTasks)
    }

    folder?.tasks.push(task);
    const folderIndex = folders.findIndex(folderState => folderState.id === folder.id);
    const cloneFolders = [...folders];

    cloneFolders.splice(folderIndex, 1, folder);

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
      <section className="task-list container" onContextMenu={handleOpenDropdown}>
        <header>
          <h2>Minhas tasks</h2>
          <div className="input-group" >
            <button onClick={() => {
              setIsModalOpen(true)
              setModalType('folder')
            }}>
              <FiCheckSquare size={16} color="#fff"/>
              Nova pasta
            </button>
            <button onClick={() => {
              setIsModalOpen(true)
              setModalType('task')
            }}>
              <FiCheckSquare size={16} color="#fff"/>
              Nova todo
            </button>
          </div>
        </header>

        <main>
          <ul>
            {folders.map(folder => (
              <li key={folder.id}>
                <div className="folder">
                  <FiFolder />
                  {folder.title}
                </div>
                <ul>
                {folder.tasks.map(task => (
                  <li key={task.id} className="todo">
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
              </li>
            ))}
          </ul>
          <ul>
            {tasks.map(task => (
              <li key={task.id} className="todo">
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
      {isDropdownOpen && <Dropdown folderFunction={onClickFolder} onClose={() => setIsDropdownOpen(false)} left={mousePositions.left} top={mousePositions.top} /> }
      {isModalOpen && <Modal folders={folders} addFolder={handleCreateNewFolder} addTask={handleCreateNewTask} type={modalType} onClose={() => setIsModalOpen(false)}/> }
    </>
  )
}