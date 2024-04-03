import { getByRole, render,screen } from "@testing-library/react"
import AddCode from "./AddCode"
import { addCodeStore } from "../mobx/mobx-addcode";
import CodesList from "./CodesList";
import { BrowserRouter } from "react-router-dom";


const RenderWithRouter = (ui) => {
    return render(ui, { wrapper: BrowserRouter });
  };

//test for input field
describe('AddCode', () => {
    test("renders correctly", ()=>{
        RenderWithRouter(<AddCode onAddCode={CodesList.onAddCode}/>);
        


        const nameInput = screen.getByLabelText(/codeName/i)
        expect(nameInput).toBeInTheDocument();


        const iconInput = screen.getByLabelText(/icon/i)
        expect(iconInput).toBeInTheDocument();

        const button = screen.getByRole('button')
        expect(button).toBeInTheDocument()

        //check if the button is disabled
        expect(button).toBeDisabled()
    })
    
})

