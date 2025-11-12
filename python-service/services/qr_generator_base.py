import abc
from abc import ABC, abstractmethod
from PIL import Image

class IQRGenerator(ABC):
    @abstractmethod
    def generate_qr(self) -> Image.Image:
        """Generate a QR code from the given data and return it as bytes."""
        pass