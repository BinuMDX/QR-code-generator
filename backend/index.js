const express = require("express");
const axios = require('axios'); 
const QRCode = require("qrcode");
const cors = require("cors");
const multer = require('multer');
const fs = require('fs');

const app = express();
app.use(express.json());
app.use(cors());

const upload = multer({ dest: 'uploads/' })

app.post("/api/qr/generate" , upload.single('logo'), async (req, res) => {

  try {
    const { data, usePython, options } = req.body;
    const file = req.file;

      if (usePython) {
      const pythonPayload = { data, options: JSON.parse(options || '{}') };

      // If there’s a file, send it as multipart/form-data to Python
      const FormData = require('form-data');
      const formData = new FormData();
      formData.append('data', data);
      formData.append('options', JSON.stringify(pythonPayload.options));
      if (file) {
        formData.append('logo', fs.createReadStream(file.path));
      }

      const response = await axios.post('http://127.0.0.1:5000/generate-qr', formData, {
        headers: formData.getHeaders(),
      });

      // Cleanup temporary file
      if (file) fs.unlinkSync(file.path);

      return res.json({ image: response.data.image });
    }

    // Basic Node.js QR generation
    const qr = await QRCode.toDataURL(data);
    res.json({ image: qr });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to generate QR code' });
  }
});

app.listen(3000, () => console.log("✅ Node.js backend running on port 3000"));
