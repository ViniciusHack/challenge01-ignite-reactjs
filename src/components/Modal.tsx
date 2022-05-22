import { useCallback, useEffect, useRef } from "react";
import '../styles/modal.scss';


interface ModalProps {
  onClose: () => void;
}

export const Modal: React.FC<ModalProps> = ({ onClose }) => {

  const modalRef = useRef<HTMLDivElement>(null);

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
        <h1>Criação de tarefa</h1>
        <div className="input-container">
          <label htmlFor="name">Nome</label>
          <input id="name" />
        </div>
        <div className="input-container">
          <label htmlFor="folder_to">Pasta</label>
          <select id="folder_to">
            <option value="teste" >Teste</option>
            <option value="teste" >Teste</option>
          </select>
        </div>
          <button type="submit">Criar</button>
      </div>
    </div>
  );
}