import React, { useState } from 'react';
import axios from 'axios';
import Select from 'react-select';

function App() {
    const [inputData, setInputData] = useState('');
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const [selectedOptions, setSelectedOptions] = useState([]);

    const handleSubmit = async () => {
        try {
            const parsedData = JSON.parse(inputData);  // Validate JSON input
            const res = await axios.post('https://localhost:3001/bfhl', parsedData);
            setResponse(res.data);
            setError(null);
        } catch (err) {
            setError("Invalid JSON or API request failed");
        }
    };

    const handleSelectChange = (options) => {
        setSelectedOptions(options);
    };

    const options = [
        { value: 'alphabets', label: 'Alphabets' },
        { value: 'numbers', label: 'Numbers' },
        { value: 'highest_lowercase_alphabet', label: 'Highest Lowercase Alphabet' }
    ];

    const renderResponse = () => {
        if (!response) return null;

        const selectedKeys = selectedOptions.map(option => option.value);
        const filteredResponse = selectedKeys.reduce((acc, key) => {
            acc[key] = response[key];
            return acc;
        }, {});

        return (
            <div>
                <pre>{JSON.stringify(filteredResponse, null, 2)}</pre>
            </div>
        );
    };

    return (
        <div className="App">
            <h1>BFHL Dev Challenge</h1>
            <textarea
                rows="5"
                cols="50"
                value={inputData}
                onChange={(e) => setInputData(e.target.value)}
                placeholder='Enter JSON here'
            />
            <br />
            <button onClick={handleSubmit}>Submit</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}

            {response && (
                <>
                    <Select
                        isMulti
                        options={options}
                        onChange={handleSelectChange}
                    />
                    {renderResponse()}
                </>
            )}
        </div>
    );
}

export default App;
