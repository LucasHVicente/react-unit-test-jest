import { render, waitFor, waitForElementToBeRemoved } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import List from '.';


describe('List Component', ()=>{
    it('should render list items', ()=>{
        const { getByText,rerender, unmount ,queryByText } = render(<List initialItems={['name1', 'name2']}/>)

        expect(getByText('name1')).toBeInTheDocument()
        expect(getByText('name2')).toBeInTheDocument()

        unmount()
        rerender(<List initialItems={['name3', 'name4']}/>)

        expect(getByText('name3')).toBeInTheDocument()
        expect(queryByText('name2')).not.toBeInTheDocument()
    });

    it('should be able to add new item to list', async ()=>{
        const {
            getByText,
            getByTestId
        } = render(<List initialItems={[]}/>)
        
        const inputElement = getByTestId('input-element')
        const addButton = getByTestId('add-button')

        userEvent.type(inputElement, 'New')
        userEvent.click(addButton)
        
        await waitFor(async () => {
            expect(getByText('New')).toBeInTheDocument()
        })
    })

    it('should be able to remove item form list', async ()=>{
        const { getAllByTestId, getByText, queryByText} = render(<List initialItems={['name1', 'name2']}/>)

        const removeButtons = getAllByTestId('remove-button');

        userEvent.click(removeButtons[0]);

        await waitForElementToBeRemoved(()=> getByText('name1'))

        //alternative 

        userEvent.click(removeButtons[1]);

        await waitFor(()=>{
            expect(queryByText('name2')).not.toBeInTheDocument()
        })
    })
})