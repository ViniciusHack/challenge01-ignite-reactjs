import { ToastContainer } from 'react-toastify';
import { injectStyle } from "react-toastify/dist/inject-style";
import { Header } from "./components/Header";
import { TaskList } from './components/TaskList';
import './styles/global.scss';

injectStyle()

export function App() {
  return (
    <>
      <Header />
      <TaskList />
      <ToastContainer />
    </>
  )
}