import LogoTodo from '../assets/logo.svg';
import '../styles/header.scss';


export function Header() {
  return (
    <header className="header">
      <div>
        <img src={LogoTodo} alt="to.do"/>
      </div>
    </header>
  )
}