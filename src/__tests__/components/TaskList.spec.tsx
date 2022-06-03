import { fireEvent, screen } from "@testing-library/dom";
import { render } from "@testing-library/react";
import { TaskList } from "../../components/TaskList";


describe("TaskList component", () => {
  it("should be able to open the dropdown", () => {
    render(<TaskList />)
    const ableAreaToOpen = screen.getByText("Minhas tasks");

    fireEvent.contextMenu(ableAreaToOpen)

    expect(screen.getAllByText("Nova pasta").length).toBe(2);
  })

  it("should be able to close the dropdown", () => {
    render(<TaskList />)
    const areaToOpen = screen.getByText("Nova tarefa");
    const areaToClose = screen.getByText("Minhas tasks");

    fireEvent.contextMenu(areaToOpen);
    setTimeout(() => {
      fireEvent.click(areaToClose)
      expect(screen.getAllByText("Nova pasta").length).toBe(1)
    }, 2000)
  })

  it("should be able to open the folder modal", () => {
    render(<TaskList />)
    const createFolderButton = screen.getByText("Nova pasta");

    fireEvent.click(createFolderButton);

    expect(screen.getByText("Criação de pasta")).toBeInTheDocument();
  })

  it("should be able to open the task modal", () => {
    render(<TaskList />)
    const createTaskButton = screen.getByText("Nova tarefa");

    fireEvent.click(createTaskButton);

    expect(screen.getByText("Criação de tarefa")).toBeInTheDocument();
  })

  it("should be able to close the modal", () => {
    render(<TaskList />);
    const createFolderButton = screen.getByText("Nova pasta");
    const areaToClose = screen.getByText("Minhas tasks");

    fireEvent.click(createFolderButton);
    setTimeout(() => {
      fireEvent.click(areaToClose);

      expect(screen.getByText("Criação de pasta")).not.toBeInTheDocument();
    }, 2000)
    
  })
})