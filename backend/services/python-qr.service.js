// services/python-qr.service.js
const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');
const IQRService = require('./iqr-service');

class PythonQRService extends IQRService {
  constructor(pythonUrl) {
    super();
    this.pythonUrl = pythonUrl;
  }

  async generate(data, options, file) {
    const formData = new FormData();
    formData.append('data', data);
    formData.append('options', JSON.stringify(options));
    if (file) {
      formData.append('logo', fs.createReadStream(file.path));
    }

    const response = await axios.post(`${this.pythonUrl}/generate-qr`, formData, {
      headers: formData.getHeaders(),
    });

    // Cleanup file
    if (file && fs.existsSync(file.path)) {
      fs.unlinkSync(file.path);
    }

    return response.data; // Flask returns { image: base64 }
  }
}

module.exports = PythonQRService;
