import { FiCheckSquare, FiFolder } from 'react-icons/fi';
import '../styles/dropdown.scss';

interface DropdownProps {
  top: string;
  left: string;
}

export const Dropdown: React.FC<DropdownProps> = ({top, left}) => {

  return (
    <div className='dropdown' style={{ left, top }}>
      <div>
        <FiFolder />
        Nova pasta
      </div>
      <div>
        <FiCheckSquare />
        Nova tarefa
      </div>
    </div>
  );
}