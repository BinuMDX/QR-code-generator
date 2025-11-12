import { Component } from '@angular/core';
import { QROptions } from '../models/qr-options';
import { QrService } from '../services/qr';

@Component({
  selector: 'app-qr-generator',
  standalone: false,
  templateUrl: './qr-generator.html',
  styleUrl: './qr-generator.scss',
})
export class QRGenerator {
  data = '';
  usePython = true;
  qrImage: string | null = null;
  logoFile: File | null = null;

  options: QROptions = {
    fill_color: '#000000',
    back_color: '#ffffff',
    dot_style: 'square',
    frame_text: '',
    frame_color: '#000000',
  };

  constructor(private qrService: QrService) {}

  onFileSelected(event: any) {
    this.logoFile = event.target.files[0];
  }

  generateQr() {
    if (!this.data) {
      alert('Please enter data to encode.');
      return;
    }

    this.qrService
      .generateQr(this.data, this.usePython, this.options, this.logoFile ?? undefined)
      .subscribe({
        next: (res) => {
          this.qrImage = res.image;
        },
        error: (err) => {
          console.error('QR generation failed', err);
          alert('Failed to generate QR code.');
        },
      });
  }

}
