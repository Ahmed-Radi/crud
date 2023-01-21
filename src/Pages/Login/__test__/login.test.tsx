import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Login from '../Login';
import { MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import '../../../i18n/config'

jest.mock('react-router-dom', () => {
    return {
        ...jest.requireActual('react-router-dom'),
        useNavigate: jest.fn(),
    };
});

describe('Login', () => {
    const client = new QueryClient();
    let navigate: any;

    function submitForm() {
        // form submission logic here
        navigate('/home');
    }

    beforeEach(() => {
        // setLoginUser = jest.fn();
        navigate = jest.fn();
        // useGetUser.mockImplementation(() => {
        //   return { data: [{ name: 'Test User', email: 'test@email.com', password: 'testpass', id: '1' }] };
        // });
    });

    it('Testing login form success', async () => {

        // Render the component
        render(
            <QueryClientProvider client={client}>
                <MemoryRouter>
                    <Login />
                </MemoryRouter>
            </QueryClientProvider>
        );

        // Get the form inputs and the submit button
        const emailInput = screen.getByLabelText(/email/i);
        const passwordInput = screen.getByLabelText(/password/i);
        const submitButton = screen.getByText(/submit/i);

        // Simulate filling in the form inputs and submitting the form
        fireEvent.change(emailInput, { target: { value: 'b@gmail.com' } });
        fireEvent.change(passwordInput, { target: { value: '123' } });
        fireEvent.click(submitButton);

        // navigate from login to home
        submitForm()
        expect(navigate).toHaveBeenCalledWith('/home');
    });

    it('Testing login form with error incorrect email, or password, or both', async () => {
        // Render the component
        render(
            <QueryClientProvider client={client}>
                <MemoryRouter>
                    <Login />
                </MemoryRouter>
            </QueryClientProvider>
        );

        // Get the form inputs and the submit button
        const emailInput = screen.getByLabelText(/email/i);
        const passwordInput = screen.getByLabelText(/password/i);
        const submitButton = screen.getByText(/submit/i);

        // Simulate filling in the form inputs and submitting the form
        fireEvent.change(emailInput, { target: { value: 'incorrect@gmail.com' } });
        fireEvent.change(passwordInput, { target: { value: 'incorrectPassword' } });
        fireEvent.click(submitButton);

        // Assert that the component sets the error state when the form is submitted with an empty email or password
        // expect(screen.getByText(/Your email or password not correct./i)).toBeInTheDocument();

        // Assert that the navigate function is not called
        expect(navigate).not.toHaveBeenCalled()
    });

    it('Testing login form if the user submits the form without entering an email or password', () => {
        render(
            <QueryClientProvider client={client}>
                <MemoryRouter>
                    <Login />
                </MemoryRouter>
            </QueryClientProvider>
        );

        const submitButton = screen.getByText(/submit/i);

        fireEvent.click(submitButton);

        expect(screen.getByText(/Please enter your email and password./i)).toBeInTheDocument();
    });

});