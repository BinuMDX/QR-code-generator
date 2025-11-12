// utils/file-helper.js
const fs = require('fs');

exports.deleteFile = (path) => {
  if (path && fs.existsSync(path)) {
    fs.unlinkSync(path);
  }
};
