import { getByRole, render,screen } from "@testing-library/react"
import AddCode from "./AddCode"
import { addCodeStore } from "../mobx/mobx-addcode";
import CodesList from "./CodesList";
import { BrowserRouter } from "react-router-dom";


//test for input field
describe('AddCode', () => {
    test("renders correctly", ()=>{
        render(<AddCode onAddCode={CodesList.onAddCode}/>,{wrapper:BrowserRouter});


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

