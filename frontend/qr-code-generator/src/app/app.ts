import { Component, signal } from '@angular/core';
import { QrService } from './services/qr';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.scss'
})
export class App {
  inputText = '';
  qrImage: string | null = null;
  usePython = false;

  constructor(private qrService: QrService) { }

  generateQR() {
    if (!this.inputText.trim()) {
      alert('Please enter text or URL!');
      return;
    }


    this.qrService.generateQR(this.inputText, this.usePython).subscribe({
      next: (res) => {
        this.qrImage = res.image;
      },
      error: (err) => {
        console.error(err);
        alert('Error generating QR code');
      }
    });
  }
}
