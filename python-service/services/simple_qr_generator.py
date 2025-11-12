# services/simple_qr_generator.py
import io
import segno
from PIL import Image
from .qr_generator_base import IQRGenerator

class SimpleQRGenerator(IQRGenerator):
    """Generates a basic QR code without logo or frame."""

    def __init__(self, data, fill_color='#000000', back_color='#ffffff'):
        self.data = data
        self.fill_color = fill_color
        self.back_color = back_color

    def generate_qr(self) -> Image.Image:
        qr = segno.make(self.data, error='h')
        out = io.BytesIO()
        qr.save(out, kind='png', scale=10, dark=self.fill_color, light=self.back_color, border=2)
        out.seek(0)
        return Image.open(out).convert("RGBA")
