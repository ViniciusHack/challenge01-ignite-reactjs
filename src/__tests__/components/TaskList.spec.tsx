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
})