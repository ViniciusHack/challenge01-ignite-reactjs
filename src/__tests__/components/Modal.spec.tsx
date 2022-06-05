import { screen } from '@testing-library/dom';
import { render } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
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
  });

  it("should receive the right data", async () => {
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

    await userEvent.type(nameInput, "Pasta teste")

    await userEvent.click(addButton);

    expect(nameReceived).toBe("Pasta teste");

    expect(nameInput).not.toBeInTheDocument();
  });
})