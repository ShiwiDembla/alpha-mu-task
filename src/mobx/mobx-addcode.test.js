import { AddCodeStore } from './mobx-addcode';
import { appStore } from './mobx-store';

describe('AddCodeStore', () => {
  let store;

  beforeEach(() => {
    store = new AddCodeStore();
  });

  test('setFormData should update form data correctly', () => {
    const key = 'codeName';
    const value = 'TestCode';

    store.setFormData(key, value);

    expect(store.formData[key]).toEqual(value);
  });

  test('onChangeInput should update formData based on event', () => {
    const key = 'codeName';
    const value = 'TestCode';
    const event = {
      target: {
        name: key,
        value: value
      }
    };

    store.onChangeInput(event);

    expect(store.formData[key]).toEqual(value);
  });

  test('addCode should add a new code correctly', () => {
    const onAddCodeMock = jest.fn();
    const navigateMock = jest.fn();
    const codeName = 'TestCode';
    const icon = 'testIcon';
    const timer = '60';
  
    // Mocking appStore's methods and codes
    const setCodesMock = jest.spyOn(appStore, 'setCodes');
    const originalCodes = appStore.codes;
    appStore.codes = [];
  
    // Mocking generateCode function
    const generateCodeMock = jest.fn(() => '123456');
    
    // Testing addCode method
    store.setFormData('codeName', codeName);
    store.setFormData('icon', icon);
    store.setFormData('timer', timer);
    store.addCode(onAddCodeMock, navigateMock);
  
    // Expectations
    expect(setCodesMock).toHaveBeenCalledWith([
      {
        id: 1,
        codeName: codeName,
        icon: icon,
        timer: 60,
        code: expect.stringMatching(/^\d{6}$/)
      }
    ]);
    expect(onAddCodeMock).toHaveBeenCalledWith({
      id: 1,
      codeName: codeName,
      icon: icon,
      timer: 60,
      code: expect.stringMatching(/^\d{6}$/)
    //   code: expect.any(String),
    });
    expect(navigateMock).toHaveBeenCalledWith('/');
    expect(store.formData.codeName).toEqual('');
    expect(store.formData.icon).toEqual('');
    expect(store.formData.timer).toEqual(60);
  
    // back to original values
    // appStore.codes = originalCodes;
    // setCodesMock.mockRestore();
  });
  
});
