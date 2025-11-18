import { Component } from '@angular/core';
import { QROptions } from '../../models/qr-options';
import { QrService } from '../../services/qr';
import { History } from '../../services/history';
import { FileUtils } from '../../utils/file-utils';

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
  latestMeta: any = null;

  options: QROptions = {
    fill_color: '#000000',
    back_color: '#ffffff',
    dot_style: 'square',
    frame_text: '',
    frame_color: '#000000',
  };
  history: any;

  constructor(private qrService: QrService,  private historyService: History) {}

  onGenerated(payload: any) {
    this.qrImage = payload.image;
    this.latestMeta = payload.meta;
    this.history.addToHistory({ image: payload.image, data: payload.meta });
  }

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
          this.historyService.addToHistory({
          data: this.data,
          options: this.options,
          image: res.image,
        });
          
        },
        error: (err) => {
          console.error('QR generation failed', err);
          alert('Failed to generate QR code.');
        },
      });
  }

 

download(type: string) {
  if (!this.qrImage) return;
  if (type === 'png') FileUtils.downloadBase64Image(this.qrImage, 'qr-code.png');
  else if (type === 'svg') FileUtils.exportAsSVG(this.qrImage);
  else if (type === 'pdf') FileUtils.exportAsPDF(this.qrImage);
}

 openDesigner() {
    // navigate to designer and pass current QR — simple approach: store in localStorage or via service
    localStorage.setItem('designer_qr', this.qrImage || '');
    // this.router.navigate(['/designer']);
  }


}
