import { render, screen } from '@testing-library/react';
import App from './App';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CodesList from './components/CodesList'
import AddCode from './components/AddCode';
import { appStore } from './mobx/mobx-store';

test('renders app', () => {
  render(<App />);
});



// Mocked components
// jest.mock('./components/CodesList', () => () => <div data-testid="code-list">Codes List</div>);
// jest.mock('./components/AddCode', () => () => <div data-testid="add-code">Add Code</div>);

describe('App', () => {
  test('renders CodesList component at / path', () => {
    render(
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CodesList />} />
        </Routes>
      </BrowserRouter>
    );

    expect(screen.getByTestId('codes-list')).toBeInTheDocument();
  });
  // test('renders AddCode component at /add path', () => {
  //   render(
  //     <BrowserRouter>
  //       <Routes>
  //         <Route path="/add" element={<AddCode onAddCode={AddCode}/>} />
  //       </Routes>
  //     </BrowserRouter>
  //   );

  //   expect(screen.getByTestId('add-code')).toBeInTheDocument();
  // });
  
});
