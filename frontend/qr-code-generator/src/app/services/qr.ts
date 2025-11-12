// src/app/services/qr.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { QROptions } from '../models/qr-options';

@Injectable({
  providedIn: 'root',
})
export class QrService {
  private apiUrl = 'http://localhost:3000/api/qr/generate'; // Node backend

  constructor(private http: HttpClient) {}

  generateQr(
    data: string,
    usePython: boolean,
    options: QROptions,
    logoFile?: File
  ): Observable<any> {
    const formData = new FormData();
    formData.append('data', data);
    formData.append('usePython', String(usePython));
    formData.append('options', JSON.stringify(options));

    if (logoFile) {
      formData.append('logo', logoFile);
    }

    return this.http.post<any>(this.apiUrl, formData);
  }
}
