# services/custom_qr_generator.py
from PIL import Image, ImageDraw, ImageFont
import qrcode
from .simple_qr_generator import SimpleQRGenerator

class CustomQRGenerator(SimpleQRGenerator):
    """Adds logo and frame customization to QR."""

    def __init__(self, data, fill_color, back_color, dot_style='square', logo_file=None, frame_text=None, frame_color="#000000"):
        super().__init__(data, fill_color, back_color)
        self.logo_file = logo_file
        self.frame_text = frame_text
        self.frame_color = frame_color
        self.dot_style = dot_style

    def generate_qr(self) -> Image.Image:
        img = super().generate_qr()

        # Build the QR matrix manually
        qr = qrcode.QRCode(
            version=None,
            error_correction=qrcode.constants.ERROR_CORRECT_H,
            box_size=10,
            border=4,
        )
        qr.add_data(self.data)
        qr.make(fit=True)
        matrix = qr.get_matrix()

        box_size = 10
        border = 4
        qr_size = len(matrix)
        img_size = (qr_size + border * 2) * box_size
        img = Image.new('RGBA', (img_size, img_size), self.back_color)
        draw = ImageDraw.Draw(img)

       # --- Draw modules (dots) ---
        for row in range(qr_size):
            for col in range(qr_size):
                if matrix[row][col]:
                    x0 = (col + border) * box_size
                    y0 = (row + border) * box_size
                    x1 = x0 + box_size
                    y1 = y0 + box_size

                    if self.dot_style == "circle":
                        draw.ellipse([x0, y0, x1, y1], fill=self.fill_color)
                    elif self.dot_style == "rounded":
                        radius = box_size // 3
                        draw.rounded_rectangle([x0, y0, x1, y1],
                                            radius=radius,
                                            fill=self.fill_color)
                    else:  # default square
                        draw.rectangle([x0, y0, x1, y1], fill=self.fill_color)


        # 🧩 Add logo
        if self.logo_file:
            logo = Image.open(self.logo_file.stream).convert("RGBA")
            qr_width, qr_height = img.size
            logo_size = int(qr_width * 0.2)
            logo = logo.resize((logo_size, logo_size))
            pos = ((qr_width - logo_size) // 2, (qr_height - logo_size) // 2)
            img.paste(logo, pos, mask=logo)

        # 🧩 Add frame text
        if self.frame_text:
            font = ImageFont.load_default()
            bbox = font.getbbox(self.frame_text)
            text_width = bbox[2] - bbox[0]
            text_height = bbox[3] - bbox[1]
            frame_height = text_height + 40

            new_img = Image.new('RGBA', (img.width, img.height + frame_height), self.back_color)
            new_img.paste(img, (0, 0))
            draw = ImageDraw.Draw(new_img)
            text_x = (new_img.width - text_width) // 2
            text_y = img.height + 20
            draw.text((text_x, text_y), self.frame_text, fill=self.frame_color, font=font)
            img = new_img

        return img
