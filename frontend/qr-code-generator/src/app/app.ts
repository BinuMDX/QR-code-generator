import { Component, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.scss',
})
export class App {
  inputText = '';
  qrImage: string | null = null;
  usePython = false;
  fillColor = '#000000';
  backColor = '#ffffff';
  dotStyle = 'square';
  frameText = '';
  frameColor = '#000000'
  selectedFile: File | null = null;

  constructor(private http: HttpClient) {}

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  generateQR() {
    if (!this.inputText.trim()) {
      alert('Please enter text or URL!');
      return;
    }

    const formData = new FormData();
    formData.append('data', this.inputText);
    formData.append('usePython', this.usePython.toString());
    formData.append('options', JSON.stringify({
      fill_color: this.fillColor,
      back_color: this.backColor,
      dot_style: this.dotStyle,
      frame_text: this.frameText,
      frame_color: this.frameColor
    }));

    if (this.selectedFile) {
      formData.append('logo', this.selectedFile);
    }

    this.http.post('http://localhost:3000/api/qr/generate', formData)
      .subscribe({
        next: (res: any) => this.qrImage = res.image,
        error: (err) => {
          console.error(err);
          alert('Error generating QR code');
        }
      });
  }

}
