import { observable, action, makeObservable } from 'mobx';
import { generateCode } from '../components/constants/GenerateCode';
import { appStore } from './mobx-store';

export class AddCodeStore {
  formData = {
    codeName: '',
    icon: '',
    timer: 60
  };

  constructor() {
    makeObservable(this, {
      formData: observable,
      setFormData: action,
      onChangeInput: action,
      addCode: action,
    });
  }

  setFormData(key, value) {
    this.formData[key] = value;
  }

  onChangeInput(e) {
    this.setFormData(e.target.name, e.target.value);
  }

  addCode(onAddCode, navigate) {
    const newCode = {
      id: appStore.codes.length + 1,
      ...this.formData,
      code: generateCode(),
      timer: parseInt(this.formData.timer, 10)
    };
    const updatedCodes = [...appStore.codes, newCode];
    appStore.setCodes(updatedCodes);
    this.setFormData('codeName', '');
    this.setFormData('icon', '');
    this.setFormData('timer', 60);
    onAddCode(newCode);
    navigate('/');
  }

}

export const addCodeStore = new AddCodeStore();
