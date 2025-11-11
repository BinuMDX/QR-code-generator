from .simple_qr_generator import SimpleQRGenerator
from .custom_qr_generator import CustomQRGenerator

class QRFactory:
    """Factory to create QR code generators based on type."""
    
    @staticmethod
    def create(data, options, logo_file=None):
        if options.get('frame_text') or logo_file or options.get('dot_style') != 'square':
            return CustomQRGenerator(
                data,
                fill_color=options.get('fill_color', '#000000'),
                back_color=options.get('back_color', '#ffffff'),
                dot_style=options.get('dot_style', 'square'),
                logo_file=logo_file,
                frame_text=options.get('frame_text'),
                frame_color=options.get('frame_color', '#000000')
            )
        else:
            return SimpleQRGenerator(
                data,
                fill_color=options.get('fill_color', '#000000'),
                back_color=options.get('back_color', '#ffffff')
            )