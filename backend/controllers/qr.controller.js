// controllers/qr.controller.js
const QRCode = require('qrcode');
const PythonQRService = require('../services/python-qr.service');

const pythonService = new PythonQRService('http://127.0.0.1:5000');

class QRController {
  async generate(req, res) {
    try {
      const { data, usePython, options } = req.body;
      const file = req.file;

      // If usePython flag is true → send request to Flask service
      if (usePython === 'true' || usePython === true) {
        const opts = JSON.parse(options || '{}');
        const result = await pythonService.generate(data, opts, file);
        return res.json({ image: result.image });
      }

      // Otherwise, generate locally with Node.js
      const qr = await QRCode.toDataURL(data);
      res.json({ image: qr });

    } catch (err) {
      console.error('❌ Error generating QR:', err);
      res.status(500).json({ error: 'Failed to generate QR code' });
    }
  }
}

module.exports = new QRController();
