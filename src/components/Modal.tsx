import { useCallback, useEffect, useRef, useState } from "react";
import { FiX } from "react-icons/fi";
import { toast } from "react-toastify";
import '../styles/modal.scss';
import { Folder } from "./TaskList";


interface ModalProps {
  onClose: () => void;
  type: 'task' | 'folder';
  addTask: (name: string, folder: number | null ) => void;
  addFolder: (name: string) => void;
  folders: Folder[];
}

export const Modal: React.FC<ModalProps> = ({ onClose, type, addTask, addFolder, folders }) => {
  const [name, setName] = useState('');
  const [folderSelectedId, setFolderSelectedId] = useState<number | null>(null);
  console.log(folderSelectedId)

  const modalRef = useRef<HTMLDivElement>(null);

  const handleSubmit = () => {
    if(!name) {
      return toast.error(`Informe um nome para sua ${type === "task" ? "tarefa" : "pasta"} antes de criá-la`)
    }

    
    type === "task" 
    ? addTask(name, folderSelectedId)
    : addFolder(name)

    onClose();
  }
  
  const handleCloseModal = useCallback((e: any) => {
    if(!(modalRef?.current?.contains(e.target as Node))) {
      onClose();
    }
  }, [])

  useEffect(() => {
    document.addEventListener("mousedown", handleCloseModal);

    return () => document.removeEventListener("mousedown", handleCloseModal);
  }, [handleCloseModal])

  return (
    <div className="modal-overlay">
      <div className="modal-content" ref={modalRef}>
        <div className="close-button">
          <FiX size={20} onClick={() => onClose()} />
        </div>
        <h1>Criação de {type === 'task' ? "tarefa" : "pasta"}</h1>
        <div className="input-container">
          <label htmlFor="name">Nome</label>
          <input id="name" value={name} onChange={(e) => setName(e.target.value)}/>
        </div>
        {type === "task" && 
        <div className="input-container">
          <label htmlFor="folder_to">Pasta</label>
          <select onChange={(e) => {
            const option = e.target.options[e.target.options.selectedIndex];
            setFolderSelectedId(Number(option.value));
          }} id="folder_to">
            <option>Padrão (raíz)</option>
            {folders.map(folder => (
              <option key={folder.id} value={folder.id}>{folder.title}</option>
            ))}
          </select>
        </div>
        }
          <button type="button" onClick={handleSubmit}>Criar</button>
      </div>
    </div>
  );
}