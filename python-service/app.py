from flask import Flask, request, jsonify
import qrcode
import segno
import json
from PIL import Image, UnidentifiedImageError,ImageFont, ImageDraw
import io, base64, requests, re
from flask_cors import CORS


app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/')
def home():
    return jsonify({"message": "QR Code Generator API is running", "status": "OK"})

@app.route('/generate-qr', methods=['POST'])
def generate_qr():
    try:
        if 'multipart/form-data' in request.content_type:
            data = request.form.get('data', '')
            options = json.loads(request.form.get('options', '{}'))
            logo_file = request.files.get('logo')
        else:
            payload = request.get_json()
            data = payload.get('data', '')
            options = payload.get('options', {})
            logo_file = None

        # Extract customization options
        fill_color = options.get('fill_color', '#000000')
        back_color = options.get('back_color', '#ffffff')
        dot_style = options.get('dot_style', 'square')  # 'square' | 'circle'
        frame_text = options.get('frame_text', None)
        frame_color = options.get('frame_color', '#000000')

        # 1️⃣ Generate base QR code
        qr = segno.make(data, error='h')
        out = io.BytesIO()
        qr.save(out, kind='png', scale=10, dark=fill_color, light=back_color, border=2)
        out.seek(0)
        img = Image.open(out).convert("RGBA")

        # 2️⃣ If logo file provided
        if logo_file:
            logo = Image.open(logo_file.stream).convert("RGBA")
            qr_width, qr_height = img.size
            logo_size = int(qr_width * 0.2)
            logo = logo.resize((logo_size, logo_size))
            pos = ((qr_width - logo_size) // 2, (qr_height - logo_size) // 2)
            img.paste(logo, pos, mask=logo)

        # 3️⃣ Add frame style (optional)
        if frame_text:
            font = ImageFont.load_default()
            bbox = font.getbbox(frame_text)
            text_width = bbox[2] - bbox[0]
            text_height = bbox[3] - bbox[1]
            frame_height = text_height + 40
            new_img = Image.new('RGBA', (img.width, img.height + frame_height), back_color)
            new_img.paste(img, (0, 0))
            draw = ImageDraw.Draw(new_img)
            text_x = (new_img.width - text_width) // 2
            text_y = img.height + 20
            draw.text((text_x, text_y), frame_text, fill=frame_color, font=font)
            img = new_img


        # 4️⃣ Convert final image to Base64
        buffered = io.BytesIO()
        img.save(buffered, format="PNG")
        img_str = base64.b64encode(buffered.getvalue()).decode()
        return jsonify({'image': f'data:image/png;base64,{img_str}'})

    except Exception as e:
        print(f"⚠️ Error: {e}")
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    print("Starting Flask server on http://127.0.0.1:5000")
    app.run(host='127.0.0.1', port=5000, debug=True)

