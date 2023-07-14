const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const fs = require('fs');

const app = express();
const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});
const upload = multer({ storage });

// Enable CORS
app.use(cors());

// Set up static file serving
app.use('/photos', express.static(path.join(__dirname, 'uploads')));

app.post('/photos/upload', upload.single('photo'), (req, res) => {
    if (!req.file) {
        res.status(400).json({ success: false, message: 'No photo provided.' });
        return;
    }

    // Access the uploaded file using req.file
    // Process and save the file as needed
    const fileName = req.file.filename;

    res.status(200).json({
        success: true,
        message: 'Photo uploaded successfully.',
        fileName,
    });
});

app.get('/photos/:filename', (req, res) => {
    const filename = req.params.filename;
    // Read the photo file from storage and send it as the response
    res.sendFile(path.join(__dirname, 'uploads', filename));
});

app.get('/photos', (req, res) => {
    fs.readdir('uploads', (err, files) => {
        if (err) {
            console.error('Error reading directory:', err);
            res.status(500).json({ success: false, message: 'Failed to retrieve photos.' });
            return;
        }
        res.status(200).json({ success: true, photos: files });
    });
});

// Hello, World! route
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

const port = 3001;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
