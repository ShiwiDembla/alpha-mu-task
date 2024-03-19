// mobx-store.js
import { observable, makeObservable, action } from 'mobx';
import { generateCode } from '../components/constants/GenerateCode';

export class AppStore {
  codes = observable([]);

  constructor() {
    makeObservable(this, {
      codes: observable,
      setCodes: action,
      generateNewCode: action
    });
  }

  setCodes(newCodes) {
    this.codes.replace(newCodes); 
  }

  generateNewCode() {
    this.codes = this.codes.map(code => {
      if (code.timer > 0) {
        return { ...code, timer: code.timer - 1 };
      } else {
        return { ...code, code: generateCode(), timer: 60 }; 
      }
    });
  }
}

export const appStore = new AppStore();
