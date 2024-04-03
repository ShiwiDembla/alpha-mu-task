
import React from 'react';
import { render, screen, waitFor, within, act, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { AppStore, appStore } from '../mobx/mobx-store';
import CodesList from './CodesList';
import App from '../App';

const RenderWithRouter = (ui) => {
  return render(ui, { wrapper: BrowserRouter });
};

describe('CodesList component', () => {
  test('renders without crashing', () => {
    RenderWithRouter(<CodesList />);
  });

  test('renders add button', () => {
    RenderWithRouter(<CodesList />);

    const heading = screen.getByRole("heading")
    expect(heading).toBeInTheDocument()

    const addButton = screen.getByTestId('add');
    expect(addButton).toBeInTheDocument();
  });

  test('clicking add button navigates to /add route', async () => {
    const navigateMock = jest.fn();
    render(<App />);
    const addButton = screen.getByTestId('add');
    userEvent.click(addButton);
    // expect(navigateMock).toHaveBeenCalled(); 
  });

  test('renders no codes found message when no codes are present in the store', async () => {
    RenderWithRouter(<CodesList />);
    const noCodesMessage = screen.getByTestId(/empty/i);
    expect(noCodesMessage).toBeInTheDocument();
  });

  test('renders codes list correctly when codes are added to the store', async () => {
    const mockCodes = [
      { id: 1, codeName: 'Test App 1', icon: 'https://image1.com', code: '123456', timer: 60 },
    ];
    appStore.setCodes(mockCodes);

    RenderWithRouter(<CodesList />);

    const list = screen.getByRole('list');
    expect(list).toBeInTheDocument();

    console.log(appStore.codes)

    await waitFor(() => {
      const listItems = screen.getAllByTestId('listitem');
      expect(listItems.length).toBe(1);
    });

    const codeNames = screen.getAllByTestId('name');
    const icon = screen.getAllByTestId('icon');
    const codeTexts = screen.getAllByTestId('code');
    const timers = screen.getAllByTestId('timer');
    expect(codeNames[0]).toHaveTextContent(/Test App 1/i);
    expect(icon[0]).toBeVisible();
    expect(codeTexts[0].textContent).toEqual('123 456');

    expect(codeTexts[0]).toBeVisible();
    expect(timers[0]).toHaveTextContent('60');

    const progressBar = screen.getByTestId('progress-bar');
    const svg = within(progressBar).getByTestId('progress-svg');
    expect(svg).toBeInTheDocument();
    const backgroundCircle = within(svg).getByLabelText('bg-circle');
    const foregroundCircle = within(svg).getByLabelText('fg-circle');
    expect(backgroundCircle).toBeInTheDocument();
    expect(foregroundCircle).toBeInTheDocument();

  });


  test('timer updates correctly', async () => {

    const mockCodes = [
      { id: 1, codeName: 'Test App 1', icon: 'https://image1.com', code: '123456', timer: 30 },
      { id: 2, codeName: 'Test App 2', icon: 'https://image2.com', code: '654321', timer: 0 },
      { id: 3, codeName: 'Test App 3', icon: 'https://image3.com', code: '789012', timer: 60 },
    ];

    appStore.setCodes(mockCodes);

     RenderWithRouter(<CodesList />);

    const timerElements = screen.getAllByTestId('timer');

    expect(timerElements[0]).toHaveTextContent('30');
    expect(timerElements[1]).toHaveTextContent('0');
    expect(timerElements[2]).toHaveTextContent('60');

    await act(async () => {
      jest.advanceTimersByTime(1000);
    });

    expect(timerElements[0]).toHaveTextContent('29');
    expect(timerElements[1]).toHaveTextContent('0');
    expect(timerElements[2]).toHaveTextContent('59');

    await act(async () => {
      jest.advanceTimersByTime(30000);
    });

    expect(timerElements[0]).toHaveTextContent('0');
    expect(timerElements[1]).toHaveTextContent('0');
    expect(timerElements[2]).toHaveTextContent('29');

    await act(async () => {
      jest.advanceTimersByTime(30000);
    });

    expect(timerElements[0]).toHaveTextContent('30');
    expect(timerElements[1]).toHaveTextContent('0');
    expect(timerElements[2]).not.toHaveTextContent('90');
  });


  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
  });


});