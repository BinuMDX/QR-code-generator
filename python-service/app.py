from flask import Flask, request, jsonify
from flask_cors import CORS
import io, base64, json
from services.qr_factory import QRFactory

app = Flask(__name__)
CORS(app)

@app.route('/')
def home():
    return jsonify({"message": "QR Code Generator API is running", "status": "OK"})

@app.route('/generate-qr', methods=['POST'])
def generate_qr():
    try:
        # Handle multipart or JSON
        if 'multipart/form-data' in request.content_type:
            data = request.form.get('data', '')
            options = json.loads(request.form.get('options', '{}'))
            logo_file = request.files.get('logo')
        else:
            payload = request.get_json()
            data = payload.get('data', '')
            options = payload.get('options', {})
            logo_file = None

        # Use Factory
        generator = QRFactory.create(data, options, logo_file)
        img = generator.generate_qr()

        # Convert to Base64
        buffered = io.BytesIO()
        img.save(buffered, format="PNG")
        img_str = base64.b64encode(buffered.getvalue()).decode()
        return jsonify({'image': f'data:image/png;base64,{img_str}'})

    except Exception as e:
        print(f"⚠️ Error: {e}")
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    print("🚀 Starting Flask server on http://127.0.0.1:5000")
    app.run(host='127.0.0.1', port=5000, debug=True)


