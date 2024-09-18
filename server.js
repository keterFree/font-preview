const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const fontsDir = path.join(__dirname, 'fonts');

// Serve the current directory for static files (including index.html, CSS, JS)
app.use(express.static(__dirname));

// Serve the assets/fonts directory for font files
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// API to get the list of .ttf and .otf fonts
app.get('/api/fonts', (req, res) => {
    fs.readdir(fontsDir, (err, files) => {
        if (err) {
            return res.status(500).send('Error reading font directory');
        }
        // Filter for .ttf and .otf files
        const fontFiles = files.filter(file => file.endsWith('.ttf') || file.endsWith('.otf'));
        res.json(fontFiles);
    });
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
