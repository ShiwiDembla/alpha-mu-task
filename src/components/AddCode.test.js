import { getByRole, render,screen } from "@testing-library/react"
import AddCode from "./AddCode"
import { addCodeStore } from "../mobx/mobx-addcode";
import CodesList from "./CodesList";


//test for input field
describe('AddCode', () => {
    test("renders correctly", ()=>{
        render(<AddCode onAddCode={CodesList.onAddCode}/>);

        
        const nameInput = screen.getByLabelText(/codeName/i)
        expect(nameInput).toBeInTheDocument();


        const iconInput = screen.getByLabelText(/icon/i)
        expect(iconInput).toBeInTheDocument();

        // If I had used label: htmlFor = > aria label
        // const iconInput = screen.getByLabelText('textbox', {
        //     name: "icon"
        // })
        // expect(iconInput).toBeInTheDocument();
    
        const button = screen.getByRole('button')
        expect(button).toBeInTheDocument()
    })
    
})

