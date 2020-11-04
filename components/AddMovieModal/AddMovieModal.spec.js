import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'

const mockStore = configureMockStore([])
const store = mockStore({})

import AddMovieModal from './AddMovieModal'

describe('AddMovieModal', () => {
    const handleClose = jest.fn()
    let wrappedComponent

    beforeEach(() => {
        const props = {
            toggleModalOpen: handleClose,
            isModalOpen: true,
        }

        wrappedComponent = () => {
            return render(
                <Provider store={store}>
                    <AddMovieModal {...props} />
                </Provider>
            )
        }
    })

    it('should render component correctly', () => {
        wrappedComponent()
        const modalTitle = screen.getByText('ADD MOVIE')
        expect(modalTitle).toBeTruthy()
    })

    it('should close when clicking on close button', () => {
        wrappedComponent()
        const closeButton = screen.getByTestId('close-icon')
        fireEvent.click(closeButton)
        expect(handleClose).toHaveBeenCalledTimes(1)
    })

    it('should display errors on form submit with empty values', async () => {
        wrappedComponent()
        const submitButton = screen.getByTestId('submit-add-form')

        await waitFor(() => {
            fireEvent.click(submitButton)
            const result = screen.getAllByText('Required')
            expect(result).toHaveLength(6)
        })
    })
})
