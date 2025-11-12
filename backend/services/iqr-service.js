// services/iqr-service.js
/**
 * Interface for QR Service
 * Defines the contract for all QR service implementations.
 */
class IQRService {
  async generate(data, options, file) {
    throw new Error('Method not implemented');
  }
}

module.exports = IQRService;