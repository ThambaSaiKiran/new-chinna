const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const atob = require('atob');
const mime = require('mime-types');

const app = express();
app.use(cors({
    origin: 'http://localhost:3001'
}));
app.use(bodyParser.json({ limit: '10mb' })); // Limit for large file sizes

// POST endpoint for /bfhl
app.post('/bfhl', (req, res) => {
    const { data, file_b64 } = req.body;
    const user_id = "john_doe_17091999";  // Replace with dynamic value if needed
    const email = "john@xyz.com";         // Example email
    const roll_number = "ABCD123";        // Example roll number

    const numbers = data.filter(item => !isNaN(item));
    const alphabets = data.filter(item => isNaN(item));

    const lowercaseAlphabets = alphabets.filter(item => item === item.toLowerCase());
    const highestLowercaseAlphabet = lowercaseAlphabets.length > 0 ? [lowercaseAlphabets.sort().reverse()[0]] : [];

    // File handling
    let fileValid = false;
    let fileMimeType = '';
    let fileSizeKB = 0;

    if (file_b64) {
        try {
            const fileBuffer = Buffer.from(file_b64, 'base64');
            fileMimeType = mime.lookup(fileBuffer) || 'unknown';
            fileSizeKB = (fileBuffer.length / 1024).toFixed(2);
            fileValid = true;
        } catch (err) {
            fileValid = false;
        }
    }

    res.status(200).json({
        is_success: true,
        user_id: user_id,
        email: email,
        roll_number: roll_number,
        numbers: numbers,
        alphabets: alphabets,
        highest_lowercase_alphabet: highestLowercaseAlphabet,
        file_valid: fileValid,
        file_mime_type: fileMimeType,
        file_size_kb: fileSizeKB
    });
});

// GET endpoint for /bfhl
app.get('/bfhl', (req, res) => {
    res.status(200).json({
        operation_code: 1
    });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

