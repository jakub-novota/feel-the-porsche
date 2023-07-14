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

// File filter function to only allow image files
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only image files are allowed.'));
    }
};

const upload = multer({ storage, fileFilter });

// Enable CORS
app.use(cors());

// Set up static file serving
app.use('/photos', express.static(path.join(__dirname, 'uploads')));

// Create a write stream for the log file
const logStream = fs.createWriteStream('logs.txt', { flags: 'a' });

// Log middleware function
const logRequest = (req, res, next) => {
    const { method, originalUrl } = req;
    const timestamp = new Date().toISOString();
    const logEntry = `${timestamp} - ${method} ${originalUrl}`;
    logStream.write(logEntry + '\n');
    next();
};

// Register the log middleware
app.use(logRequest);

app.post('/photos/upload', upload.single('photo'), (req, res) => {
    if (!req.file) {
        res.status(400).json({ success: false, message: 'No photo provided.' });
        return;
    }

    // Access the uploaded file using req.file
    // Process and save the file as needed
    const fileName = req.file.filename;

    // Log the request with the filename
    const { method, originalUrl } = req;
    const timestamp = new Date().toISOString();
    const logEntry = `${timestamp} - ${method} ${originalUrl}/${fileName}`;
    logStream.write(logEntry + '\n');

    res.status(200).json({
        success: true,
        message: 'Photo uploaded successfully.',
        fileName,
    });
});


app.get('/photos/:filename', (req, res) => {
    const filename = req.params.filename;
    // Read the photo file from storage and send it as the response
    const filePath = path.join(__dirname, 'uploads', filename);

    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            res.status(404).json({ success: false, message: 'Image not found.' });
            return;
        }

        res.sendFile(filePath);
    });
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

app.delete('/photos/:filename', (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(__dirname, 'uploads', filename);

    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            res.status(404).json({ success: false, message: 'Image not found.' });
            return;
        }

        fs.unlink(filePath, (err) => {
            if (err) {
                console.error('Error deleting image:', err);
                res.status(500).json({ success: false, message: 'Failed to delete image.' });
                return;
            }

            res.status(200).json({ success: true, message: 'Image deleted successfully.' });
        });
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
