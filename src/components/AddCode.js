import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddCode = ({onAddData}) => {
    const navigate = useNavigate();
    const [code, setCode] = useState({
        codeName: '',
        icon: '',
        timer: 0,
    });
const addCode = () => {
        // e.preventDefault();
        setCode({
            ...code,
            // get time in seconds  
            timer: new Date().getTime()
        });
        onAddData(code);
        console.log('add code');
        navigate('/');
    }
    const onCodeChange = (e) => {
        e.preventDefault();
        setCode({
            ...code,
            [e.target.name]: e.target.value,
        });
        

    };

    return (
        <div>
            <h1>Add code</h1>
            <form onSubmit={addCode}>
                <input
                    type="text"
                    placeholder="Enter code"
                    name="codeName"
                    value={code.codeName}
                    onChange={onCodeChange}
                />
                <input
                    type="text"
                    placeholder="Enter icon name"
                    name="icon"
                    value={code.icon}
                    onChange={onCodeChange}
                />
                
                <button type="submit">Add</button>
            </form>
        </div>
    );
};

export default AddCode;
