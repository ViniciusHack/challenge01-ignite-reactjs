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
  isOpen: boolean;
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

  const handleOpenFolder = (folder: Folder) => {
    folder.isOpen = !folder.isOpen;
    const folderIndex = folders.findIndex(folderState => folderState.id === folder.id);

    const cloneFolders = [...folders];
    cloneFolders.splice(folderIndex, 1, folder);
    if(folder.tasks.length === 0) {
      toast.info("Ainda não há tarefas associadas a essa pasta")
    }
    
    setFolders(cloneFolders)
  }

  const onClickDropdownItem = useCallback((type: "folder"| "task") => {
    setModalType(type)
    setIsModalOpen(true);
    setIsDropdownOpen(false);
  }, [])

  const handleCreateNewFolder = useCallback((name: string) => {

    const newFolder = {
      id: Math.ceil(Math.random() * (10000 - 1)) + 1,
      title: name,
      tasks: [],
      isOpen: false
    }

    setFolders([...folders, newFolder]);
    toast.success("Pasta criada com sucesso")

  }, [folders])

  const handleRemoveFolder = (folderId: number) => {
    setFolders(folders.filter(folder => folder.id !== folderId))
  }

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
    folder.isOpen = true;
    const folderIndex = folders.findIndex(folderState => folderState.id === folder.id);
    const cloneFolders = [...folders];

    cloneFolders.splice(folderIndex, 1, folder);

    toast.success("Tarefa criada com sucesso")
  }

  function handleToggleTaskCompletion(id: number, folderId?: number) {

    if(!folderId) {
      return setTasks(tasks.map((task) => {
        if(task.id === id) {
          task.isComplete? task.isComplete = false : task.isComplete = true
        }
        
        return task
      }))

    }
    
    const cloneFolders = [...folders];
    const folderExists = folders.find(folder => folder.id === folderId);
    const folderIndex = folders.findIndex(folder => folder.id === folderId);
    const newTasks = folderExists?.tasks.map(task => {
      if(task.id === id) {
        task.isComplete ? task.isComplete = false : task.isComplete = true
      }

      return task;
    })

    if(newTasks && folderExists) {
      folderExists.tasks = newTasks;
    }

    cloneFolders.splice(folderIndex, 1, folderExists!)
    setFolders(cloneFolders)
    
  }

  function handleRemoveTask(id: number, folderId?: number) {
    if(!folderId) {
      const filteredTasks = tasks.filter(task => task.id !== id)
      return setTasks(filteredTasks)
    }

    const cloneFolders = [...folders];
    const folderToUpdate = folders.find(folder => folder.id === folderId);
    const folderToUpdateIndex = folders.findIndex(folder => folder.id === folderId);
    const newTasks = folderToUpdate?.tasks.filter(task => task.id !== id);
    if(folderToUpdate && newTasks) {
      folderToUpdate.tasks = newTasks
      cloneFolders.splice(folderToUpdateIndex, 1, folderToUpdate);
      toast.success("Tarefa deletada com sucesso")

      setFolders(cloneFolders)
    } else {
      toast.error("Ocorreu um erro ao remover sua tarefa")
    }

  }

  return (
    <>
      <section className="task-list container" onContextMenu={handleOpenDropdown}>
        <header>
          <h2>Minhas tasks</h2>
          <div className="button-group" >
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
              Nova tarefa
            </button>
          </div>
        </header>

        <main>
          <ul>
            {folders.map(folder => (
              <li key={folder.id}>
                <div className='folder-container'>
                  <div onClick={() => handleOpenFolder(folder)} className="folder">
                    <FiFolder />
                    {folder.title}
                  </div>
                  <button type="button" onClick={() => handleRemoveFolder(folder.id)}>
                    <FiTrash size={16}/>
                  </button>
                </div>
                <ul>
                {folder.isOpen && folder.tasks.map(task => (
                  <li key={task.id} className="todo">
                    <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                      <label className="checkbox-container">
                        <input 
                          type="checkbox"
                          readOnly
                          checked={task.isComplete}
                          onClick={() => handleToggleTaskCompletion(task.id, folder.id)}
                        />
                        <span className="checkmark"></span>
                      </label>
                      <p>{task.title}</p>
                    </div>
  
                  <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id, folder.id)}>
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
      {isDropdownOpen && <Dropdown onClickDropdownItem={onClickDropdownItem} onClose={() => setIsDropdownOpen(false)} left={mousePositions.left} top={mousePositions.top} /> }
      {isModalOpen && <Modal folders={folders} addFolder={handleCreateNewFolder} addTask={handleCreateNewTask} type={modalType} onClose={() => setIsModalOpen(false)}/> }
    </>
  )
}