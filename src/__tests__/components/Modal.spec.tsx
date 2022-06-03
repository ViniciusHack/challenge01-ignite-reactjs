import { fireEvent, screen } from '@testing-library/dom';
import { render } from "@testing-library/react";
import { Modal } from "../../components/Modal";


describe("Modal component", () => {
  it("should renders correctly", () => {
    render(
    <Modal 
      addFolder={() => {}}
      addTask={() => {}}
      folders={[]}
      onClose={() => {}}
      type="folder"
    />);

    expect(screen.getByText("Criação de pasta")).toBeInTheDocument();
  })

  it("should be able to create a new folder", async () => {
    let nameReceived = '';

    const { unmount } = render(
    <Modal 
      addFolder={(name: string) => {
        nameReceived = name
      }}
      addTask={() => {}}
      folders={[]}
      onClose={() => unmount()}
      type="folder"
    />);

    const nameInput = screen.getByLabelText("Nome");
    const addButton = screen.getByText("Criar");

    fireEvent.change(nameInput, {
      target: {
        value: "Pasta teste"
      }
    });

    fireEvent.click(addButton);

    expect(nameReceived).toBe("Pasta teste");

    expect(nameInput).not.toBeInTheDocument();
  })
})