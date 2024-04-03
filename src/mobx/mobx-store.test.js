import { AppStore } from './mobx-store';

describe('AppStore', () => {
  let store;

  beforeEach(() => {
    store = new AppStore();
  });

  test('setCodes should replace codes with newCodes', () => {
    const newCodes = [{ id: 1, code: 'ABC123' }, { id: 2, code: 'XYZ456' }];

    store.setCodes(newCodes);

    expect(store.codes).toEqual(newCodes);
  });

  test('generateNewCode should decrement timer and generate new code if timer reaches 0', () => {
    const initialCodes = [
      { id: 1, code: 'ABC123', timer: 10 },
      { id: 2, code: 'XYZ456', timer: 0 }
    ];
    const expectedCodes = [
      { id: 1, code: 'ABC123', timer: 9 },
      { id: 2, code: expect.any(String), timer: 60 }
    ];

    store.setCodes(initialCodes);
    store.generateNewCode();

    expect(store.codes).toEqual(expectedCodes);
  });

  test('generateNewCode should not decrement timer if timer is already 0', () => {
    const initialCodes = [{ id: 1, code: 'ABC123', timer: 0 }];
    const expectedCodes = [{ id: 1, code: expect.any(String), timer: 60 }];

    store.setCodes(initialCodes);
    store.generateNewCode();

    expect(store.codes).toEqual(expectedCodes);
  });
});
