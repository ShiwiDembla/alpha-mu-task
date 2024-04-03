import React from 'react';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react';
import { addCodeStore } from '../mobx/mobx-addcode';
import './AddCode.css';

const AddCode = observer(({ onAddCode }) => {
  
  const { formData } = addCodeStore;

  const onChangeInput = (e) => {
    addCodeStore.onChangeInput(e);
  };
  const navigate = useNavigate();
  const addCode = (e) => {
    e.preventDefault();
    addCodeStore.addCode(onAddCode, navigate);
  };

  return (
    <div data-testid="add-code">
      <div>
      <form onSubmit={addCode}>
        <input
          type="text"
          name='codeName'
          aria-label='codeName'
          required
          value={formData.codeName}
          onChange={onChangeInput}
          placeholder="Name of the app"
        />
        <input
          type="text"
          name='icon'
          aria-label='icon'
          required
          value={formData.icon}
          onChange={onChangeInput}
          placeholder="Icon URL"
        />
        <button type="submit"
        data-testid = "submit"
          disabled={formData.codeName.trim()
            && formData.icon.trim()
            ? false : true}
        >Add</button>
      </form>
    </div>

    </div>
  );
});

export default AddCode;