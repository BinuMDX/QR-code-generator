import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class History {
  private readonly storageKey = 'qr-history';

  getHistory(): any[] {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }

  addToHistory(qrData: any): void {
    const history = this.getHistory();
    history.unshift({ ...qrData, timestamp: new Date() });
    localStorage.setItem(this.storageKey, JSON.stringify(history.slice(0, 10))); // keep last 10
  }

  clearHistory(): void {
    localStorage.removeItem(this.storageKey);
  }
  
}
