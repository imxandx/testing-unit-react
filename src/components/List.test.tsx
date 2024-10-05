import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import List from "./List"

describe("List Component", () => {
    it("should render list items", () => {
        render(<List  initialItems={["Alexandre", "Guilherme", "Gabriel"]}/>)

        expect(screen.getByText("Alexandre")).toBeInTheDocument()
        expect(screen.getByText("Guilherme")).toBeInTheDocument()
        expect(screen.getByText("Gabriel")).toBeInTheDocument()
    })

    it("should be able to add new item to the list", async () => {
        render(<List initialItems={[]}/>)

        const inputElement = screen.getByPlaceholderText("Novo item")
        const addButton = screen.getByText("Adicionar")
        
        fireEvent.change(inputElement, { target: { value: "Novo" } })
        fireEvent.click(addButton)


        await waitFor(async () => {
            expect(screen.getByText("Novo")).toBeInTheDocument()
        })
    })

    it("should be able to remove item from the list", async () => {
        render(<List initialItems={["Alexandre"]} />)
        const removeButtons = screen.getAllByText("Remover")

        fireEvent.click(removeButtons[0])

        await waitFor(() => {
            expect(screen.queryByText("Alexandre")).not.toBeInTheDocument()
        })
    })
})