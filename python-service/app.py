from flask import Flask, request, jsonify
import qrcode
from PIL import Image
import io, base64

app = Flask(__name__)

@app.route('/generate-qr', methods=['POST'])
def generate_qr():
    data = request.json['data']
    qr = qrcode.QRCode(error_correction=qrcode.constants.ERROR_CORRECT_M)
    qr.add_data(data)
    qr.make(fit=True)
    img = qr.make_image(fill_color="black", back_color="white")
    buffered = io.BytesIO()
    img.save(buffered, format="PNG")
    img_str = base64.b64encode(buffered.getvalue()).decode()
    return jsonify({'image': f'data:image/png;base64,{img_str}'})

if __name__ == '__main__':
    app.run(port=5000)
