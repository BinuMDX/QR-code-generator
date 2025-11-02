import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QrService {

  private apiUrl = 'http://localhost:3000/api/qr/generate';

  constructor(private http: HttpClient) { }

  generateQR(data: string, usePython: boolean = false): Observable<any> {
  return this.http.post(this.apiUrl, { data, usePython });
}
}
