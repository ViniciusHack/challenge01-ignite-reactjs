import { screen } from '@testing-library/dom';
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Dropdown } from "../../components/Dropdown";
import { Modal } from "../../components/Modal";

describe("Dropdown component", () => {
  it("should be able to open the task modal through the dropdown", async () => {

    render(<Dropdown left="5px" top="5px" onClose={() => {}} onClickDropdownItem={() => 
      render(
        <Modal onClose={() => {}} type="task" addFolder={() => {}} folders={[]} addTask={() => {}}/>
        )} />);

    const addTask = screen.getByText("Nova tarefa");

    await userEvent.click(addTask);

    expect(screen.getByText("Criação de tarefa")).toBeInTheDocument();
  })

  it("should be able to open the folder modal through the dropdown", async () => {
    render(<Dropdown left="5px" top="5px" onClose={() => {}} onClickDropdownItem={() => 
      render(
        <Modal 
          onClose={() => {}} 
          type="folder" 
          addFolder={() => {}} 
          folders={[]} 
          addTask={() => {}}
        />
        )} />);

    const addFolder = screen.getByText("Nova pasta");

    await userEvent.click(addFolder);

    expect(screen.getByText("Criação de pasta")).toBeInTheDocument();
  })
  
})