const express = require('express');
const QRCode = require('qrcode');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

app.post('/api/qr/generate', async (req, res) => {
  try {
    const { data } = req.body;
    const qr = await QRCode.toDataURL(data);
    res.json({ image: qr });
  } catch (err) {
    res.status(500).json({ error: 'Failed to generate QR code' });
  }
});

app.listen(3000, () => console.log('✅ Node.js backend running on port 3000'));
