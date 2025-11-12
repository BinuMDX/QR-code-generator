// index.js
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const qrController = require('./controllers/qr.controller');

const app = express();
app.use(express.json());
app.use(cors());

const upload = multer({ dest: 'uploads/' });

app.post('/api/qr/generate', upload.single('logo'), (req, res) => qrController.generate(req, res));

app.listen(3000, () => console.log('✅ Node.js backend running on port 3000'));
