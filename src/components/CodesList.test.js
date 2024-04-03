import { render, screen } from "@testing-library/react"
import CodesList from "./CodesList"


describe('CodesList', () => {
    test("component renders correctly", ()=>{
        render(<CodesList/>)
        const text = screen.getByText(/2FA Codes/i)
        expect(text).toBeInTheDocument()

        const button = screen.getByRole("button")
        expect(button).toBeInTheDocument()
    })
})

