import { useCallback, useEffect, useRef } from 'react';
import { FiCheckSquare, FiFolder } from 'react-icons/fi';
import '../styles/dropdown.scss';

interface DropdownProps {
  top: string;
  left: string;
  onClose: () => void;
  onClickDropdownItem: (type: "folder" | "task") => void;
}

export const Dropdown: React.FC<DropdownProps> = ({ top, left, onClose, onClickDropdownItem}) => {

  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleCloseDropdown = useCallback((e: any) => {
    if(!(dropdownRef?.current?.contains(e.target as Node))) {
      onClose();
    }
  }, [])

  useEffect(() => {
    document.addEventListener('mousedown', handleCloseDropdown);

    return () => document.removeEventListener('mousedown', handleCloseDropdown);
  }, [])

  return (
    <div className='dropdown' style={{ left, top }} ref={dropdownRef}>
      <div onClick={() => onClickDropdownItem('folder')}>
        <FiFolder />
        Nova pasta
      </div>
      <div onClick={() => onClickDropdownItem("task")}>
        <FiCheckSquare />
        Nova tarefa
      </div>
    </div>
  );
}