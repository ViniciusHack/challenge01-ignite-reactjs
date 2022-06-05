import { fireEvent, screen } from "@testing-library/dom";
import { render } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import { TaskList } from "../../components/TaskList";

describe("TaskList component", () => {
  it("should be able to open the dropdown", async() => {
    render(<TaskList />)
    const ableAreaToOpen = screen.getByText("Minhas tasks");

    fireEvent.contextMenu(ableAreaToOpen)

    expect(screen.getAllByText("Nova pasta").length).toBe(2);
  })

  it("should be able to close the dropdown", async() => {
    render(<TaskList />)
    const areaToOpen = screen.getByText("Nova tarefa");
    const areaToClose = screen.getByText("Minhas tasks");

    fireEvent.contextMenu(areaToOpen);
    await userEvent.click(areaToClose);

    expect(screen.getAllByText("Nova pasta").length).toBe(1);
  })

  it("should be able to open the folder modal", async() => {
    render(<TaskList />)
    const createFolderButton = screen.getByText("Nova pasta");

    await userEvent.click(createFolderButton);

    expect(screen.getByText("Criação de pasta")).toBeInTheDocument();
  })

  it("should be able to open the task modal", async () => {
    render(<TaskList />)
    const createTaskButton = screen.getByText("Nova tarefa");

    await userEvent.click(createTaskButton);

    expect(screen.getByText("Criação de tarefa")).toBeInTheDocument();
  })

  it("should be able to close the modal", async () => {
    render(<TaskList />);
    const createFolderButton = screen.getByText("Nova pasta");

    // fireEvent.doubleClick(createFolderButton)

    userEvent.click(createFolderButton);  // open modal
    userEvent.click(createFolderButton);  // close modal
  
    expect(screen.queryByText("Criação de pasta")).not.toBeInTheDocument();
  })

  // Integration tests 

  it("should be able to create a new task in the root", async () => {
    // Isso está certo???
    render(<TaskList />);

    const addTaskButton = screen.getByText("Nova tarefa");
    
    await userEvent.click(addTaskButton);
    
    const nameInput = screen.getByLabelText("Nome");
    const submitButton = screen.getByText("Criar");

    await userEvent.type(nameInput, "Teste tarefa");
    await userEvent.click(submitButton);

    expect(screen.getByText("Teste tarefa")).toBeInTheDocument();
    // Que outros expects eu poderia fazer?
  })
})