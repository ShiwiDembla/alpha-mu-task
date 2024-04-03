import { render, screen, } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from './App';
import { BrowserRouter, Routes, Route, MemoryRouter } from 'react-router-dom';
import CodesList from './components/CodesList'
import AddCode from './components/AddCode';
import { appStore } from './mobx/mobx-store';
import Demo from './components/Demo';

test('renders app', () => {
  render(<App />);
});
const handleAddCode = jest.fn();

const nameMock = "Hello"
const nameIcon = "hey"
test('clicking the Add button redirects to /add', async () => {

  render(
    <App handleAddCode={handleAddCode} />
  )
  const button = screen.getByTestId("add")
  expect(button).toBeInTheDocument()

  await userEvent.click(button);

  const iconInput = await screen.findByTestId("add-code")
  expect(iconInput).toBeInTheDocument();

  //add code:
  const nameInput = screen.getByLabelText(/codeName/i)
  expect(nameInput).toBeInTheDocument();


  const iconInput2 = screen.getByLabelText(/icon/i)
  expect(iconInput2).toBeInTheDocument();
  userEvent.type(nameInput, 'Text to input');
  userEvent.type(iconInput2, 'Text to input');

  const submit = await screen.findByTestId("submit")
  expect(submit).toBeInTheDocument()

  await userEvent.click(submit);

  // redirected back to /
  const dummy = await screen.findByTestId("add")
  expect(dummy).toBeInTheDocument()


  // const demo = await screen.findByTestId("demo")
  // expect(demo).toBeInTheDocument();

});
