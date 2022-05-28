import { screen } from '@testing-library/dom';
import { render } from "@testing-library/react";
import { Header } from "../../components/Header";


describe("Header component", () => {
  it('should renders correctly', () => {
    render(
      <Header />
    )
  
    expect(screen.getByAltText("to.do")).toBeInTheDocument();
  }) 
})